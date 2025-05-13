import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Grid2x2Check } from "lucide-react";

const DataHasilAkhir = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title=" Data HasilAkhir" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Grid2x2Check size={30} />
                    Data HasilAkhir
                </h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataHasilAkhir;