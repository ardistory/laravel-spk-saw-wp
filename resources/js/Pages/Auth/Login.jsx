import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className={'w-full flex flex-col md:flex-row gap-5 justify-between'}>
                <div className={'text-white md:w-1/2 space-y-6'}>
                    <h1 className={'text-4xl font-semibold'}>
                        Sistem Pendukung Keputusan Metode SAW WP
                    </h1>
                    <p className={'text-xl'}>
                        Metode Simple Additive Weighting (SAW) adalah salah satu Metode Fuzzy Multiple Attribute Decision Making (FMADM) yang mampu menyelesaikan masalah multiple attribute decision making dengan cara membobotkan semua kriteria dan alternatif yang menghasilkan nilai referensi yang tepat.
                    </p>
                    <p className={'text-xl'}>
                        Metode Weighted Product (WP) adalah salah satu metode yang digunakan untuk penyelesaian sistem pengambilan keputusan dengan mempertimbangkan kriteria dan bobot. Metode WP merupakan salah satu dari beberapa metode Multi Atribute Decision Making (MADM) dimana pengambilan keputusan didasarkan pada beberapa atribut.
                    </p>
                </div>
                <div className={'md:w-1/3'}>
                    <form onSubmit={submit}>
                        <Card>
                            <CardHeader>
                                <CardTitle className={'text-3xl font-thin text-center'}>
                                    Login Account
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Input className={'rounded-full p-7'} type={'email'} value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder={'Email'} />
                                    <Label className={'text-red-500'}>{errors.email}</Label>
                                </div>
                                <div className={'mt-5'}>
                                    <Input className={'rounded-full p-7'} type={'password'} value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder={'Password'} />
                                    <Label className={'text-red-500'}>{errors.password}</Label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className={'bg-yellow-500 hover:bg-yellow-600 w-full rounded-full p-7'} disabled={processing}>
                                    <LogIn />
                                    Masuk
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
