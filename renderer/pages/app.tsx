import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextRouter, Router, useRouter } from 'next/router';
import axios from 'axios';
import User from '../utilities/types/User';
import defaultUser from '../utilities/config/defaultUser';
import apiConfig from '../utilities/config/apiConfig';
import ServerListItem from '../components/Serverlist/LisItem';
import VenturePack from '../utilities/pack/venturePack';
import Sidebar from '../components/Home/Sidebar';
import ServerList from '../components/Serverlist/list';
import mergeObjects from '../utilities/objectMerger';
import Api from '../utilities/api';
import DMTab from '../components/Home/DMTab';
import DMUser from '../components/Home/User';
import Page from '../components/Home/Page';
import NavTab from '../components/Home/NavTab';
import LoadingScreen from '../components/Base/Loading/Screen';
import DiscoSocket from '../utilities/pack/ws';
import useAsyncEffect from 'use-async-effect';

function NextPage({}) {
    return <></>;
}

NextPage.getLayout = function getLayout(page) {
    const router = useRouter();
    const [token, setToken] = useState<string>(null);
    const [venturePack, setVP] = useState<VenturePack>(null);
    const [websocket, setWS] = useState<DiscoSocket>(null);
    const [user, setUser] = useState<User>(defaultUser);

    useAsyncEffect(async () => {
        const token = window.localStorage.getItem('token');
        setToken(token);

        if (!token) {
            router.push('/');
            return;
        }

        const _vp = new VenturePack(window);

        setVP(_vp);

        const api = new Api(apiConfig, token);

        const _t = Date.now();

        await fetchData(api, _vp);

        console.log('data fetched, took:', Date.now() - _t, 'ms');

        const ws = new DiscoSocket(_vp, token, window.navigator.userAgent);

        setWS(ws);
    }, []);

    const fetchData = async (api, venturePack) => {
        if (user.id !== '-1') return;
        if (!api.token) return;

        if (venturePack.searchPack('currentUser')) return setUser(venturePack.searchPack('currentUser')[3]);

        const res = await api.get(`/users/${atob(localStorage.getItem('token').split('.')[0])}/profile`);

        const response = res.data;

        const usrdata = mergeObjects(response?.user, response?.user_profile, {
            premium_since: response?.premium_since,
            premium: response?.premium,
            premium_type: response?.premium_type,
        });

        setUser(usrdata);
        venturePack.createPackItem('currentUser', usrdata);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
            </Head>
            <div id="app" className="_app App__VentureApp">
                <LoadingScreen />

                <ServerList isHomeSelected>
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                </ServerList>

                <div className="App__BodyContainer">
                    <Sidebar
                        user={{
                            username: user.global_name,
                            avatarUrl: user.avatar
                                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                                : '/images/logo.png',
                            status: 'really, its unreal real',
                        }}
                        tabs={
                            <>
                                <DMTab name="Home" icon="home" href="/home" />
                                <DMTab name="Friends" icon="groups" notificationCount={6} isSelected />
                                <DMTab name="Marketplace" icon="store" />
                                <DMTab name="Discover" icon="explore" />
                            </>
                        }
                        pinnedDMs={[
                            <DMUser
                                user={{
                                    username: 'Venture Music',
                                    avatarUrl: '/images/logo.png',
                                }}
                                rpc={{
                                    name: 'Spotify',
                                    type: 'LISTENING',
                                }}
                            />,
                            <DMUser
                                user={{
                                    username: 'Pinned DM',
                                    avatarUrl: '/images/logo.png',
                                }}
                                status="its really pinned"
                            />,
                        ]}
                    >
                        <></>
                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            rpc={{
                                name: 'Venture Client',
                                type: 'PLAYING',
                            }}
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />
                    </Sidebar>

                    <Page
                        name="Friends"
                        icon="groups"
                        tabs={[
                            <NavTab name="Online" active />,
                            <NavTab name="All" />,
                            <NavTab name="Pending" notificationCount={6} />,
                            <NavTab name="Blocked" />,
                            <NavTab name="Add Friend" filled />,
                        ]}
                    >
                        <>unreal</>
                    </Page>
                </div>
            </div>
        </React.Fragment>
    );
};

async function logout(token: string, router: NextRouter) {
    const response = await axios.post(
        `${apiConfig.baseUrl}v${apiConfig.version}/auth/logout`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            validateStatus: (status) => true,
        },
    );

    if (!response.request.status.toString().startsWith('2')) return console.log(response.data);

    window.localStorage.removeItem('token');

    router.push('/');
}

export default NextPage;
