import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Boxes } from "lucide-react";

const DataSubKriteria = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Data Alternatif" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Boxes size={30} />
                    Data Alternatif
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataSubKriteria;