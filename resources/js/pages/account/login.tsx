import GithubButton from '@/components/github-button';
import GoogleButton from '@/components/google-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { loginSchema, LoginSchema } from '@/lib/schema/login';
import { postInertiaForm } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

function Login() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { formState } = form;

    return (
        <div className="mx-auto w-full max-w-md">
            <Card>
                <CardHeader className={'text-center'}>
                    <CardTitle className={'text-xl'}>Welcome Back</CardTitle>
                    <CardDescription>Login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(postInertiaForm(route('account.login'), form))}>
                            <div className="flex flex-col gap-4">
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
                                <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                                    {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Login'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Button variant="link" className="text-primary" size={'sm'} disabled={formState.isSubmitting}>
                            <Link href={route('account.show.register')}>Register</Link>
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
        </div>
    );
}

Login.layout = (page: React.ReactNode) => <AuthLayout children={page} />;

export default Login;
