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
import DMTab from './DMTab';
import DMHeading from './Heading';

export default function Sidebar({
    children,
    pinnedDMs,
    tabs,
    user,
}: {
    // eslint-disable-next-line no-undef
    children: JSX.Element[]; // eslint-disable-next-line no-undef
    pinnedDMs: JSX.Element[]; // eslint-disable-next-line no-undef
    tabs: JSX.Element;
    user: {
        username: string;
        avatarUrl: string;
        status?: string;
    };
}) {
    return (
        <div className="App__DM_Sidebar">
            <div className="DM_Sidebar__Header">
                <div className="Header__TextInput">Search for everything.</div>
            </div>
            <div className="DM_Sidebar__Separator">
                <div className="Separator__Border"></div>
                <div className="Separator__Dropshadow"></div>
            </div>
            <div className="DM_Sidebar__Scrollable">
                <div className="DM_Sidebar__DMTabs">{tabs}</div>
                <div className="DM_Sidebar__DMUsers">
                    <DMHeading name="Pinned DMs" icon="add" />
                    {pinnedDMs}
                    <DMHeading name="Direct messages" icon="add" />
                    <DMTab name="Message requests" icon="contact_support" />
                    {children}
                </div>
            </div>
            <div className="DM_Sidebar__ProfilePanel">
                <div className="ProfilePanel__UserSection">
                    <Image
                        src={user.avatarUrl}
                        alt="Profile Picture"
                        className="UserSection__Avatar"
                        width={32}
                        height={32}
                    />
                    <div className="UserSection__USI_Info">
                        <span className="USI_Info__Username">{user.username}</span>
                        {user.status ? <span className="USI_Info__Status">{user.status}</span> : null}
                    </div>
                </div>
                <div className="ProfilePanel__UActionButtons">
                    <div className="UActionButtons__UAIconButton">
                        <Icon name="mic" filled size={20} />
                    </div>
                    <div className="UActionButtons__UAIconButton">
                        <Icon name="headphones" filled size={20} />
                    </div>
                    <div className="UActionButtons__UAIconButton">
                        <Icon name="settings" filled size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}
