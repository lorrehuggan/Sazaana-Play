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
import { logout } from '@/lib/actions/auth';
import { Session } from 'lucia';
import { User } from 'lucide-react';

type Props = {
  session: Session;
};

export default function Navigation({ session }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 border-[1px] border-b-primary px-8 py-2">
      <span className="text-md pointer-events-none font-bold tracking-tighter">
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
  );
}
