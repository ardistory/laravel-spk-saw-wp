import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Badge } from "@/Components/ui/badge.js";
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
import { Boxes, MousePointer2, Plus, Save, Trash2 } from "lucide-react";
import { useContext, useState } from "react";

const DataSubKriteria = ({ auth, subCriteriasFromDb }) => {
    const { addSubCriteria, deleteSubCriteria, data, setNameSubCriteriaToDb, saveSubCriteriasToDb, setSubCriteriaToProvider } = useContext(SawWpContext);
    const [criteria, setCriteria] = useState('');

    const handleAddSubCriteria = (e) => {
        e.preventDefault();

        addSubCriteria({
            id: Date.now(),
            name: e.target.name.value,
            value: parseFloat(e.target.value.value),
            criteria_id: parseInt(e.target.criteria_id.value)
        });

        e.target.reset();
        setCriteria('');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Sub Kriteria" />

            <div className={'mb-5 flex items-center justify-between'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Boxes size={30} />
                    Data Sub Kriteria
                </h1>
                <div className={'flex gap-5'}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>
                                <Save />
                                Simpan Sub Kriteria Saat Ini
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Simpan Sub Kriteria
                                </DialogTitle>
                                <DialogDescription>
                                    simpan sub kriteria untuk bisa digunakan kembali
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={saveSubCriteriasToDb} className={'space-y-5'}>
                                <div>
                                    <Label>
                                        Nama
                                    </Label>
                                    <Input onChange={(e) => setNameSubCriteriaToDb(e.target.value)} />
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
                                Tambah Sub Kriteria
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>
                                Data Sub Kriteria
                            </DialogTitle>
                            <DialogDescription>
                                tambah data sub kriteria
                            </DialogDescription>
                            <form onSubmit={handleAddSubCriteria} className={'space-y-5'}>
                                <Input type="text" name="name" placeholder={'Nama Sub Kriteria'} required />
                                <Input type="number" step="0.01" name="value" placeholder={'Nilai Sub Kriteria'} required />
                                <Select value={criteria} onValueChange={(value) => setCriteria(value)} name="criteria_id" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder={'Pilih Kriteria'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data.criterias.map((criteria) => (
                                            <SelectItem key={criteria.id} value={criteria.id.toString()}>{criteria.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="submit">
                                    <Plus />
                                    Tambah Sub Kriteria
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className={'grid md:grid-cols-4 gap-5'}>
                {subCriteriasFromDb.map((subCriteria, index) => (
                    <Card key={subCriteria.id}>
                        <CardHeader>
                            <div className={'flex justify-between'}>
                                <div>
                                    <CardTitle>
                                        {subCriteria.nama_sub_kriteria}
                                    </CardTitle>
                                    <CardDescription>
                                        tanggal buat {formatDate(subCriteria.created_at)}
                                    </CardDescription>
                                </div>
                                <Button onClick={() => setSubCriteriaToProvider(subCriteria)}>
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
                                    Nama Sub Kriteria
                                </TableHead>
                                <TableHead>
                                    Nilai
                                </TableHead>
                                <TableHead>
                                    Kriteria
                                </TableHead>
                                <TableHead>
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.subCriterias.map((subCriteria) => (
                                <TableRow key={subCriteria.id}>
                                    <TableCell>
                                        {subCriteria.name}
                                    </TableCell>
                                    <TableCell>
                                        {subCriteria.value}
                                    </TableCell>
                                    <TableCell>
                                        {data.criterias.find(c => c.id === subCriteria.criteria_id)?.name ?? <Badge>Tidak cocok</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant={'outline'} size={"icon"} onClick={() => deleteSubCriteria(subCriteria.id)}>
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

export default DataSubKriteria;