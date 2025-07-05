import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
    const [theme, setThemeState] = useState<'theme-light' | 'dark' | 'system'>('theme-light');

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setThemeState(isDarkMode ? 'dark' : 'theme-light');
    }, []);

    useEffect(() => {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    }, [theme]);

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
                <DropdownMenuItem onClick={() => setThemeState('theme-light')} className={"dark:hover:[&>svg]:stroke-primary-foreground"}>
                    <Sun /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState('dark')} className={"dark:hover:[&>svg]:stroke-primary-foreground"}>
                    <Moon /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setThemeState('system')} className={"dark:hover:[&>svg]:stroke-primary-foreground"}>
                    <LaptopMinimal /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
