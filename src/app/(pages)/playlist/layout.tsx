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
            <div className="flex items-center justify-between gap-4 border-[1px] border-b-primary px-8 py-2">
                <span className="text-md font-bold tracking-tighter">
                    SAZAANA
                </span>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <User size={16} />
                                {session.userId}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                            {/* <DropdownMenuSeparator /> */}
                            {/* <DropdownMenuGroup> */}
                            {/* </DropdownMenuGroup> */}
                            <DropdownMenuItem>
                                <form action={logout} className="w-full">
                                    <Button
                                        className="w-full p-0 justify-start text-left text-sm"
                                        type="submit"
                                        variant="ghost"
                                    >
                                        Logout
                                    </Button>
                                </form>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mx-auto mt-8 w-11/12 max-w-5xl">
                <div className="rounded-xl bg-foreground p-8 text-background">
                    <h1 className="text-5xl font-black tracking-tighter">
                        This Is A Playslist Builder.
                    </h1>
                    <h1 className="text-5xl font-black tracking-tighter">
                        Discover Your Next Favorite Song:
                    </h1>
                    <form className="mt-4" action={searchArtist}>
                        <label htmlFor="artist">Enter artist name</label>
                        <fieldset className="flex items-center gap-2">
                            <Input
                                placeholder="Taylor Swift"
                                name="artist"
                                className="mt-1 w-full text-lg bg-secondary"
                            />
                            <Button type="submit" variant="secondary">
                                Create
                            </Button>
                        </fieldset>
                    </form>
                </div>
            </div>

            {children}
        </main>
    );
}
