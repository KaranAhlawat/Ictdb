import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BaseLayout from '@/layouts/base-layout';
import { talkSchema, TalkSchema } from '@/lib/schema/talk';
import { postInertiaForm } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Loader2, Plus, X } from 'lucide-react';
import { ReactElement, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export default function Create() {
    const tagRef = useRef<HTMLInputElement>(null);
    const form = useForm<TalkSchema>({
        resolver: zodResolver(talkSchema),
        defaultValues: {
            link: '',
            title: '',
            tags: [],
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
        <div className={'mr-auto ml-10 w-full max-w-lg pt-10'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(postInertiaForm(route('talk.create'), form))} className={'flex flex-col gap-8'}>
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
                    <FormField
                        control={form.control}
                        name={'tags'}
                        render={() => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <div>
                                        <div className={'flex flex-row gap-2'}>
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
                            {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Add'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

Create.layout = (p: ReactElement) => <BaseLayout children={p} />;
