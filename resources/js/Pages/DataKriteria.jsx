import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Box, Plus, Save, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const DataKriteria = ({ auth, criteriasFromDb }) => {
    const {
        addCriteria,
        updateCriteria,
        deleteCriteria,
        data,
        saveCriteriasToDb,
        setCriteriaToProvider
    } = useContext(SawWpContext);

    const [type, setType] = useState('');

    const handleAddCriteria = (e) => {
        e.preventDefault();

        const newCriteria = {
            id: Date.now(),
            code: e.target.code.value,
            name: e.target.name.value,
            type: e.target.type.value,
            weight: parseFloat(e.target.weight.value)
        };

        addCriteria(newCriteria);
        e.target.reset();
        setType('');
    };

    const handleUpdateCriteria = (id, field, value) => {
        updateCriteria(id, field, value);
    };

    const handleDeleteCriteria = (id) => {
        deleteCriteria(id);
    };

    useEffect(() => {
        if (criteriasFromDb?.length > 0) {
            const defaultCriteria = criteriasFromDb.find(c => c.nama_kriteria === 'criteria_default');
            if (defaultCriteria) {
                setCriteriaToProvider(defaultCriteria);
            }
        }
    }, [criteriasFromDb]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Kriteria" />
            <div className={'flex items-center justify-between mb-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Box size={30} />
                    Data Kriteria
                </h1>
                <div className={'flex gap-5'}>
                    <Button variant={"outline"} onClick={saveCriteriasToDb}>
                        <Save />
                        Simpan Perubahan
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus />
                                Tambah Kriteria
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Data Kriteria</DialogTitle>
                            <DialogDescription>
                                tambah data kriteria
                            </DialogDescription>
                            <form onSubmit={handleAddCriteria} className={'space-y-5'}>
                                <Input type={'text'} name={'code'} placeholder={'Kode Kriteria'} required />
                                <Input type={'text'} name={'name'} placeholder={'Nama Kriteria'} required />
                                <Select value={type} onValueChange={setType} name={'type'} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tipe Kriteria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="benefit">Benefit</SelectItem>
                                        <SelectItem value="cost">Cost</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input type="number" placeholder={'bobot'} step="0.01" name="weight" required />
                                <Button type="submit">
                                    <Plus />
                                    Tambah Kriteria
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
                            <TableHead>Kode</TableHead>
                            <TableHead>Nama Kriteria</TableHead>
                            <TableHead>Tipe</TableHead>
                            <TableHead>Bobot</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.criterias.map((criteria) => (
                            <TableRow key={criteria.id}>
                                <TableCell>
                                    <Input
                                        value={criteria.code}
                                        onChange={(e) => handleUpdateCriteria(criteria.id, 'code', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={criteria.name}
                                        onChange={(e) => handleUpdateCriteria(criteria.id, 'name', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={criteria.type}
                                        onValueChange={(value) => handleUpdateCriteria(criteria.id, 'type', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="benefit">Benefit</SelectItem>
                                            <SelectItem value="cost">Cost</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={criteria.weight}
                                        onChange={(e) => handleUpdateCriteria(criteria.id, 'weight', parseFloat(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDeleteCriteria(criteria.id)}
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

export default DataKriteria;