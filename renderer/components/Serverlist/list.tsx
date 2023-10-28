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

// eslint-disable-next-line no-undef
export default function List({ isHomeSelected, children }: { isHomeSelected?: boolean; children: JSX.Element[] }) {
    return (
        <div className="App__ServerList">
            <div className={`ServerList__Home${isHomeSelected ? ' Home__Selected' : ''}`}>
                <div
                    className={isHomeSelected ? 'Home__UnreadIndicator UnreadIndicator__SelectedItem' : 'absolute'}
                ></div>
                <Image src="/images/VentureIcon.svg" alt="Venture Logo" />
            </div>
            <div className="ServerList__Separator"></div>
            {children}
            <div className="ServerList__Separator"></div>
            <div className="ServerList__ExtraItem">
                <Icon name="add" filled size={28} weight={300} />
            </div>
        </div>
    );
}
