import axios from 'axios';

export type GuildInfo = {
    id: string;
    name: string;
    memberCount: number;
}

export async function getGuild(guildId: string): Promise<GuildInfo | null> {
    await axios.get(`http://localhost:5000/api/guilds/${guildId}`).then(response => {
        console.log(response.data);
        return response.data as GuildInfo;
    }).catch(() => {
        return null;
    });
    return null;
}

export async function getGuildList(): Promise<GuildInfo[] | null> {
    try {
        const response = await axios.get('http://localhost:5000/api/guilds');
        return response.data as GuildInfo[]; // Contiendra par exemple les guilds où le bot est déjà présent
    } catch (error) {
        console.error('Erreur lors de la vérification du bot :', error);
        return null;
    }
}