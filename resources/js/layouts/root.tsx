import { Toaster } from '@/components/ui/sonner';
import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.message && flash?.type) {
            switch (flash.type) {
                case 'success':
                    toast.success(flash.message);
                    break;
                case 'error':
                    toast.error(flash.message);
                    break;
                case 'warning':
                    toast.warning(flash.message);
                    break;
                case 'info':
                    toast.info(flash.message);
                    break;
            }
        }
    }, [flash?.type, flash?.message]);

    return (
        <>
            <Toaster />
            {children}
        </>
    );
}
