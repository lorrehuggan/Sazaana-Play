import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { sessionTable } from '@/lib/db/schema/user';
import { env } from '@/lib/env/server';
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
      refreshToken: sessionTable.refreshToken,
      expiresAt: sessionTable.expiresAt,
    })
    .from(sessionTable)
    .where(eq(sessionTable.id, session.id));

  const { accessToken, refreshToken, expiresAt } = getAccessToken[0];

  if (new Date(expiresAt) < new Date()) {
    console.log('Refreshing token');
    const url = new URL('https://accounts.spotify.com/api/token');

    const payload = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    };

    const response = await fetch(url, payload);

    const tokens = await response.json();

    await db
      .update(sessionTable)
      .set({
        accessToken: tokens.access_token,
        expiresAt: expiresAt + tokens.expires_in,
      })
      .where(eq(sessionTable.id, session.id));

    return tokens.access_token;
  }

  return accessToken;
}
