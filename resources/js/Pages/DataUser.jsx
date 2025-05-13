import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { UsersRound } from "lucide-react";

const DataUser = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Data User" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <UsersRound size={30} />
                    Data User
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataUser;