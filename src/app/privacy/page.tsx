'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Privacy() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        async function fetchData() {
        (fetch('https://hanzo.dxpshift.com/api/page/privacy', { cache: 'no-store' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            setTitle(data.data.sections[0]?.title);
            setText(data.data.sections[0]?.details.text || '');
            }
        }));
        }
        fetchData();
    }, []);

    return (
        <div className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-20 py-20">
                <h1 className="text-3xl text-center font-bold mb-4">{title}</h1>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: text }} />
                <div className="mt-8 text-right">
                    <Link href="/" className="text-gray-300 hover:underline">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}