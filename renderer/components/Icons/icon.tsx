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

export default function icon({
    name,
    filled,
    weight,
    size,
    className,
}: {
    name: string;
    filled?: boolean;
    weight?: number;
    size?: number;
    className?: string;
}) {
    return (
        // @ts-ignore
        <icon
            style={{
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight ?? '500'}, 'GRAD' 0, 'opsz' ${
                    size ?? '24'
                }`,
                fontSize: size ?? '24',
            }}
            className={className ?? ''}
        >
            {name} {/* @ts-ignore */}
        </icon>
    );
}
