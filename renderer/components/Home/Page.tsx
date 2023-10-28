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

import Icon from '../Icons/icon';

export default function Page({
    name,
    icon,
    tabs,
    children,
}: {
    name: string;
    icon: string; // eslint-disable-next-line no-undef
    tabs?: JSX.Element[]; // eslint-disable-next-line no-undef
    children: React.ReactNode;
}) {
    return (
        <div className="App__Home_Page">
            <div className="Home_Page__Navbar">
                <div className="Navbar__NavTitle">
                    <Icon name={icon} filled size={24} className="NavTitle__Icon" />
                    <div className="NavTitle__Name">
                        <span>{name}</span>
                    </div>
                    {tabs ? (
                        <>
                            <div className="NavTitle__Separator"></div>
                            <div className="NavTitle__NavTabs">{tabs}</div>
                        </>
                    ) : null}
                </div>
                <div className="Navbar__NavButtons">
                    <div className="NavButtons__NavButton">
                        <Icon name="maps_ugc" filled size={24} />
                    </div>
                    <div className="NavButtons__Separator"></div>
                    <div className="NavButtons__NavButton">
                        <Icon name="inbox" filled size={24} />
                    </div>
                    <div className="NavButtons__NavButton">
                        <Icon name="code" filled size={24} />
                    </div>
                </div>
            </div>
            <div className="Home_Page__Separator">
                <div className="Separator__Border"></div>
                <div className="Separator__Dropshadow"></div>
            </div>
            {children}
        </div>
    );
}
