import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Label } from "@/Components/ui/label.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { formatDate } from "@/lib/formatDate.js";
import { Head } from "@inertiajs/react";
import { Calculator, Eye, Save } from "lucide-react";
import { useContext, useState } from "react";

const DataPerhitungan = ({ auth, hasilHitungFromDb }) => {
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
                <div className={'flex gap-5 items-center'}>
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Save />
                                Simpan perhitungan
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Simpan hasil hitung
                                </DialogTitle>
                                <DialogDescription>
                                    simpan untuk digunakan kembali.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => saveHasilHitungToDb(e, calculation)} className={'space-y-5'}>
                                <div>
                                    <Label>
                                        Nama
                                    </Label>
                                    <Input onChange={(e) => setNameHasilHitungToDb(e.target.value)} />
                                </div>
                                <Button type={'submit'}>
                                    Simpan
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <div className={'grid md:grid-cols-4 gap-5'}>
                    {hasilHitungFromDb.map(hasilHitung => (
                        <Card key={hasilHitung.id}>
                            <CardHeader>
                                <div className={'flex items-center gap-5 justify-between'}>
                                    <div>
                                        <CardTitle>
                                            {hasilHitung.nama_hasil_hitung}
                                        </CardTitle>
                                        <CardDescription>
                                            {formatDate(hasilHitung.created_at)}
                                        </CardDescription>
                                    </div>
                                    <Button onClick={() => setHasilHitungToProvider(hasilHitung)}>
                                        <Eye />
                                        Lihat kembali
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
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
                                            <TableCell>{data.alternatifs.find(a => a.id === score.alternatif_id).name}</TableCell>
                                            <TableCell>{data.criterias.find(c => c.id === score.criteria_id).name}</TableCell>
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
                                            <TableCell>{data.alternatifs.find(a => a.id === score.alternatif_id).name}</TableCell>
                                            <TableCell>{data.criterias.find(c => c.id === score.criteria_id).name}</TableCell>
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
                                                <TableCell>{data.alternatifs.find(a => a.id === result.alternatif_id).name}</TableCell>
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