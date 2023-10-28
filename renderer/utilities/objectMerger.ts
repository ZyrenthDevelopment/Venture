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

type Mergeable = Record<string, any> | any[];

function isMergeable(obj: any): obj is Mergeable {
    return typeof obj === 'object' && obj !== null;
}

export default function mergeObjects<T extends Mergeable>(target: T, ...sources: Mergeable[]): T {
    if (!sources.length) return target;

    const source = sources.shift();
    if (isMergeable(target) && isMergeable(source)) {
        if (Array.isArray(target) && Array.isArray(source)) {
            target.push(...source);
        } else if (!Array.isArray(target) && !Array.isArray(source)) {
            for (const key in source) {
                if (isMergeable(source[key])) {
                    if (!target[key]) target[key] = Array.isArray(source[key]) ? [] : {};
                    mergeObjects(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }

    return mergeObjects(target, ...sources);
}
