import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { sessionTable } from '@/lib/db/schema/user';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function getAccessToken() {
  const { session } = await validateRequest();

  if (!session) {
    return redirect('/login');
  }

  const getAccessToken = await db
    .select({
      accessToken: sessionTable.accessToken,
    })
    .from(sessionTable)
    .where(eq(sessionTable.id, session.id));

  const { accessToken } = getAccessToken[0];

  return accessToken;
}
