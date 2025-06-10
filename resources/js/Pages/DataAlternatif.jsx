import { SawWpContext } from "@/Components/SawWpProvider.jsx";
import { Button } from "@/Components/ui/button.js";
import { Card } from "@/Components/ui/card.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";
import { Input } from "@/Components/ui/input.js";
import { Label } from "@/Components/ui/label.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import { Plus, Save, Trash2, Users } from "lucide-react";
import { useContext, useEffect } from "react";

const DataAlternatif = ({ auth, alternatifsFromDb }) => {
    const {
        addAlternatif,
        updateAlternatif,
        deleteAlternatif,
        data,
        saveAlternatifsToDb,
        setNameAlternatifToDb,
        setAlternatifToProvider
    } = useContext(SawWpContext);

    useEffect(() => {
        if (alternatifsFromDb?.length > 0) {
            const defaultAlternatif = alternatifsFromDb.find(a => a.nama_alternatifs === 'alternatif_default');
            if (defaultAlternatif) {
                setAlternatifToProvider(defaultAlternatif);
            }
        }
    }, [alternatifsFromDb]);

    const handleAddAlternatif = (e) => {
        e.preventDefault();

        const newAlternatif = {
            id: Date.now(),
            name: e.target.name.value,
            position: e.target.position?.value || '',
            department: e.target.department?.value || ''
        };

        addAlternatif(newAlternatif);
        e.target.reset();
    };

    const handleUpdateAlternatif = (id, field, value) => {
        updateAlternatif(id, field, value);
    };

    const handleDeleteAlternatif = (id) => {
        deleteAlternatif(id);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data Karyawan" />

            <div className="flex items-center justify-between mb-5">
                <h1 className="inline-flex items-center gap-2 text-3xl">
                    <Users size={30} />
                    Data Karyawan
                </h1>
                <div className="flex gap-5">
                    <Button variant="outline" onClick={saveAlternatifsToDb}>
                        <Save className="mr-2" />
                        Simpan Perubahan
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2" />
                                Tambah Karyawan
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Karyawan</DialogTitle>
                                <DialogDescription>
                                    Isi form untuk menambahkan data karyawan baru
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddAlternatif} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama Karyawan</Label>
                                    <Input id="name" name="name" required />
                                </div>
                                {/* <div>
                                    <Label htmlFor="position">Jabatan</Label>
                                    <Input id="position" name="position" />
                                </div>
                                <div>
                                    <Label htmlFor="department">Departemen</Label>
                                    <Input id="department" name="department" />
                                </div> */}
                                <Button type="submit" className="w-full">
                                    <Plus className="mr-2" />
                                    Tambah Karyawan
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
                            {/* <TableHead>Jabatan</TableHead>
                            <TableHead>Departemen</TableHead> */}
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.alternatifs.map((alternatif) => (
                            <TableRow key={alternatif.id}>
                                <TableCell>
                                    <Input
                                        value={alternatif.name}
                                        onChange={(e) => handleUpdateAlternatif(alternatif.id, 'name', e.target.value)}
                                    />
                                </TableCell>
                                {/* <TableCell>
                                    <Input
                                        value={alternatif.position}
                                        onChange={(e) => handleUpdateAlternatif(alternatif.id, 'position', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={alternatif.department}
                                        onChange={(e) => handleUpdateAlternatif(alternatif.id, 'department', e.target.value)}
                                    />
                                </TableCell> */}
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDeleteAlternatif(alternatif.id)}
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

export default DataAlternatif;