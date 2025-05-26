import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Boxes, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";

const DataSubKriteria = ({ auth }) => {
    const { addSubCriteria, deleteSubCriteria, data } = useContext(SawWpContext);

    const handleAddSubCriteria = (e) => {
        e.preventDefault();

        addSubCriteria({
            id: Date.now(),
            name: e.target.name.value,
            value: parseFloat(e.target.value.value),
            criteria_id: parseInt(e.target.criteria_id.value)
        });

        e.target.reset();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Sub Kriteria" />

            <div className={'mb-5 flex items-center justify-between'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Boxes size={30} />
                    Data Sub Kriteria
                </h1>
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
                            <Select name="criteria_id" required>
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
            <div>
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
                                        {data.criterias.find(c => c.id === subCriteria.criteria_id).name}
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