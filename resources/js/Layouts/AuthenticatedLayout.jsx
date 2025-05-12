import { Button } from '@/Components/ui/button.js';
import Profile from '../../img/default.png';
import { Avatar, AvatarImage } from '@/Components/ui/avatar.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu.js';
import { router, usePage } from '@inertiajs/react';
import { Box, Boxes, Calculator, ContactRound, Database, FileText, Gauge, Grid2x2Check, Power, TextSearch, UserPen, UsersRound } from 'lucide-react';
import { Label } from '@/Components/ui/label.js';
import { cn } from '@/lib/utils.js';
import { useContext } from 'react';
import { AuthContext } from '@/Components/AuthProvider.jsx';

const navMenus = [
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
                <div className={'bg-yellow-500 text-white w-[300px]  left-0 min-h-screen p-2'}>
                    <div className={'h-24 flex items-center justify-center'}>
                        <div className={'flex items-center text-2xl font-bold gap-2 cursor-pointer'} onClick={() => router.visit(route('dashboard'))}>
                            <Database size={40} />SPK SAW WP
                        </div>
                    </div>
                    {navMenus.map(navMenu => (
                        <div key={navMenu.label} className={'mb-5'}>
                            <Label className={'font-bold'}>
                                {navMenu.label}
                            </Label>
                            {navMenu.menus.map(menu => (
                                <div key={menu.title}>
                                    <Button variant={'ghost'} className={cn('w-full', { 'bg-white text-black': isActive(menu.routeName) })}>
                                        <span className={'w-full text-start inline-flex items-center gap-2'}>
                                            {menu.icon}
                                            {menu.title}
                                        </span>
                                    </Button>
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
