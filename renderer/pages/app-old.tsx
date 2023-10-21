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
import ServerListItem from '../components/Serverlist/LisItem';
import Icon from '../components/Icons/icon';
import VenturePack from '../utilities/pack/venturePack';
import Tab from '../components/Home/DMList/Tab';
import DMListUser from '../components/Home/DMList/User';
import Nav from '../components/Home/Navbar/Nav';
import Sidebar from '../components/Home/DMList/Sidebar';
import ServerList from '../components/Serverlist/list';
import mergeObjects from '../utilities/objectMerger';
import Api from '../utilities/api';

export default function NextPage({}) {
    const router = useRouter();
    const [token, setToken] = useState<string>(null);
    const [venturePack, setVP] = useState<VenturePack>(null);
    const [user, setUser] = useState<User>(defaultUser);

    const init = async (window) => {
        const token = window.localStorage.getItem('token');
        setToken(token);
        
        if (!token) {
            router.push('/');
            return;
        };

        const _vp = new VenturePack(window);

        setVP(_vp);
    };

    useEffect(() => {
        init(window);
    }, []);

    const api = new Api(apiConfig, token);

    const fetchData = async () => {
        if (user.id !== '-1') return;
        if (!api.token) return;

        const res = await api.get(`/users/${atob(localStorage.getItem('token').split('.')[0])}/profile`);

        const response = res.data;

        const usrdata = mergeObjects(response?.user, response?.user_profile, {
            premium_since: response?.premium_since,
            premium: response?.premium,
            premium_type: response?.premium_type
        });

        setUser(usrdata);
        venturePack.createPackItem('currentUser', user);
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
            </Head>
            <div id="app" className="_app app">

                <ServerList isHomeSelected>
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl='/images/Icon.png' isSelected={false} hasNewMessages={false} />
                </ServerList>

                <div className="content">

                    <Nav name='Friends' icon='groups' >
                        <a href="#" className="button selected">Online</a>
                        <a href="#" className="button">All</a>
                        <a href="#" className="button">Pending</a>
                        <a href="#" className="button">Blocked</a>
                        <a href="#" className="button filled">Add Friend</a>
                    </Nav>

                    <div className="body">

                        <Sidebar
                        tabs={<>
                            <Tab name='Home' icon='home' />
                            <Tab name='Friends' icon='groups' isSelected />
                            <Tab name='Marketplace' icon='store' />
                            <Tab name='Discovery' icon='explore' />
                        </>}

                        user={{
                            username: user.global_name,
                            avatarUrl: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : '/images/logo.png',
                            status: 'Online'
                        }}>
                            <DMListUser user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }} isSelected />

                            <DMListUser user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }} status='real' />

                            <DMListUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }}
                            
                            rpc={{
                                name: 'with your mom',
                                type: 'PLAYING'
                            }} />

                            <DMListUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }}
                            
                            rpc={{
                                name: 'you',
                                type: 'WATCHING'
                            }} />

                            <DMListUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }}
                            
                            rpc={{
                                name: 'you',
                                type: 'LISTENING'
                            }} />

                            <DMListUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }}
                            
                            rpc={{
                                name: 'your mom',
                                type: 'STREAMING'
                            }} />

                            <DMListUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png'
                            }}

                            rpc={{
                                name: '(un)real fight',
                                type: 'COMPETING'
                            }} />
                        </Sidebar>

                        <div className="content">
                            user: {user['username']}
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