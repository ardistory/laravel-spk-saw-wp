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
import { Boxes, MousePointer2, Plus, Save, Trash2 } from "lucide-react";
import { useContext } from "react";

const DataAlternatif = ({ auth, alternatifsFromDb }) => {
    const { addAlternatif, deleteAlternatif, data, saveAlternatifsToDb, setNameAlternatifToDb, setAlternatifToProvider } = useContext(SawWpContext);

    const handleAddAlternatif = (e) => {
        e.preventDefault();

        addAlternatif({
            id: Date.now(),
            name: e.target.name.value
        });

        e.target.reset();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Karyawan" />

            <div className={'mb-5 flex items-center justify-between'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Boxes size={30} />
                    Data Karyawan
                </h1>
                <div className={'flex gap-5'}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>
                                <Save />
                                Simpan Data Karyawan Saat Ini
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Simpan Data Karyawan
                                </DialogTitle>
                                <DialogDescription>
                                    simpan Data Karyawan untuk bisa digunakan kembali
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={saveAlternatifsToDb} className={'space-y-5'}>
                                <div>
                                    <Label>
                                        Nama
                                    </Label>
                                    <Input onChange={(e) => setNameAlternatifToDb(e.target.value)} />
                                </div>
                                <Button type={'submit'}>
                                    Simpan
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus />
                                Tambah Karyawan
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                Data Karyawan
                            </DialogTitle>
                            <DialogDescription>
                                tambah data karyawan
                            </DialogDescription>
                            <form onSubmit={handleAddAlternatif} className={'space-y-5'}>
                                <Input type="text" name="name" placeholder={'Nama Karyawan'} required />
                                <Button type="submit">
                                    <Plus />
                                    Tambah Karyawan
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className={'grid md:grid-cols-4 gap-5'}>
                {alternatifsFromDb.map((alternatif, index) => (
                    <Card key={alternatif.id}>
                        <CardHeader>
                            <div className={'flex justify-between'}>
                                <div>
                                    <CardTitle>
                                        {alternatif.nama_alternatifs}
                                    </CardTitle>
                                    <CardDescription>
                                        tanggal buat {formatDate(alternatif.created_at)}
                                    </CardDescription>
                                </div>
                                <Button onClick={() => setAlternatifToProvider(alternatif)}>
                                    <MousePointer2 />
                                    Pakai
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <div className={'mt-5'}>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Nama Karyawan
                                </TableHead>
                                <TableHead>
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.alternatifs.map((alternatif) => (
                                <TableRow key={alternatif.id}>
                                    <TableCell>
                                        {alternatif.name}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant={'outline'} size={"icon"} onClick={() => deleteAlternatif(alternatif.id)}>
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataAlternatif;