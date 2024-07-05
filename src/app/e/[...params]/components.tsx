'use client';
// This file has been sourced from: /Users/betich/code/work/Creatorsgarten/Oknize/src/pages/e/[...params].tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function E() {
    const router = useRouter();

    useEffect(() => {
        if (typeof router.query.params === 'object') {
            router.push(`/event/${router.query.params?.join('/')}`);
        }
    }, [router]);

    return <p>redirecting...</p>;
}
