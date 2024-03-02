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
            <section className="min-h-[calc(100vh-22.5rem)]">
                {children}
            </section>
            <div className="flex items-center justify-center gap-4 border-[1px] border-t-primary px-8 py-4">
                <p className="text-muted-foreground text-xs">
                    Built by{' '}
                    <span>
                        <a
                            href="https://twitter.com/LorreHuggan"
                            className="hover:text-primary transition duration-300 ease-out cursor-pointer"
                        >
                            Lorre Huggan
                        </a>
                    </span>{' '}
                    with Love
                </p>
            </div>
        </main>
    );
}
