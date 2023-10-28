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

import axios from 'axios';

import mergeObjects from '../objectMerger';
import ApiConfig from '../types/ApiConfig';
import User from '../types/User';

export default async function fetchUserNext(apiConfig: ApiConfig, token: string, setUser: Function, defaultUser: User, async?: boolean) {
    let req;
    try {
        req = axios.get(`${apiConfig.baseUrl}v${apiConfig.version}/users/${atob(token.split('.')[0])}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            validateStatus: () => true
        });
    } catch (err) {
        setUser(defaultUser);
    }


    if (async) {
        const response = (await req).data;

        const user = mergeObjects(defaultUser, response.data?.user, response.data?.user_profile, {
            premium_since: response.data?.premium_since,
            premium: response.data?.premium,
            premium_type: response.data?.premium_type
        }) ?? defaultUser;

        setUser(user);
    }

    if (!async) req.then(response => {
        const user = mergeObjects(defaultUser, response.data?.user, response.data?.user_profile, {
            premium_since: response.data?.premium_since,
            premium: response.data?.premium,
            premium_type: response.data?.premium_type
        }) ?? defaultUser;

        setUser(user);
    }).catch(() => setUser(defaultUser));
}
