export default class DiscoSocket {
  constructor() {
    ({
      op: 2,
      d: {
        token: '',
        capabilities: 16381,
        properties: {
          os: 'Windows',
          browser: 'Firefox',
          device: '',
          system_locale: 'en-US',
          browser_user_agent: 'USERAGENT',
          browser_version: '119.0',
          os_version: '10',
          referrer: '',
          referring_domain: '',
          referrer_current: '',
          referring_domain_current: '',
          release_channel: 'canary',
          client_build_number: 235849,
          client_event_source: null
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
      }
    })
  }
}