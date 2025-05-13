import { Button } from '@/Components/ui/button.js';
import Profile from '../../img/default.png';
import { Avatar, AvatarImage } from '@/Components/ui/avatar.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu.js';
import { router, usePage } from '@inertiajs/react';
import { Box, Boxes, Calculator, ContactRound, Database, FileText, Gauge, Grid2x2Check, Power, TextSearch, UserPen, UsersRound } from 'lucide-react';
import { Label } from '@/Components/ui/label.js';
import { cn } from '@/lib/utils.js';
import { useContext, useState } from 'react';
import { AuthContext } from '@/Components/AuthProvider.jsx';
import { Separator } from '@/Components/ui/separator.js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip.js';

export const navMenus = [
    {
        label: 'Menu',
        menus: [
            {
                title: 'Dashboard',
                routeName: 'dashboard',
                icon: <Gauge />,
            },
        ]
    },
    {
        label: 'Master Data',
        menus: [
            {
                title: 'Data Kriteria',
                routeName: 'dashboardf',
                icon: <Box />,
            },
            {
                title: 'Data Sub Kriteria',
                routeName: 'dashboardf',
                icon: <Boxes />,
            },
            {
                title: 'Data Alternatif',
                routeName: 'dashboardf',
                icon: <FileText />,
            },
            {
                title: 'Data Penilaian',
                routeName: 'dashboardf',
                icon: <TextSearch />,
            },
            {
                title: 'Data Perhitungan',
                routeName: 'dashboardf',
                icon: <Calculator />,
            },
            {
                title: 'Data Hasil Akhir',
                routeName: 'dashboardf',
                icon: <Grid2x2Check />,
            },
        ]
    },
    {
        label: 'Master User',
        menus: [
            {
                title: 'Data User',
                routeName: 'dashboardf',
                icon: <UsersRound />,
            },
            {
                title: 'Data Profile',
                routeName: 'dashboardf',
                icon: <ContactRound />,
            },
        ]
    },
];

export default function AuthenticatedLayout({ children }) {
    const { url } = usePage();
    const { auth } = useContext(AuthContext);

    const isActive = (route) => {
        return url.startsWith(`/${route}`);
    };

    return (
        <div className={'font-Inter'}>
            <div className={'flex'}>
                <div className={'bg-yellow-500 text-white w-[50px] md:w-[300px] left-0 min-h-screen px-2'}>
                    <div className={'h-24 flex items-center justify-center'}>
                        <div className={'flex items-center md:text-2xl font-bold gap-2 cursor-pointer'} onClick={() => router.visit(route('dashboard'))}>
                            <Database size={30} /><span className={'hidden md:block'}>SPK SAW WP</span>
                        </div>
                    </div>
                    {navMenus.map(navMenu => (
                        <div key={navMenu.label} className={'mb-2 md:mb-5'}>
                            <Label className={'hidden md:block font-bold'}>
                                {navMenu.label}
                            </Label>
                            <Separator className={'block md:hidden'} />
                            {navMenu.menus.map(menu => (
                                <div key={menu.title} className={'mt-2'}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild className={'w-full'}>
                                                <Button variant={'ghost'} className={cn('w-full', { 'bg-white text-black': isActive(menu.routeName) })}>
                                                    <span className={'md:w-full text-start inline-flex items-center gap-2'}>
                                                        {menu.icon}
                                                        <span className={'hidden md:block'}>{menu.title}</span>
                                                    </span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    {menu.title}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={'w-full'}>
                    <div className={'bg-white shadow-xl top-0 h-24 flex items-center px-10 justify-end'}>
                        <div className={'flex gap-2 items-center'}>
                            <span>
                                {auth.name}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={Profile} />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => router.visit(route('profile.edit'))}>
                                        <UserPen />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.post(route('logout'))}>
                                        <Power />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className={'p-5'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
