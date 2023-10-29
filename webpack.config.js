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

'use strict'; var e = require('webpack'), n = require('webpack-merge'), o = require('terser-webpack-plugin'), r = require('fs'), s = require('path'), i = require('tsconfig-paths-webpack-plugin'); const t = () => { const e = s.join(process.cwd(), 'nextron.config.js'); return r.existsSync(e) ? require(e) : {}; }, c = process.cwd(), a = process.cwd(), l = r.existsSync(s.join(a, 'tsconfig.json')), u = l ? '.ts' : '.js', p = require(s.join(a, 'package.json')).dependencies, { mainSrcDir: d } = t(), j = s.join(a, d || 'main', `background${u}`), b = s.join(a, d || 'main', `preload${u}`), m = { background: j }; r.existsSync(b) && (m.preload = b); const g = { target: 'electron-main', entry: m, output: { filename: '[name].js', path: s.join(a, 'app'), library: { type: 'umd' } }, externals: [...Object.keys(p || {})], module: { rules: [{ test: /\.(js|ts)x?$/, use: { loader: require.resolve('babel-loader'), options: { cacheDirectory: !0, extends: r.existsSync(s.join(c, '.babelrc')) ? s.join(c, '.babelrc') : r.existsSync(s.join(c, '.babelrc.js')) ? s.join(c, '.babelrc.js') : r.existsSync(s.join(c, 'babel.config.js')) ? s.join(c, 'babel.config.js') : s.join(__dirname, './babel.js') } }, exclude: [/node_modules/, s.join(a, 'renderer')] }] }, resolve: { extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], modules: ['node_modules'], plugins: [l ? new i : null].filter(Boolean) }, stats: 'errors-only', node: { __dirname: !1, __filename: !1 } }, { webpack: x } = t(); let y = n.merge(g, { mode: 'production', optimization: { minimizer: [new o({ parallel: !0 })] }, plugins: [new e.EnvironmentPlugin({ NODE_ENV: 'production', DEBUG_PROD: !1, START_MINIMIZED: !1 }), new e.DefinePlugin({ 'process.type': '"browser"' })], devtool: 'source-map' }); typeof x === 'function' && (y = x(y, 'development')); e(y).run(((e, n) => { e && console.error(e.stack || e), n && console.log(n.toString()); }));
