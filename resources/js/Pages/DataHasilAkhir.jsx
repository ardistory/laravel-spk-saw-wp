import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Grid2x2Check } from "lucide-react";
import { useContext } from "react";

const DataHasilAkhir = ({ auth }) => {
    const { calculation, data } = useContext(SawWpContext);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title=" Data HasilAkhir" />

            <div className={'space-y-5 mb-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Grid2x2Check size={30} />
                    Data HasilAkhir
                </h1>
            </div>
            <div className={'flex flex-col gap-5'}>
                {calculation.SAW && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Perhitungan SAW
                            </CardTitle>
                        </CardHeader>
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Karyawan</TableHead>
                                        <TableHead>Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {calculation.SAW && calculation.SAW
                                        .sort((a, b) => b.score - a.score)
                                        .map(result => (
                                            <TableRow key={result.alternatif_id}>
                                                <TableCell>{data.alternatifs.find(a => a.id === result.alternatif_id)?.name ?? <Badge>Data berubah, silahkan hitung ulang</Badge>}</TableCell>
                                                <TableCell>{result.score}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </Card>
                )}
                {calculation.WP && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Perhitungan WP
                            </CardTitle>
                        </CardHeader>
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Karyawan</TableHead>
                                        <TableHead>Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {calculation.WP && calculation.WP
                                        .sort((a, b) => b.score - a.score)
                                        .map(result => (
                                            <TableRow key={result.alternatif_id}>
                                                <TableCell>{data.alternatifs.find(a => a.id === result.alternatif_id)?.name ?? <Badge>Data berubah, silahkan hitung ulang</Badge>}</TableCell>
                                                <TableCell>{result.score}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout >
    );
};

export default DataHasilAkhir;