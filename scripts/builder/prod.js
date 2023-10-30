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

const _start = Date.now();
const _prefix = '\x1b[44m  Venture  \x1b[0m \x1b[42m Runner \x1b[0m';

const fs = require('fs');
const ms = require('ms');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveDir = relativePath => path.resolve(appDirectory, relativePath);

const appSrc = resolveDir('app');
const appRenderer = resolveDir('renderer');
const appDist = resolveDir('dist');
const appOut = resolveDir('out');
const appNextConfig = resolveDir('renderer/next.config.js');

process.env.NODE_ENV = 'production';
process.env.ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES = 'true';

const startBuilder = (execa) => execa('npx', ['electron-builder', '--config', 'electron-builder.json'], { cwd: process.cwd(), stdio: 'inherit' });
const startNext = (execa) => execa('npx', ['next', 'build', appRenderer], { cwd: process.cwd(), stdio: 'inherit' });
const startCompiler = (execa) => execa('node', ['webpack.config.js'], { cwd: process.cwd(), stdio: 'inherit' });

(async () => {
    const { execa } = await import('execa');
    process.stdin.resume();

    /** @type {import('execa').ExecaChildProcess} **/
    let compiler;
    /** @type {import('execa').ExecaChildProcess} **/
    let next;
    /** @type {import('execa').ExecaChildProcess} **/
    let builder;

    const killProcesses = async () => {
        console.log(_prefix, 'Killing processes...');
        if (compiler) compiler.kill();
        if (builder) builder.kill();
        if (next) next.kill();
        process.exit(0);
    };

    process.on('SIGINT', killProcesses);
    process.on('SIGTERM', killProcesses);
    process.on('exit', killProcesses);

    if (fs.existsSync(appSrc)) fs.rmSync(appSrc, { recursive: true });
    if (fs.existsSync(appDist)) fs.rmSync(appDist, { recursive: true });
    if (fs.existsSync(appOut)) fs.rmSync(appOut, { recursive: true });

    if (fs.existsSync(appNextConfig)) fs.rmSync(appNextConfig);
    fs.copyFileSync(path.join(appRenderer, 'next.build.config.js'), appNextConfig);

    console.log(_prefix, 'Building nextjs...');
    next = startNext(execa);

    await next;

    console.log(_prefix, 'Building electron scripts...');
    compiler = startCompiler(execa);

    await compiler;

    console.log(_prefix, 'Packaging Venture...');
    builder = startBuilder(execa);

    await builder;

    fs.mkdirSync(appOut);
    const exes = fs.readdirSync(appDist).filter(file => file.endsWith('.exe'));
    for (const exe of exes) {
        fs.copyFileSync(path.join(appDist, exe), path.join(appOut, exe));
    }

    fs.rmdirSync(appDist, { recursive: true });

    console.log(_prefix, 'Venture has been built successfully, took:', ms(Date.now() - _start) + '.');
    console.log(_prefix, `Check the ${path.basename(appOut)} folder for the built executables.`);
    process.exit(0);
})().catch(err => {
    console.error(_prefix, 'The builder threw an unexpected error and the runner has quit, error details:', err);
    process.exit(1);
});
