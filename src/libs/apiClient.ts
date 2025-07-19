export async function fetchGuildById(id: string) {
    const res = await fetch(`/api/guilds/${id}`);
    if (!res.ok) throw new Error('Erreur API');
    return res.json();
}