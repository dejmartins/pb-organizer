'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { createEllipsis, extractUsername } from "@/shared/utils/helper";
import useAuth from '@/shared/hooks/useAuth'

export default function ProfileIcon() {
    const { USER } = useAuth();

    const router = useRouter()

    const links = [
        { label: 'Sign out', action: 'signOut', icon: ArrowRightOnRectangleIcon }
    ]

    const handleClick = (link: { label: string; to?: string; action?: string }) => {
        handleSignOut()
    }

    const handleSignOut = () => {
        router.push('/auth/signin')
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
        <MenuButton as="div" className="flex items-center gap-3 cursor-pointer">
            <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#E91B41] to-[#9E3AC3]"></div>
                    <div className="absolute inset-[4px] bg-white rounded-full flex items-center justify-center">
                        <UserCircleIcon className="w-7 stroke-black stroke-1" />
                    </div>
                </div>
                <p className="font-[600] text-[16px] md:text-[18px]">
                    {createEllipsis(extractUsername(USER.username) || "", 14)}
                </p>
                <ChevronDownIcon className="hidden md:flex w-5 stroke-black stroke-1" />
            </div>
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-[#F9F7F7] shadow-lg ring-1 ring-black/5 focus:outline-none">
            {links.map((link) => (
                <MenuItem key={link.label} as="div">
                    <button
                        className="w-full flex gap-2 items-center bg-[#FAF9F9] border border-[#ECE7E7] text-left p-[10px] rounded-[5px] hover:text-white hover:bg-[var(--pb-c-red)] hover:border-[#4E0916] ui-not-active:bg-white ui-not-active:text-black"
                        onClick={() => handleClick(link)}
                    >
                        <link.icon className="w-6" />
                        {link.label}
                    </button>
                </MenuItem>
            ))}
        </MenuItems>
        </Menu>
    )
}