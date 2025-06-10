import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Label } from "@/Components/ui/label.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { formatDate } from "@/lib/formatDate.js";
import { Head } from "@inertiajs/react";
import { Eye, Grid2x2Check, Save } from "lucide-react";
import { useContext } from "react";

const DataHasilAkhir = ({ auth, hasilHitungFromDb }) => {
    const { calculation, data, setNameHasilHitungToDb, saveHasilHitungToDb } = useContext(SawWpContext);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title=" Data HasilAkhir" />

            <div className={'flex items-center justify-between mb-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Grid2x2Check size={30} />
                    Data HasilAkhir
                </h1>
                <div className={'flex gap-5 items-center'}>
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
                            {console.log(hasilHitung)}
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
                                    {/* <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <Eye />
                                                Lihat
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {hasilHitung.nama_hasil_hitung}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {formatDate(hasilHitung.created_at)}
                                                </DialogDescription>
                                            </DialogHeader>
                                            gg
                                        </DialogContent>
                                    </Dialog> */}
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
            <div className={'flex flex-col gap-5 mt-5'}>
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