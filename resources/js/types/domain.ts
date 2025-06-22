import { TalkSchema } from '@/lib/schema/talk';
import { User } from '@/types/index';

export interface Talk extends TalkSchema {
    id: string;
    user: User;
    created_at: string;
}

