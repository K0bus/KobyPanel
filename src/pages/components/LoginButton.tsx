import { useSession, signIn, signOut } from "next-auth/react"
import {LogOut, User} from "lucide-react";

export default function LoginButton() {
    const { data: session } = useSession()
    if (session) {
        return (
            <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                    <img
                        src={session.user?.image as string}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white font-medium">
                  {session.user?.name}
                </span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                </button>
            </div>
        )
    }
    return (
        <>
            <button
                onClick={() => signIn()}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                <User className="w-4 h-4" />
                <span>Se connecter avec Discord</span>
            </button>
        </>
    )
}