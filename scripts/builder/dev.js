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

const _prefix = '\x1b[44m  Venture  \x1b[0m \x1b[42m Runner \x1b[0m';

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const appDirectory = fs.realpathSync(process.cwd());
const resolveDir = relativePath => path.resolve(appDirectory, relativePath);

const appSrc = resolveDir('app');
const appElectron = resolveDir('main');
const appRenderer = resolveDir('renderer');
const appNextConfig = resolveDir('renderer/next.config.js');

const port = 8888;
process.env.NODE_ENV = 'development';

const startElectron = (execa) => execa('electron', ['.', port], { cwd: process.cwd(), stdio: 'inherit' });
const startNext = (execa) => execa('npx', ['next', 'dev', appRenderer, '-p', port], { cwd: process.cwd(), stdio: 'inherit' });
const startCompiler = (execa) => execa('node', ['webpack.config.js'], { cwd: process.cwd(), stdio: 'inherit' });

(async () => {
    const { execa } = await import('execa');
    process.stdin.resume();

    /** @type {import('execa').ExecaChildProcess} **/
    let compiler;
    /** @type {chokidar.FSWatcher} **/
    let webpackWatcher;
    /** @type {import('execa').ExecaChildProcess} **/
    let electron;
    /** @type {import('execa').ExecaChildProcess} **/
    let next;

    if (fs.existsSync(appSrc)) fs.rmSync(appSrc, { recursive: true });

    console.log(_prefix, 'Building electron scripts...');
    compiler = startCompiler(execa);

    await compiler;

    if (fs.existsSync(appNextConfig)) fs.rmSync(appNextConfig);
    fs.copyFileSync(path.join(appRenderer, 'next.dev.config.js'), appNextConfig);

    console.log(_prefix, 'Running nextjs...');
    next = startNext(execa);

    await new Promise(resolve => {
        const checkNextReady = () => {
            const net = require('net');
            const client = net.connect(port, () => {
                client.end();
                resolve();
            });
            client.on('error', () => setTimeout(checkNextReady, 100));
        };
        checkNextReady();
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(_prefix, 'Running electron...');
    electron = startElectron(execa);

    const killProcesses = async () => {
        console.log(_prefix, 'Killing processes...');
        if (compiler) compiler.kill();
        if (electron) electron.kill();
        if (next) next.kill();
        if (webpackWatcher) webpackWatcher.close(() => { });
        process.exit(0);
    };

    const restartElectron = async () => {
        if (fs.existsSync(appSrc)) fs.rmSync(appSrc, { recursive: true });

        console.log(_prefix, 'Rebuilding electron scripts...');
        compiler = startCompiler(execa);

        await compiler;
    };

    process.on('SIGINT', killProcesses);
    process.on('SIGTERM', killProcesses);
    process.on('exit', killProcesses);

    webpackWatcher = chokidar.watch(appElectron, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 2000,
            pollInterval: 100
        },
        usePolling: true,
        interval: 100
    });

    webpackWatcher.on('add', restartElectron);
    webpackWatcher.on('change', restartElectron);
    webpackWatcher.on('unlink', restartElectron);

})().catch(err => {
    console.error(_prefix, 'The app threw an unexpected error and the runner has quit, error details:', err);
    process.exit(1);
});
