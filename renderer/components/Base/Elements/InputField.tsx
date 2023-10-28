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

export default function InputField({
    placeholder,
    value,
    type,
    className,
    onChange,
}: {
    placeholder?: string;
    value?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'datetime-local' | 'search' | 'url';
    className?: string;
    onChange?: () => void;
}) {
    return (
        <input
            type={type ?? 'text'}
            placeholder={placeholder}
            value={value}
            className={clsx('Base__InputField', className)}
            onChange={onChange}
        />
    );
}
