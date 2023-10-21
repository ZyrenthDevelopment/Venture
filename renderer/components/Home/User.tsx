import Icon from "../Icons/icon";

export default function DMUser({ user, status, rpc, isSelected }: { user: {
    username: string,
    avatarUrl: string
}, status?: string, rpc?: {
    type: 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING' | 'COMPETING',
    name: string
}, isSelected?: boolean }) {
    return (
        <div className={`DMUsers__DMUser${isSelected ? ' DMUser__Selected' : ''}`}>
            <img src={user.avatarUrl} alt="Profile Picture" className="DMUser__Avatar" />
            <div className="DMUser__DMUserInfo">
                <span className="DMUserInfo__Username">{user.username}</span>
                {status ? <span className="DMUserInfo__DMUI_Status">{status}</span> : null}
                {rpc ? <div className="DMUserInfo__DMUI_RPC">
                    <span className="DMUI_RPC__Type">{statuses[rpc.type]}</span>
                    <span className="DMUI_RPC__Name">{rpc.name}</span>
                    <Icon name={icons[rpc.type] ?? 'reorder'} filled size={13} className="DMUI_RPC__Icon" />
                </div> : null}
            </div>
        </div>
    );
}

const icons = {
    'PLAYING': 'stadia_controller',
    'LISTENING': 'brand_awareness',
    'WATCHING': 'smart_display',
    'STREAMING': 'cast',
    'COMPETING': 'swords'
}

const statuses = {
    'PLAYING': 'Playing',
    'LISTENING': 'Listening to',
    'WATCHING': 'Watching',
    'STREAMING': 'Streaming',
    'COMPETING': 'Competing in'
}