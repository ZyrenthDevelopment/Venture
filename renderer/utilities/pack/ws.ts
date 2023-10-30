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

import EventEmitter from 'events';

import apiConfig from '../config/apiConfig';
import Logger from '../logger/logger';
import fxWebsocket from './fxWs';
import VenturePack from './venturePack';
import { Opcode } from './ws/OpCodes';

export default class DiscoSocket {
    ws: fxWebsocket;
    seq: number = null;

    constructor(venturePack: VenturePack, token: string) {
        if (!venturePack.searchPack('_dispatch')) venturePack.createPackItem('_dispatch', new EventEmitter());

        if (venturePack.searchPack('_ws')) this.ws = venturePack.searchPack('_ws')[3][0];
        else {
            let _t = Date.now();
            Logger.log('Gateway', `Connecting to ${apiConfig.gatewayUrl}?v=${apiConfig.version}&encoding=json`);

            this.ws = new fxWebsocket(apiConfig.gatewayUrl + '?v=' + apiConfig.version + '&encoding=json');
            venturePack.createPackItem('_ws', [this.ws, this.seq]);

            this.ws.onopen(() => {
                Logger.log('Gateway', 'Connected, took:', Date.now() - _t, 'ms');
            });

            this.ws.onclose((e) => {
                Logger.log('Gateway', 'Disconnected, reconnecting...');
                Logger.log('Debug', 'Gateway close event:', e);

                setInterval(() => _t = Date.now(), 5000);
            });

            venturePack.searchPack('_dispatch')[3].on('READY', () => {
                Logger.log('Gateway', 'Identifying succeeded, took:', Date.now() - _t, 'ms');
            });

            this.ws.onmessage((event: MessageEvent) => {
                const data = JSON.parse(event.data);

                if (data.s) this.seq = data.s;

                switch (data.op) {
                    case Opcode.HELLO:
                        if (venturePack.searchPack('_ws__HeartbeatInterval')) clearInterval(venturePack.searchPack('_ws__HeartbeatInterval')[3]);

                        venturePack.createPackItem('_ws__HeartbeatInterval', setInterval(() => {
                            this.send(Opcode.HEARTBEAT, this.seq);
                        }, data.d.heartbeat_interval ?? 41_250));

                        this.send(Opcode.IDENTIFY, {
                            token,
                            capabilities: 16381,
                            properties: {
                                os: 'Windows',
                                browser: 'Discord Client',
                                device: 'Discord Client',
                                system_locale: 'en-US',
                                os_version: '10',
                                release_channel: 'canary'
                            },
                            presence: { status: 'unknown', since: 0, activities: [], afk: false },
                            compress: false,
                            client_state: {
                                guild_versions: {},
                                highest_last_message_id: '0',
                                read_state_version: 0,
                                user_guild_settings_version: -1,
                                user_settings_version: -1,
                                private_channels_version: '0',
                                api_code_version: 0
                            }
                        });
                        break;
                    case Opcode.HEARTBEAT_ACK:
                        Logger.log('Debug', 'Gateway heartbeat acknowledged.');
                        break;
                    case Opcode.DISPATCH:
                        if (data.t) venturePack.searchPack('_dispatch')[3].emit(data.t, data.d);
                        venturePack.searchPack('_dispatch')[3].emit('_', {
                            event: data.t,
                            payload: data.d
                        });

                        break;
                }
            });
        }
    }

    send(Opcode: Opcode, data: any) {
        if (this.ws.readyState !== WebSocket.OPEN) return;

        const payload = {
            op: Opcode,
            d: data
        };

        this.ws.send(JSON.stringify(payload));
    }
}
