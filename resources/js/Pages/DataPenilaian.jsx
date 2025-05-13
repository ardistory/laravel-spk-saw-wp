import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { TextSearch } from "lucide-react";

const DataPenilaian = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Data Penilaian" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <TextSearch size={30} />
                    Data Penilaian
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataPenilaian;