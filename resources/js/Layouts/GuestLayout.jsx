import { Database } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <>
            <div className={'font-Inter bg-white shadow-xl absolute top-0 w-full h-24 flex items-center justify-between'}>
                <div className={'container mx-auto flex items-center justify-between'}>
                    <span className={'text-3xl inline-flex items-center gap-2 font-bold text-yellow-500'}>
                        <Database />Sistem Pendukung Keputusan Metode SAW WP
                    </span>
                </div>

            </div>

            <div className={'bg-yellow-500 w-full min-h-screen'}>
                <div className={'container mx-auto absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'}>
                    {children}
                </div>
            </div>
        </>
    );
}
