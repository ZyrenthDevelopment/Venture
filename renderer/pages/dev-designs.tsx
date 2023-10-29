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
import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import Button from '../components/Base/Elements/Button';
import InputField from '../components/Base/Elements/InputField';
import LoadingScreen from '../components/Base/Loading/Screen';
import DMTab from '../components/Home/DMTab';
import Page from '../components/Home/Page';
import Sidebar from '../components/Home/Sidebar';
import DMUser from '../components/Home/User';
import ServerListItem from '../components/Serverlist/LisItem';
import ServerList from '../components/Serverlist/list';
import Api from '../utilities/api/api';
import apiConfig from '../utilities/config/apiConfig';
import defaultUser from '../utilities/config/defaultUser';
import Logger from '../utilities/logs/logger';
import mergeObjects from '../utilities/objectMerger';
import VenturePack from '../utilities/pack/venturePack';
import DiscoSocket from '../utilities/pack/ws';
import User from '../utilities/types/User';

function NextPage() {
    return <></>;
}

interface pageState {
    user: User;
    token: string;
    venturePack: VenturePack;
    websocket: DiscoSocket;
}

NextPage.getLayout = function getLayout() {
    const router = useRouter();
    const [page, setPageState] = useState<pageState>({
        user: defaultUser,
        token: null,
        venturePack: null,
        websocket: null,
    });

    const [txt, setTxt] = useState<string>('real');

    useAsyncEffect(async () => {
        const token = window.localStorage.getItem('token');

        if (!token) {
            router.push('/');
            return;
        }

        const _vp = new VenturePack(window);
        const api = new Api(apiConfig, token);

        const _t = Date.now();

        const user = await fetchData(api, _vp);

        Logger.log('Auth', 'User profile fetched, it took:', Date.now() - _t, 'ms');

        const ws = new DiscoSocket(_vp, token);

        setPageState({
            user,
            token,
            venturePack: _vp,
            websocket: ws,
        });
    }, []);

    const fetchData = async (api, venturePack) => {
        if (page.user.id !== '-1') return;
        if (!api.token) return;

        if (venturePack.searchPack('currentUser')) return venturePack.searchPack('currentUser')[3];

        const res = await api.get(`/users/${atob(localStorage.getItem('token').split('.')[0])}/profile`);

        const response = res.data;

        const usrdata = mergeObjects(response?.user, response?.user_profile, {
            premium_since: response?.premium_since,
            premium: response?.premium,
            premium_type: response?.premium_type,
        });

        venturePack.createPackItem('currentUser', usrdata);

        return usrdata;
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
                            username: page.user.global_name,
                            avatarUrl: page.user.avatar
                                ? `https://cdn.discordapp.com/avatars/${page.user.id}/${page.user.avatar}.png`
                                : '/images/logo.png',
                            status: 'really, its unreal real',
                        }}
                        tabs={
                            <>
                                <DMTab name="Home" icon="home" href="/home" />
                                <DMTab name="Friends" icon="groups" notificationCount={6} href="/app" />
                                <DMTab name="Marketplace" icon="store" />
                                <DMTab name="Discover" icon="explore" />
                                <DMTab name="Design items" icon="code" isSelected />
                            </>
                        }
                        pinnedDMs={[
                            <DMUser
                                key={0}
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
                                key={1}
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
                        name="Design items"
                        icon="code"
                        tabs={[<span key={0}>This page is to test new design items.</span>]}
                    >
                        <Button color="primary">Primary</Button>
                        <Button color="success">Success</Button>
                        <Button color="danger">Danger</Button>
                        <InputField type="text" placeholder="Text input" />
                        <InputField placeholder="Text input" isTextArea onChange={(e) => setTxt(e.target.value)} />
                        <span>{txt}</span>
                    </Page>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NextPage;
