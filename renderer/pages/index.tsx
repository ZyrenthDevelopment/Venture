import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import VenturePack from '../utilities/pack/venturePack';

export default function HomePage() {
    const router = useRouter();

    const init = async () => {
        new VenturePack(window);

        const token = window.localStorage.getItem('token');

        if (token) router.push('/app');
        else router.push('/login');
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
            </Head>
            <div id="app" className='_app'></div>
        </React.Fragment>
    )
}