import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/lib/use-appearance';
import { LaptopMinimal, Moon, Sun } from 'lucide-react';

export default function ModeToggle() {
    const { updateAppearance } = useAppearance();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={'dark:hover:text-secondary-foreground'}>
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updateAppearance('light')} className={'dark:hover:[&>svg]:stroke-primary-foreground'}>
                    <Sun /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('dark')} className={'dark:hover:[&>svg]:stroke-primary-foreground'}>
                    <Moon /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('system')} className={'dark:hover:[&>svg]:stroke-primary-foreground'}>
                    <LaptopMinimal /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
