import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Boxes } from "lucide-react";

const DataSubKriteria = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Sub Kriteria" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Boxes size={30} />
                    Data Sub Kriteria
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataSubKriteria;