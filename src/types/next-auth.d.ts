import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        guilds?: {
            id: string;
            name: string;
            icon: string | null;
            owner: boolean;
            permissions: string;
        }[];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
