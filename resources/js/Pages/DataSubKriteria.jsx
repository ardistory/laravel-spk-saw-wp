import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Label } from "@/Components/ui/label.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Boxes, Plus, Save, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const DataSubKriteria = ({ auth, subCriteriasFromDb }) => {
    const {
        addSubCriteria,
        updateSubCriteria,
        deleteSubCriteria,
        data,
        setNameSubCriteriaToDb,
        saveSubCriteriasToDb,
        setSubCriteriaToProvider
    } = useContext(SawWpContext);

    const [criteriaId, setCriteriaId] = useState('');

    useEffect(() => {
        if (subCriteriasFromDb?.length > 0) {
            const defaultSubCriteria = subCriteriasFromDb.find(sc => sc.nama_sub_kriteria === 'sub_criteria_default');
            if (defaultSubCriteria) {
                setSubCriteriaToProvider(defaultSubCriteria);
            }
        }
    }, [subCriteriasFromDb]);

    const handleAddSubCriteria = (e) => {
        e.preventDefault();

        const newSubCriteria = {
            id: Date.now(),
            name: e.target.name.value,
            value: parseFloat(e.target.value.value),
            criteria_id: parseInt(e.target.criteria_id.value)
        };

        addSubCriteria(newSubCriteria);
        e.target.reset();
        setCriteriaId('');
    };

    const handleUpdateSubCriteria = (id, field, value) => {
        updateSubCriteria(id, field, value);
    };

    const handleDeleteSubCriteria = (id) => {
        deleteSubCriteria(id);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Sub Kriteria" />

            <div className="flex items-center justify-between mb-5">
                <h1 className="inline-flex items-center gap-2 text-3xl">
                    <Boxes size={30} />
                    Data Sub Kriteria
                </h1>
                <div className="flex gap-5">
                    <Button variant="outline" onClick={saveSubCriteriasToDb}>
                        <Save className="mr-2" />
                        Simpan Perubahan
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2" />
                                Tambah Sub Kriteria
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Sub Kriteria</DialogTitle>
                                <DialogDescription>
                                    Isi form untuk menambahkan sub kriteria baru
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddSubCriteria} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama Sub Kriteria</Label>
                                    <Input id="name" name="name" required />
                                </div>
                                <div>
                                    <Label htmlFor="value">Nilai</Label>
                                    <Input id="value" type="number" step="0.01" name="value" required />
                                </div>
                                <div>
                                    <Label htmlFor="criteria_id">Kriteria</Label>
                                    <Select
                                        value={criteriaId}
                                        onValueChange={setCriteriaId}
                                        name="criteria_id"
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kriteria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {data.criterias.map((criteria) => (
                                                <SelectItem key={criteria.id} value={criteria.id.toString()}>
                                                    {criteria.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full">
                                    <Plus className="mr-2" />
                                    Tambah Sub Kriteria
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Nilai</TableHead>
                            <TableHead>Kriteria</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.subCriterias.map((subCriteria) => (
                            <TableRow key={subCriteria.id}>
                                <TableCell>
                                    <Input
                                        value={subCriteria.name}
                                        onChange={(e) => handleUpdateSubCriteria(subCriteria.id, 'name', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={subCriteria.value}
                                        onChange={(e) => handleUpdateSubCriteria(subCriteria.id, 'value', parseFloat(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={subCriteria.criteria_id?.toString()}
                                        onValueChange={(value) => handleUpdateSubCriteria(subCriteria.id, 'criteria_id', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {data.criterias.map((criteria) => (
                                                <SelectItem key={criteria.id} value={criteria.id.toString()}>
                                                    {criteria.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDeleteSubCriteria(subCriteria.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </AuthenticatedLayout>
    );
};

export default DataSubKriteria;