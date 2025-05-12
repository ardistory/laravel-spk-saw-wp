import { AuthContext } from '@/Components/AuthProvider.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useContext, useEffect } from 'react';

export default function Dashboard({ auth }) {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        setAuth(auth.user);
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className={''}>
                You're logged in!
            </div>
        </AuthenticatedLayout>
    );
}