import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className={''}>
                You're logged in!
            </div>
        </AuthenticatedLayout>
    );
}
