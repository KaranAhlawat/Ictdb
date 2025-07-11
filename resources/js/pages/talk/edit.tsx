import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BaseLayout from '@/layouts/base-layout';
import { talkSchema, TalkSchema } from '@/lib/schema/talk';
import { postInertiaForm } from '@/lib/utils';
import { Talk } from '@/types/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Loader2, Plus, X } from 'lucide-react';
import { useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface EditProps {
    talk: Talk;
}

export default function Edit({ talk }: EditProps) {
    const tagRef = useRef<HTMLInputElement>(null);
    const form = useForm<TalkSchema>({
        resolver: zodResolver(talkSchema),
        defaultValues: {
            link: talk.link,
            description: talk.description,
            title: talk.title,
            tags: talk.tags?.map((value) => ({ value: value.name })) ?? [],
            speaker: talk.speaker,
        },
    });
    const {
        fields: tags,
        append,
        remove,
    } = useFieldArray({
        name: 'tags',
        control: form.control,
    });

    const { formState } = form;

    const addTag = () => {
        if (tagRef.current?.value) {
            append({ value: tagRef.current.value });
            tagRef.current.value = '';
            tagRef.current.focus();
        }
    };

    return (
        <BaseLayout>
            <div className={'ml-5 max-w-lg pt-10 sm:ml-10 lg:mr-auto lg:w-full'}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(postInertiaForm(route('talk.update', { talk: talk.slug }), form))}
                        className={'flex flex-col gap-8'}
                    >
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
                                        <Textarea {...field} placeholder={''} rows={5} />
                                    </FormControl>
                                    <FormDescription>A description for the talk</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'tags'}
                            render={() => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <div className={'flex flex-col gap-2'}>
                                            <div className={'flex flex-row flex-wrap gap-2'}>
                                                {tags.map((tag, index) => (
                                                    <div key={tag.id} className={'flex justify-between gap-2'}>
                                                        <Badge className={'flex items-center p-2 py-1'}>
                                                            <p>{tag.value}</p>
                                                            <button className={'cursor-pointer'}>
                                                                <X size={12} strokeWidth={3} onClick={() => remove(index)} />
                                                            </button>
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={'flex justify-between gap-2'}>
                                                <Input
                                                    ref={tagRef}
                                                    className={'flex-1'}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            addTag();
                                                        }
                                                    }}
                                                    defaultValue={''}
                                                />
                                                <Button variant={'ghost'} size={'icon'} type={'button'} onClick={addTag}>
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className={'flex justify-between'}>
                            <Button variant={'ghost'} className={'w-fit'} type={'button'} onClick={() => window.history.back()}>
                                <ChevronLeft />
                                Back
                            </Button>
                            <Button type="submit" className={'w-fit'} disabled={formState.isSubmitting}>
                                {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Update'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </BaseLayout>
    );
}
