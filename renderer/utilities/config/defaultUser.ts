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

import User from '../types/User';

export default {
    global_name: 'Unknown user',
    username: 'unknown_user',
    discriminator: '0',
    accent_color: null,
    avatar: null,
    avatar_decoration_data: null,
    banner: null,
    banner_color: null,
    bio: null,
    flags: 0,
    id: '-1',
    premium: undefined,
    premium_since: null,
    premium_type: null,
    pronouns: null,
    public_flags: 0
} as User;
