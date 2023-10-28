/*
 * Venture, an open-source Discord client focused on speed and convenience.
 * Copyright (c) 2023 Zyrenth
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import VenturePack from '../utilities/pack/venturePack';

export default function HomePage() {
    const router = useRouter();

    const init = async () => {
        new VenturePack(window);

        const token = window.localStorage.getItem('token');

        if (token) router.push('/app');
        else router.push('/login');
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
            </Head>
            <div id="app" className="_app"></div>
        </React.Fragment>
    );
}
