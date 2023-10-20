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
import VenturePack from '../utilities/pack/venturePack';
import Tab from '../components/Home/DMList/Tab';
import DMListUser from '../components/Home/DMList/User';

export default function NextPage() {
    const router = useRouter();
    const [publicUser, setUser] = useState<User>(defaultUser);

    function _su(user: User) {
        setUser(user);
    }

    useEffect(() => {
        const _vp = new VenturePack(window);
        
        const token = window.localStorage.getItem('token');

        if (!token) {
            router.push('/');
            return;
        };

        fetchUserNext(apiConfig, token, _su, defaultUser);

        _vp.createPackItem('currentUser', publicUser);

        return;
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
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
                                        <Icon name='maps_ugc' filled />
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
                                <div className="content">
                                    <div className="tabs">
                                        <Tab name='Home' icon='home' />
                                        <Tab name='Friends' icon='groups' isSelected />
                                        <Tab name='Marketplace' icon='store' />
                                        <Tab name='Discovery' icon='explore' />
                                    </div>
                                    <div className="dms">
                                        <div className="heading">
                                            <span>Direct messages</span>
                                            <Icon name='add' filled size={20} />
                                        </div>
                                        <div className="message-requests">
                                            <Tab name='Message requests' icon='contact_support' />
                                        </div>
                                        <div className="users">

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} isSelected />

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} status='real' />

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} rpc={{
                                                name: 'with your mom',
                                                type: 'PLAYING'
                                            }} />

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} rpc={{
                                                name: 'you',
                                                type: 'WATCHING'
                                            }} />

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} rpc={{
                                                name: 'you',
                                                type: 'LISTENING'
                                            }} />

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} rpc={{
                                                name: 'your mom',
                                                type: 'STREAMING'
                                            }} />

                                            <DMListUser user={{
                                                username: 'Venture',
                                                avatarUrl: '/images/logo.png'
                                            }} rpc={{
                                                name: '(un)real fight',
                                                type: 'COMPETING'
                                            }} />

                                        </div>
                                    </div>
                                </div>
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