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

'use client';

import Image from 'next/image';
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import VenturePack from '../../../utilities/pack/venturePack';

export default function LoadingScreen() {
    const [hasConnectionIssues, setConnectionIssues] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    setInterval(() => {
        setConnectionIssues(true);
    }, 10000);

    useAsyncEffect(async () => {
        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                const pack = new VenturePack(window);
                if (pack.searchPack('_ws')) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                const pack = new VenturePack(window);
                if (pack.searchPack('_dispatch')) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });

        const pack = new VenturePack(window);

        pack.searchPack('_ws')[3][0].onclose(() => {
            setLoading(true);
        });

        pack.searchPack('_ws')[3][0].onopen(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div className={`VentureApp__LoadingScreen${isLoading ? '' : ' opacity-0 pointer-events-none'}`}>
                <Image
                    src="/images/Loading.svg"
                    alt="Loading icon."
                    className="LoadingScreen__VSVGVector"
                    width={56.71}
                    height={50}
                />
                <span className="LoadingScreen__LoadingDYK">Did you know?</span>
                <span className="LoadingScreen__LoadingDescription">Venture is an open-source, free software :3</span>
                {hasConnectionIssues ? (
                    <div className="LoadingScreen__LSLoadingIssues">
                        <span className="LSLoadingIssues__LoadingQ">Connection issues?</span>
                        <span className="LSLoadingIssues__LoadingDescription">
                            Check <a href="#">Discord&apos;s Status</a> or check our <a href="#">server status</a>.
                        </span>
                    </div>
                ) : null}
            </div>
        </>
    );
}