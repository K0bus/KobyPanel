import {Plus, Settings, Users} from "lucide-react";
import {Guild} from "@/types/Guild";
import Image from "next/image";
import {GuildInfo} from "@/bot/GetGuild";

export interface GuildCardProps {
    guild: Guild;
    guildInf: GuildInfo | null;
}

export const GuildCard = ({ guild, guildInf }: GuildCardProps) => {
    const guildIcon = guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
        : "/default-server-icon.png";

    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=822494120224358490&scope=bot+applications.commands&permissions=8&guild_id=${guild.id}&disable_guild_select=true`

    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">
                    <Image className="rounded-full" src={guildIcon} alt="Guild icon" width={128} height={128} />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{guild.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className={`flex items-center ${guildInf !== null ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${guildInf !== null ? 'bg-green-400' : 'bg-red-400'}`}></div>
                {guildInf !== null ? 'En ligne' : 'Hors ligne'}
            </span>
                    </div>
                </div>
            </div>

            <div className="flex space-x-2">
                {guildInf !== null ? (
                    <button
                        onClick={() => console.log('TODO')}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex-1"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Administrer</span>
                    </button>
                ) : (
                    <a href={inviteUrl} target="_blank" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex-1">
                        <Plus className="w-4 h-4" />
                        <span>Ajouter au serveur</span>
                    </a>
                )}
            </div>
        </div>
    );
}

const fetchGuild = async (id: string) => {
    const res = await fetch(`/api/guilds/${id}`);
    return res.json();
};