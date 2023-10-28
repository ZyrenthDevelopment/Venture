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

export enum Opcode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    VOICE_SERVER_PING = 5,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
    GUILD_SYNC = 12,
    CALL_CONNECT = 13,
    GUILD_SUBSCRIPTIONS = 14,
    LOBBY_CONNECT = 15,
    LOBBY_DISCONNECT = 16,
    LOBBY_VOICE_STATES = 17,
    STREAM_CREATE = 18,
    STREAM_DELETE = 19,
    STREAM_WATCH = 20,
    STREAM_PING = 21,
    STREAM_SET_PAUSED = 22,
    REQUEST_GUILD_APPLICATION_COMMANDS = 24,
    EMBEDDED_ACTIVITY_CREATE = 25,
    EMBEDDED_ACTIVITY_DELETE = 26,
    EMBEDDED_ACTIVITY_UPDATE = 27,
    REQUEST_FORUM_UNREADS = 28,
    REMOTE_COMMAND = 29,
    REQUEST_DELETED_ENTITY_IDS = 30,
    REQUEST_SOUNDBOARD_SOUNDS = 31,
    SPEED_TEST_CREATE = 32,
    SPEED_TEST_DELETE = 33,
    REQUEST_LAST_MESSAGES = 34,
    SEARCH_RECENT_MEMBERS = 35
}
