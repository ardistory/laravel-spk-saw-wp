import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Box, Plus, Trash2 } from "lucide-react";
import { useContext, useState } from "react";

const DataKriteria = ({ auth }) => {
    const { addCriteria, deleteCriteria, data } = useContext(SawWpContext);
    const [type, setType] = useState('');

    const handleAddCriteria = (e) => {
        e.preventDefault();

        addCriteria({
            id: Date.now(),
            code: e.target.code.value,
            name: e.target.name.value,
            type: e.target.type.value,
            weight: parseFloat(e.target.weight.value)
        });

        e.target.reset();
        setType('');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Kriteria" />
            <div className={'flex items-center justify-between mb-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <Box size={30} />
                    Data Kriteria
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus />
                            Tambah Kriteria
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            Data Kriteria
                        </DialogTitle>
                        <DialogDescription>
                            tambah data kriteria
                        </DialogDescription>
                        <div>
                            <form onSubmit={handleAddCriteria} className={'space-y-5'}>
                                <Input type={'text'} name={'code'} placeholder={'Kode Kriteria'} required />
                                <Input type={'text'} name={'name'} placeholder={'Nama Kriteria'} required />
                                <Select value={type} onValueChange={(value) => setType(value)} name={'type'}>
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
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    kode Kriteria
                                </TableHead>
                                <TableHead>
                                    Nama Kriteria
                                </TableHead>
                                <TableHead>
                                    Tipe
                                </TableHead>
                                <TableHead>
                                    Bobot
                                </TableHead>
                                <TableHead>
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.criterias.map((criteria) => (
                                <TableRow key={criteria.id}>
                                    <TableCell>
                                        {criteria.code}
                                    </TableCell>
                                    <TableCell>
                                        {criteria.name}
                                    </TableCell>
                                    <TableCell>
                                        {criteria.type}
                                    </TableCell>
                                    <TableCell>
                                        {criteria.weight}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => deleteCriteria(criteria.id)} size={"icon"} variant={'outline'}>
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

export default DataKriteria;