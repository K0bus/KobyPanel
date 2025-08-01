import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user?.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}