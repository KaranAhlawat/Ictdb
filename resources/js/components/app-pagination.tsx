import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { PaginationInfo } from '@/types';

type PaginationProps = PaginationInfo;

export function AppPagination({ next_page_url, prev_page_url, links }: PaginationProps) {
    return (
        <Pagination>
            <PaginationContent className={'gap-2'}>
                <PaginationItem>{prev_page_url ? <PaginationPrevious href={prev_page_url} /> : null}</PaginationItem>
                {links.slice(1, -1).map((link) => (
                    <PaginationItem key={link.url}>
                        <PaginationLink isActive={link.active} href={link.url!} dangerouslySetInnerHTML={{ __html: link.label }} />
                    </PaginationItem>
                ))}
                <PaginationItem>{next_page_url ? <PaginationNext href={next_page_url} /> : null}</PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
