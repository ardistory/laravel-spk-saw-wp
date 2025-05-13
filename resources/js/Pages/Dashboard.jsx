import { AuthContext } from '@/Components/AuthProvider.jsx';
import { Alert, AlertDescription } from '@/Components/ui/alert.js';
import { Button } from '@/Components/ui/button.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Gauge } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { navMenus } from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        setAuth(auth.user);
    }, []);

    const colors = [
        'border-l-red-500',
        'border-l-blue-500',
        'border-l-green-500',
        'border-l-yellow-500',
        'border-l-orange-500',
        'border-l-pink-500',
    ];
    const randomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Gauge size={30} />
                    Dashboard
                </h1>
                <Alert className={'bg-green-200 text-green-500 border-green-500'}>
                    <AlertDescription>
                        Selamat datang <span className={'font-bold'}>{auth.user.name}</span>! Anda bisa mengoperasikan sistem melalui pilihan dibawah.
                    </AlertDescription>
                </Alert>
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-5'}>
                    {navMenus[1].menus.map(menu => (
                        <Button key={menu.title} variant={'ghost'} className={`px-12 py-10 shadow-xl border border-l-[4px] ${randomColor()}`} onClick={() => router.visit(route(menu.routeName))}>
                            <span className={'inline-flex items-center w-full justify-between'}>
                                {menu.title}
                                {menu.icon}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}