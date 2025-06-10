import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, router } from "@inertiajs/react";
import { Plus, TextSearch, Trash2 } from "lucide-react";
import { useContext, useState } from "react";

const DataPenilaian = ({ auth }) => {
    const { addScore, data } = useContext(SawWpContext);
    const [alternatifId, setAlternatifId] = useState('');
    const [criteriaId, setCriteriaId] = useState('');

    const handleAddScore = (e) => {
        e.preventDefault();

        addScore({
            criteria_id: parseInt(e.target.criteria_id.value),
            alternatif_id: parseInt(e.target.alternatif_id.value),
            value: parseInt(e.target.value.value)
        });

        e.target.reset();
        setAlternatifId('');
        setCriteriaId('');
        router.visit(route('data-penilaian'));
    };

    const getScore = (alternatif_id, criteria_id) => {
        const score = data.scores.find((score) => score.alternatif_id === alternatif_id && score.criteria_id === criteria_id);
        return score ? score.value : 'Belum Di Nilai';
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Penilaian" />

            <div className={'flex items-center justify-between mb-5'}>
                <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                    <TextSearch size={30} />
                    Data Penilaian
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus />
                            Buat Penilaian
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            Data Penilaian
                        </DialogTitle>
                        <DialogDescription>
                            penilaian karyawan untuk setiap kriteria
                        </DialogDescription>
                        <form onSubmit={handleAddScore} className={'space-y-5'}>
                            <Select value={alternatifId} onValueChange={(value) => setAlternatifId(value)} name="alternatif_id" required>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Pilih Karyawan'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {data.alternatifs.map((alternatif) => (
                                        <SelectItem key={alternatif.id} value={alternatif.id.toString()}>{alternatif.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={criteriaId} onValueChange={(value) => setCriteriaId(value)} name={'criteria_id'} required>
                                <SelectTrigger>
                                    <SelectValue placeholder={'Pilih Kriteria'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {data.criterias.map((criteria) => (
                                        <SelectItem key={criteria.id} value={criteria.id.toString()}>{criteria.code} - {criteria.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input type="number" name="value" placeholder={'Nilai yang diberikan'} required />
                            <Button type="submit">
                                <Plus />
                                Buat Penilaian
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
                                <TableHead rowSpan={2} className={'border-r'}>Karyawan</TableHead>
                                <TableHead colSpan={data.criterias.length} className={'text-center'}>Kriteria</TableHead>
                            </TableRow>
                            <TableRow>
                                {data.criterias.map(criteria => (
                                    <TableHead key={criteria.id} className={'border-r'}>{criteria.code}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.alternatifs.map(alternatif => (
                                <TableRow key={alternatif.id}>
                                    <TableCell className={'border-r'}>{alternatif.name}</TableCell>
                                    {data.criterias.map(criteria => (
                                        <TableCell key={Math.floor(Math.random() * 1000)} className={'border-r'}>{getScore(alternatif.id, criteria.id)}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AuthenticatedLayout >
    );
};

export default DataPenilaian;