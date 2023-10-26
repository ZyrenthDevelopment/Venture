'use client';

import { useEffect, useState } from 'react';
import VenturePack from '../../../utilities/pack/venturePack';

export default function LoadingScreen({}) {
    const [hasConnectionIssues, setConnectionIssues] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    setInterval(() => {
        setConnectionIssues(true);
    }, 10000);

    return (
        <>
            {isLoading ? (
                <div className="VentureApp__LoadingScreen">
                    <img src="/images/Loading.svg" className="LoadingScreen__VSVGVector" width={56.71} height={50} />
                    <span className="LoadingScreen__LoadingDYK">Did you know?</span>
                    <span className="LoadingScreen__LoadingDescription">
                        Venture is an open-source, free software :3
                    </span>
                    {hasConnectionIssues ? (
                        <div className="LoadingScreen__LSLoadingIssues">
                            <span className="LSLoadingIssues__LoadingQ">Connection issues?</span>
                            <span className="LSLoadingIssues__LoadingDescription">
                                Check <a href="#">Discord's Status</a> or check our <a href="#">server status</a>.
                            </span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
