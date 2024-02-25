import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/db';
import { headers } from 'next/headers';

async function searchArtist(formData: FormData) {
    'use server';
    const artist = formData.get('artist');
}

export default async function Page() {
    return <></>;
}
