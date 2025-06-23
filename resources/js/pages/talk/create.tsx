import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BaseLayout from '@/layouts/base-layout';
import { talkSchema, TalkSchema } from '@/lib/schema/talk';
import { postInertiaForm } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export default function Create() {
    const form = useForm<TalkSchema>({
        resolver: zodResolver(talkSchema),
        defaultValues: {
            link: '',
            title: '',
        },
    });

    const { formState } = form;

    return (
        <div className={'mr-auto ml-10 w-full max-w-lg pt-10'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(postInertiaForm('talk.create', form))} className={'flex flex-col gap-8'}>
                    <FormField
                        control={form.control}
                        name={'title'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} required placeholder={'Simple Made Easy'} />
                                </FormControl>
                                <FormDescription>The title/name of the talk</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'link'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input {...field} required placeholder={'https://youtube.com/great-talk'} />
                                </FormControl>
                                <FormDescription>The link to watch it online</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'speaker'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Speaker</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={'Rich Hickey'} />
                                </FormControl>
                                <FormDescription>The speaker who delivered the talk</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'description'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder={''} />
                                </FormControl>
                                <FormDescription>A description for the talk</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex justify-between'}>
                        <Button variant={'ghost'} className={'w-fit'} type={'button'} onClick={() => window.history.back()}>
                            <ChevronLeft />
                            Back
                        </Button>
                        <Button type="submit" className={'w-fit'} disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Add'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

Create.layout = (p: ReactElement) => <BaseLayout children={p} />;
