// components/GuildCard.tsx
import React from "react";
import {Guild} from "@/types/Guild";

interface GuildCardProps {
    guild: Guild;
}

export default function GuildCard({ guild }: GuildCardProps) {
    const guildIcon = guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
        : "/default-server-icon.png";

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={guildIcon}
                    alt={`${guild.name} icon`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {guild.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
          {guild.owner ? "👑 Propriétaire" : "👤 Membre"}
        </span>
                <div className="flex mt-4 md:mt-6">
                    <a
                        href={`/dashboard/${guild.id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Gérer
                    </a>
                </div>
            </div>
        </div>
    );
}
