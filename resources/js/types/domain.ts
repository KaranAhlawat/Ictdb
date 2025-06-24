import { TalkSchema } from '@/lib/schema/talk';
import { User } from '@/types/index';

export interface Tag {
    name: string;
}

export interface Talk extends Omit<TalkSchema, 'tags'> {
    id: string;
    user: User;
    thumbnail: string;
    created_at: string;
    slug: string;
    tags: Tag[];
}
