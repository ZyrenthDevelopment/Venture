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

import clsx from 'clsx';
import type { JSX } from 'react';

export default function Button({
    children,
    type = 'primary',
    className,
    onClick,
}: {
    children: JSX.Element[] | JSX.Element | string;
    type?: 'primary' | 'success' | 'danger';
    className?: string;
    onClick?: () => void;
}) {
    return (
        <button
            className={clsx(
                'Base__Button',
                type === 'primary' && 'Button__primary',
                type === 'success' && 'Button__success',
                type === 'danger' && 'Button__danger',
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
