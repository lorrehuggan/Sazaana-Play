import Navigation from '@/components/playlist/Navigation';
import SearchBlock from '@/components/playlist/SearchBlock';
import { validateRequest } from '@/lib/auth';
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
