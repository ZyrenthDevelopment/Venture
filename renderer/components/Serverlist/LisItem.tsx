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

/* eslint-disable indent */

import Image from 'next/image';

export default function ListItem({
    iconUrl,
    hasNewMessages,
    isSelected,
}: {
    iconUrl: string;
    hasNewMessages: boolean;
    isSelected: boolean;
}) {
    return (
        <>
            <div className={`ServerList__Item${isSelected ? ' Item__Selected' : ''}`}>
                <Image className="Item__Icon" src={iconUrl} alt="Icon" width={48} height={48} />
                <div
                    className={
                        isSelected
                            ? 'Item__UnreadIdicator UnreadIdicator__SelectedItem'
                            : hasNewMessages
                            ? 'Item__UnreadIdicator'
                            : 'absolute'
                    }
                ></div>
            </div>
        </>
    );
}
