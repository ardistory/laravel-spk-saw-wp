import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Profile from '../../img/default.png';
import { Head, useForm } from "@inertiajs/react";
import { UserPlus, UsersRound } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Card } from "@/Components/ui/card.js";
import { formatDate } from "@/lib/formatDate.js";
import { Button } from "@/Components/ui/button.js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input.js";
import { Label } from "@/Components/ui/label.js";
import { useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/Components/ui/avatar.js";

const DataUser = ({ users, auth }) => {
    const { data, setData, post, processing, recentlySuccessful, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast('Berhasil menambahkan user');
        }
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Data User" />

            <div className={'space-y-5'}>
                <div className={'flex items-center justify-between'}>
                    <h1 className={'inline-flex items-center gap-2 text-3xl'}>
                        <UsersRound size={30} />
                        Data User
                    </h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={'bg-green-500 hover:bg-green-600'}>
                                <UserPlus />
                                Tambah User
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah User</DialogTitle>
                                <DialogDescription>
                                    Silahkan masukan data user yang ingin di tambahkan
                                </DialogDescription>
                                <form onSubmit={submit} className={'space-y-2'}>
                                    <Input placeholder={'Name'} value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    <Label className={'text-red-500'}>{errors.name}</Label>
                                    <Input type={'email'} placeholder={'Email'} value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    <Label className={'text-red-500'}>{errors.email}</Label>
                                    <Input type={'password'} placeholder={'Password'} value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                    <Label className={'text-red-500'}>{errors.password}</Label>
                                    <Input type={'password'} placeholder={'Password confirmation'} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                                    <Label className={'text-red-500'}>{errors.password_confirmation}</Label>
                                    <Button disabled={processing} className={'w-full bg-green-500 hover:bg-green-600'}><UserPlus />Tambah</Button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users && users.map(user => (
                                <TableRow key={user.email}>
                                    <TableCell className={'font-medium flex items-center gap-2'}>
                                        <Avatar>
                                            <AvatarImage src={Profile} />
                                        </Avatar>
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{formatDate(user.created_at)}</TableCell>
                                    <TableCell>{formatDate(user.updated_at)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataUser;