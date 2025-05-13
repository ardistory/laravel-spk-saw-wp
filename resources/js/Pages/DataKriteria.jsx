import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Box } from "lucide-react";

const DataKriteria = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Kriteria" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Box size={30} />
                    Data Kriteria
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataKriteria;