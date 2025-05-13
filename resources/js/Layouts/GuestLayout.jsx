import { Database } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <>
            <div className={'font-Inter bg-white shadow-xl absolute top-0 w-full h-24 flex items-center justify-between'}>
                <div className={'container mx-auto flex items-center justify-between'}>
                    <span className={'text-lg md:text-3xl inline-flex items-center gap-2 font-bold text-yellow-500 px-10 md:px-0'}>
                        <Database size={30} />Sistem Pendukung Keputusan Metode SAW WP
                    </span>
                </div>

            </div>

            <div className={'bg-yellow-500 w-full min-h-screen flex items-center justify-center'}>
                <div className={'container mx-auto px-10 md:px-0'}>
                    {children}
                </div>
            </div>
        </>
    );
}
