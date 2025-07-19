import {useSession} from "next-auth/react";
import GuildCard from "@/pages/components/old/guildcard";

export default function UserInfosJson() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Chargement...</p>;
    if (!session) return <p>Tu nes pas connecté.</p>;

    const ownedGuilds = session.guilds?.filter((guild) => guild.owner);

    return (
        <div>
            <h1>🎮 Tes serveurs où tu es propriétaire :</h1>
            {ownedGuilds?.length === 0 && <p>Aucun serveur où tu es owner.</p>}
            <ul>
                {ownedGuilds?.map((guild) => (
                    <li key={guild.id}>
                        <GuildCard guild={guild} />;
                    </li>
                ))}
            </ul>
        </div>
    );
}