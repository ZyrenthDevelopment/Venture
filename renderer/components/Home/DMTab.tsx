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

import Link from 'next/link';

import Icon from '../Icons/icon';

export default function DMTab({
    name,
    icon,
    notificationCount,
    href = '#',
    isSelected,
}: {
    name: string;
    icon: string;
    notificationCount?: number;
    href?: string;
    isSelected?: boolean;
}) {
    return (
        <Link href={href} className={`DMTabs__Tab${isSelected ? ' Tab__Selected' : ''}`}>
            <Icon name={icon} filled size={24} className="Tab__Icon" />
            <span className="Tab__Text">{name}</span>
            {notificationCount ? (
                <div className="Tab__NotificationCount">{notificationCount > 9 ? '9+' : notificationCount}</div>
            ) : null}
        </Link>
    );
}
