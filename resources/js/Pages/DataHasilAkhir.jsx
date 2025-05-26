import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Grid2x2Check } from "lucide-react";
import { useContext } from "react";

const DataHasilAkhir = ({ auth }) => {
    const { calculation, data } = useContext(SawWpContext);

    const sawResults = calculation.SAW && calculation.SAW.sort((a, b) => b.weighted - a.weighted);
    const wpResults = calculation.WP && calculation.WP.sort((a, b) => b.v - a.v);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title=" Data HasilAkhir" />

            <div className={'space-y-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Grid2x2Check size={30} />
                    Data HasilAkhir
                </h1>
            </div>
            <div>
                {sawResults && (
                    <div>
                        <h2>Hasil Akhir Perankingan SAW</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Karyawan</th>
                                    <th>Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sawResults.map((result, index) => (
                                    <tr key={result.employee_id}>
                                        <td>{index + 1}</td>
                                        <td>{data.employees.find((employee) => employee.id === result.employee_id).name}</td>
                                        <td>{result.weighted}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {wpResults && (
                    <div>
                        <h2>Hasil Akhir Perankingan WP</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Karyawan</th>
                                    <th>Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wpResults.map((result, index) => (
                                    <tr key={result.employee_id}>
                                        <td>{index + 1}</td>
                                        <td>{data.employees.find((employee) => employee.id === result.employee_id).name}</td>
                                        <td>{result.v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout >
    );
};

export default DataHasilAkhir;