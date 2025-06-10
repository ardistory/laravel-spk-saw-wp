import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Badge } from "@/Components/ui/badge.js";
import { Button } from "@/Components/ui/button.js";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Calculator } from "lucide-react";
import { useContext, useState } from "react";

const DataPerhitungan = ({ auth }) => {
    const { calculation, calculateSAW, calculateWP, data, saveHasilHitungToDb, setNameHasilHitungToDb, setHasilHitungToProvider } = useContext(SawWpContext);
    const [method, setMethod] = useState('');

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Perhitungan" />

            <div className={'flex items-center justify-between mb-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Calculator size={30} />
                    Data Perhitungan
                </h1>
                <Card className={'flex gap-2 p-1'}>
                    <Select value={method} onValueChange={(value) => setMethod(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={'Pilih Metode'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'saw'}>Metode SAW</SelectItem>
                            <SelectItem value={'wp'}>Metode WP</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={() => (method === 'saw') ? calculateSAW() : (method === 'wp') ? calculateWP() : null}>
                        <Calculator />
                        Hitung
                    </Button>
                </Card>
            </div>
            <div className={'mt-5'}>
                {data.normalized.length > 0 && (
                    <Card className="mb-5">
                        <CardHeader>
                            <CardTitle>
                                Normalisasi
                            </CardTitle>
                        </CardHeader>
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Karyawan</TableHead>
                                        <TableHead>Kriteria</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Normalisasi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.normalized.map(score => (
                                        <TableRow key={score.id}>
                                            <TableCell>{data.alternatifs.find(a => a.id === score.alternatif_id)?.name ?? <Badge>Data berubah, silahkan hitung ulang</Badge>}</TableCell>
                                            <TableCell>{data.criterias.find(c => c.id === score.criteria_id)?.name ?? <Badge>Data berubah, silahkan hitung ulang</Badge>}</TableCell>
                                            <TableCell>{score.value}</TableCell>
                                            <TableCell>{score.normalized}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </Card>
                )}
                {data.weighted.length > 0 && (
                    <Card className="mb-5">
                        <CardHeader>
                            <CardTitle>
                                Pembobotan
                            </CardTitle>
                        </CardHeader>
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Karyawan</TableHead>
                                        <TableHead>Kriteria</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Normalisasi</TableHead>
                                        <TableHead>Pembobotan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.weighted.map(score => (
                                        <TableRow key={score.id}>
                                            <TableCell>{data.alternatifs.find(a => a.id === score.alternatif_id)?.name ?? <Badge>Data berubah, silahkan hitung ulang</Badge>}</TableCell>
                                            <TableCell>{data.criterias.find(c => c.id === score.criteria_id)?.name ?? <Badge>Data berubah, silahkan hitung ulang</Badge>}</TableCell>
                                            <TableCell>{score.value}</TableCell>
                                            <TableCell>{score.normalized}</TableCell>
                                            <TableCell>{score.weighted}</TableCell>
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
        </AuthenticatedLayout>
    );
};

export default DataPerhitungan;