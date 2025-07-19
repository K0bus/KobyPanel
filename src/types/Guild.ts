// types/Guild.ts
export interface Guild {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

export type GuildInfo = {
    id: string;
    name: string;
    memberCount: number;
}