import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {signIn, signOut, useSession} from "next-auth/react";

export default function NavbarUser() {

    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Menu as="div" className="relative ml-3">
                    <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src={session.user?.image as string}
                                className="size-8 rounded-full"
                            />
                        </MenuButton>
                    </div>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <MenuItem>
                            <a
                                href="#"
                                onClick={() => signOut()}
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                                Sign out
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </>
        )
    }
    return (
        <>
            <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    <a
                        onClick={() => signIn()}
                        key=""
                        href="#"
                        className="bg-blue-900 text-white' : 'text-gray-300 hover:bg-blue-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                        Me connecter
                    </a>
                </div>
            </div>
        </>
    )
}