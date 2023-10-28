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

type User = {
    global_name?: string;
    username?: string;
    discriminator?: string;
    accent_color?: string;
    avatar?: string;
    avatar_decoration_data?: any;
    banner?: string;
    banner_color?: string;
    bio?: string;
    flags?: number;
    id?: string;
    premium?: boolean | undefined;
    premium_since?: string;
    premium_type?: number;
    pronouns?: string;
    public_flags?: number;
};

export default User;
