import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Calculator } from "lucide-react";

const DataPerhitungan = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Data Perhitungan" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Calculator size={30} />
                    Data Perhitungan
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataPerhitungan;