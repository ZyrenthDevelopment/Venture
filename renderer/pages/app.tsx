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
            <div className="grid grid-col-1 text-2xl w-full text-center">
                <span id='welcome'>Welcome {publicUser.global_name} your id is {publicUser.id} and your username is {publicUser.discriminator === '0' ? 'migrated' : 'not migrated'}.</span>
                <button className='button-primary' onClick={() => logout(window.localStorage.getItem('token'), router)}>Logout</button>
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