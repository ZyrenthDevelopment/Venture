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
import * as React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        className?: string;
        type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'datetime-local' | 'search' | 'url';
        isTextArea?: boolean;
    };

export default function InputField({ className, type, isTextArea, ...props }: InputFieldProps) {
    return !isTextArea ? (
        <input type={type ?? 'text'} className={clsx('Base__InputField', className)} {...props} />
    ) : (
        <textarea className={clsx('Base__InputField', className)} {...props} />
    );
}
