import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success('Data berhasil disimpan!');
            router.visit(route('dashboard'));
        }
    }, [recentlySuccessful]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Update Password
                </CardTitle>
                <CardDescription>
                    Ensure your account is using a long, random password to stay
                    secure.
                </CardDescription>
            </CardHeader>
            <form onSubmit={updatePassword}>
                <CardContent className={'space-y-2'}>
                    <div>
                        <Label htmlFor="current_password">
                            Current Password
                        </Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type="password"
                        />
                        <Label className={'text-red-500'}>
                            {errors.current_password}
                        </Label>
                    </div>
                    <div>
                        <Label htmlFor="password">
                            New Password
                        </Label>
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                        />
                        <Label className={'text-red-500'}>
                            {errors.password}
                        </Label>
                    </div>
                    <div>
                        <Label htmlFor="password">
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            type="password"
                        />
                        <Label className={'text-red-500'}>
                            {errors.password_confirmation}
                        </Label>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
