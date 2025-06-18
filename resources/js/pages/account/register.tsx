import GithubButton from '@/components/GithubButton';
import GoogleButton from '@/components/GoogleButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { registerSchema, RegisterSchema } from '@/lib/schema/register';
import { postInertiaForm } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Register() {
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const { formState } = form;

    return (
        <div className="mx-auto w-full max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(postInertiaForm('account.register', form))}>
                    <Card>
                        <CardTitle className="text-center text-sm">Create Your Account</CardTitle>
                        <CardContent className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                                {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Register'}
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Button variant="link" className="text-primary" size={'sm'} disabled={formState.isSubmitting}>
                                    <Link href={route('account.show.login')}>Login</Link>
                                </Button>
                            </p>
                            <p className="mb-2 text-sm text-muted-foreground">or</p>
                            <Link className="w-full" href={route('account.google')}>
                                <GoogleButton className="w-full" disabled={formState.isSubmitting} />
                            </Link>
                            <Link className="w-full" href={route('account.github')}>
                                <GithubButton className="w-full" disabled={formState.isSubmitting} />
                            </Link>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}

Register.layout = (page: React.ReactNode) => <AuthLayout children={page} />;
