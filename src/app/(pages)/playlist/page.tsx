import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
    const { user, session } = await validateRequest();

    if (!session) {
        return redirect('/login');
    }

    return (
        <div>
            <p>{session.userId}</p>
        </div>
    );
}
