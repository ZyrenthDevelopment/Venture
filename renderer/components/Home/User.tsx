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

import Image from 'next/image';

import Icon from '../Icons/icon';

export default function DMUser({
    user,
    status,
    rpc,
    isSelected,
}: {
    user: {
        username: string;
        avatarUrl: string;
    };
    status?: string;
    rpc?: {
        type: 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING' | 'COMPETING';
        name: string;
    };
    isSelected?: boolean;
}) {
    return (
        <div className={`DMUsers__DMUser${isSelected ? ' DMUser__Selected' : ''}`}>
            <Image src={user.avatarUrl} alt="Profile Picture" className="DMUser__Avatar" />
            <div className="DMUser__DMUserInfo">
                <span className="DMUserInfo__Username">{user.username}</span>
                {status ? <span className="DMUserInfo__DMUI_Status">{status}</span> : null}
                {rpc ? (
                    <div className="DMUserInfo__DMUI_RPC">
                        <span className="DMUI_RPC__Type">{statuses[rpc.type]}</span>
                        <span className="DMUI_RPC__Name">{rpc.name}</span>
                        <Icon name={icons[rpc.type] ?? 'reorder'} filled size={13} className="DMUI_RPC__Icon" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

const icons = {
    PLAYING: 'stadia_controller',
    LISTENING: 'brand_awareness',
    WATCHING: 'smart_display',
    STREAMING: 'cast',
    COMPETING: 'swords',
};

const statuses = {
    PLAYING: 'Playing',
    LISTENING: 'Listening to',
    WATCHING: 'Watching',
    STREAMING: 'Streaming',
    COMPETING: 'Competing in',
};
