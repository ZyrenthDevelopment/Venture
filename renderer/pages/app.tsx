import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { NextRouter, Router, useRouter } from 'next/router';
import axios from 'axios';
import fetchUserNext from '../utilities/fetchUserNext';
import User from '../utilities/types/User';
import defaultUser from '../utilities/config/defaultUser';
import apiConfig from '../utilities/config/apiConfig';
import ServerListItem from '../components/ServerListItem';

export default function NextPage() {
    const router = useRouter();
    const [publicUser, setUser] = useState<User>({});

    function _su(user: User) {
        setUser(user);
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');

        if (!token) {
            router.push('/');
            return;
        };

        fetchUserNext(apiConfig, token, _su, defaultUser);

        return;
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>App</title>
            </Head>
            <div className="_app app">
                <div className="server-list">
                    <div className="app-home">
                        <div className={'absolute' ?? "indicator full"}></div>
                        <img src="/images/VentureIcon.svg" alt="Venture Logo" className='app-home-icon' />
                    </div>
                    <div className="separator"></div>
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={true} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <div className="separator"></div>
                    <div className="extra-item">
                        <img src="/images/Plus.svg" alt="Plus" className='extra-icon' />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

async function logout(token: string, router: NextRouter) {
    const response = await axios.post(`${apiConfig.baseUrl}v${apiConfig.version}/auth/logout`, {}, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        validateStatus: (status) => true
    });

    if (!response.request.status.toString().startsWith('2')) return console.log(response.data);

    window.localStorage.removeItem('token');

    router.push('/');
}