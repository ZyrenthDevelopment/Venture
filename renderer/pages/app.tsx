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
import Icon from '../components/Icons/icon';

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
                    <div className="app-home selected">
                        <div className="indicator full"></div>
                        <img src="/images/VentureIcon.svg" alt="Venture Logo" className='app-home-icon' />
                    </div>
                    <div className="separator"></div>
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <div className="separator"></div>
                    <div className="extra-item">
                        <Icon name='add' filled size={28} weight={300} className='extra-icon' />
                    </div>
                </div>
                <div className="content">
                    <div className="navbar">
                        <div className="sidebar">
                            <div className="content">
                                <span>Search for users, servers, DMs...</span>
                            </div>
                            <div className="shadow">
                                <div className="separator"></div>
                                <div className="dropshadow"></div>
                            </div>
                        </div>
                        <div className="body">
                            <div className="content">
                                <div className="nav-left">
                                    <div className="heading">
                                        <Icon name='groups' filled />
                                        <span>Friends</span>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="tabs">
                                        <a href="#" className="button selected">Online</a>
                                        <a href="#" className="button">All</a>
                                        <a href="#" className="button">Pending</a>
                                        <a href="#" className="button">Blocked</a>
                                        <a href="#" className="button filled">Add Friend</a>
                                    </div>
                                </div>
                                <div className="nav-right">
                                    <div className="new-dm">
                                        <Icon name='add_circle' filled />
                                    </div>
                                    <div className="separator"></div>
                                    <div className="icons">
                                        <Icon name='inbox' filled />
                                        <Icon name='code' filled />
                                    </div>
                                </div>
                            </div>
                            <div className="shadow">
                                <div className="separator"></div>
                                <div className="dropshadow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="sidebar">
                            <div className="dm-list">

                            </div>
                            <div className="profile">
                                <div className="user">
                                    <img src="/images/Icon.png" alt="Profile Picture" />
                                    <div className="info">
                                        <span className="username">Venture</span>
                                        <span className="status">Status example</span>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <a href="#" className='button'>
                                        <Icon name='mic' filled size={22} weight={300} />
                                    </a>
                                    <a href="#" className='button'>
                                        <Icon name='headphones' filled size={22} weight={300} />
                                    </a>
                                    <a href="#" className='button'>
                                        <Icon name='settings' filled size={22} weight={300} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="content">

                        </div>
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