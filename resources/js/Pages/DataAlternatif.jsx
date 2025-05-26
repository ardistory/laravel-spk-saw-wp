import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Boxes, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";

const DataAlternatif = ({ auth }) => {
    const { addAlternatif, deleteAlternatif, data } = useContext(SawWpContext);

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
            <div>
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