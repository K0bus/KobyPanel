import LoginButton from "@/pages/components/LoginButton";

export const NavBar = () => {
    return (
        <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-white">
                        <span className="text-blue-400">Discord</span>Bot Admin
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <LoginButton />
                </div>
            </div>
        </nav>
    );
}