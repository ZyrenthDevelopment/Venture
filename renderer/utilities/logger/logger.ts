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

const colours = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        gray: '\x1b[90m',
        crimson: '\x1b[38m'
    },
    bg: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',
        gray: '\x1b[100m',
        crimson: '\x1b[48m'
    }
};

const browserColours = {
    reset: 'color: unset',
    bright: 'font-weight: bold',
    dim: 'opacity: 0.5',
    underscore: 'text-decoration: underline',
    blink: 'text-decoration: blink',
    reverse: 'text-decoration: overline',
    hidden: 'visibility: hidden',
    fg: {
        black: 'color: black',
        red: 'color: red',
        green: 'color: #9ACD32',
        yellow: 'color: yellow',
        blue: 'color: blue',
        magenta: 'color: magenta',
        cyan: 'color: cyan',
        white: 'color: white',
        gray: 'color: gray',
        crimson: 'color: crimson'
    },
    bg: {
        black: 'background-color: black; border-radius: 5px;',
        red: 'background-color: red; border-radius: 5px;',
        green: 'background-color: #9ACD32; border-radius: 5px;',
        yellow: 'background-color: yellow; border-radius: 5px;',
        blue: 'background-color: blue; border-radius: 5px;',
        magenta: 'background-color: magenta; border-radius: 5px;',
        cyan: 'background-color: cyan; border-radius: 5px;',
        white: 'background-color: white; border-radius: 5px;',
        gray: 'background-color: gray; border-radius: 5px;',
        crimson: 'background-color: crimson; border-radius: 5px;'
    }
};

export default class Logger {
    static log(name: string, ...args: any[]) {
        if (typeof window !== 'undefined') console.log(`%c  ${name ?? 'Logger'}  %c`, `${browserColours.bg.green}; ${browserColours.fg.black}`, browserColours.fg.white, ...args);
        else console.log(`${colours.bg.green}${colours.fg.black}  ${name ?? 'Logger'}  ${colours.reset}${colours.fg.white}`, ...args);
    }

    static warn(name: string, ...args: any[]) {
        if (typeof window !== 'undefined') console.warn(`%c  ${name ?? 'Logger'}  %c`, `${browserColours.bg.yellow}; ${browserColours.fg.black}`, browserColours.fg.white, ...args);
        else console.warn(`${colours.bg.yellow}${colours.fg.black}  ${name ?? 'Logger'}  ${colours.reset}${colours.fg.white}`, ...args);
    }

    static error(name: string, ...args: any[]) {
        if (typeof window !== 'undefined') console.error(`%c  ${name ?? 'Logger'}  %c`, `${browserColours.bg.crimson}; ${browserColours.fg.black}`, browserColours.fg.white, ...args);
        else console.error(`${colours.bg.crimson}${colours.fg.black}  ${name ?? 'Logger'}  ${colours.reset}${colours.fg.white}`, ...args);
    }
}
