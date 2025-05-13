import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className={'flex flex-col gap-5'}>
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className={'md:w-1/2'} />
                <UpdatePasswordForm className={'md:w-1/2'} />
            </div>
        </AuthenticatedLayout>
    );
}
