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

import { deflate, inflate } from 'zlib';

export default class ZLib {
    static compress(data: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            deflate(data, (error, compressedData) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(compressedData);
                }
            });
        });
    }

    static decompres(data: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            inflate(data, (error, decompressedData) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decompressedData);
                }
            });
        });
    }
}
