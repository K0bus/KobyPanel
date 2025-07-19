// app/api/auth/[...nextauth]/route.ts
import type {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Cache temporaire en mémoire (basique, valable pour dev/local)
const guildCache: Record<string, never[]> = {};

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "identify guilds",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.accessToken) {
                session.accessToken = token.accessToken;

                // ⚠️ Utilisation d'un cache simple pour éviter les appels répétés
                if (!guildCache[token.accessToken]) {
                    try {
                        const res = await fetch("https://discord.com/api/users/@me/guilds", {
                            headers: {
                                Authorization: `Bearer ${token.accessToken}`,
                            },
                        });

                        if (res.ok) {
                            guildCache[token.accessToken] = await res.json();
                        } else {
                            console.error("Erreur API Discord:", res.statusText);
                            guildCache[token.accessToken] = [];
                        }
                    } catch (error) {
                        console.error("Erreur fetch API Discord:", error);
                        guildCache[token.accessToken] = [];
                    }
                }

                session.guilds = guildCache[token.accessToken];
            }

            return session;
        },
    },
};

export default NextAuth(authOptions);
