'use client';

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { NavBar } from "@/pages/components/NavBar";
import { Plus } from "lucide-react";
import { GuildCard, GuildCardProps } from "@/pages/components/GuildCard";
import { Guild } from "@/types/Guild";
import {fetchGuildById} from "@/libs/apiClient";

export default function Home() {
    const { data: session, status } = useSession();
    const isLoggedIn = session !== null;

    const [guilds, setGuilds] = useState<GuildCardProps[]>([]);
    const [loadingGuilds, setLoadingGuilds] = useState(true);

    useEffect(() => {
        const fetchGuilds = async () => {
            if (!session) return;

            const ownedGuilds = session.guilds?.filter(g => g.owner) as Guild[] || [];
            const guildCards: GuildCardProps[] = [];

            for (const guild of ownedGuilds) {
                try {
                    const guildInf = await fetchGuildById(guild.id);
                    guildCards.push({ guild, guildInf });
                } catch (e) {
                    guildCards.push({ guild, guildInf: null });
                }
            }

            setGuilds(guildCards);
            setLoadingGuilds(false);
        };

        void fetchGuilds();
    }, [session]);

    if (status === "loading") return <p>Chargement de la session...</p>;

    return (
        <div className="min-h-screen bg-gray-900">
            <NavBar />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {!isLoggedIn ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🤖</div>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Panel d&#39;Administration Discord Bot
                        </h1>
                        <p className="text-gray-400 mb-8">
                            Connectez-vous avec Discord pour gérer vos bots
                        </p>
                        <button
                            onClick={() => signIn()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg transition-colors"
                        >
                            Se connecter avec Discord
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-white">Mes Bots Discord</h1>
                            <button
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Créer un bot</span>
                            </button>
                        </div>

                        {loadingGuilds ? (
                            <p className="text-white">Chargement des bots...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {guilds.map(({ guild, guildInf }) => (
                                    <GuildCard key={guild.id} guild={guild} guildInf={guildInf} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
