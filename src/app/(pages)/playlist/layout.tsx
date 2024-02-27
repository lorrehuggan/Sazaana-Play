import Navigation from '@/components/playlist/Navigation';
import SearchBlock from '@/components/playlist/SearchBlock';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { searchArtist } from '@/lib/actions/artist';
import { logout } from '@/lib/actions/auth';
import { validateRequest } from '@/lib/auth';
import { Label } from '@radix-ui/react-label';
import { User } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { session } = await validateRequest();

    if (!session) {
        return redirect('/login');
    }

    return (
        <main>
            <Navigation session={session} />
            <SearchBlock />
            {children}
        </main>
    );
}
