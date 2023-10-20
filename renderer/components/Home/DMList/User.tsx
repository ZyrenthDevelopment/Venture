import Icon from "../../Icons/icon";

export default function User({ user, status, rpc, isSelected }: { user: {
    username: string,
    avatarUrl: string
}, status?: string, rpc?: {
    type: 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING' | 'COMPETING',
    name: string
}, isSelected?: boolean }) {
    return (
        <div className={`user${isSelected ? ' selected' : ''}`}>
            <img src={user.avatarUrl} alt="Profile Picture" />
            <div className="info">
                <span className="username">{user.username}</span>
                {status ? <span className={`status`}>{status}</span> : null}
                {rpc ? <div className={`rpc`}>
                    <span className="type">{statuses[rpc.type]}</span>
                    <span className="name">{rpc.name}</span>
                    <Icon name={icons[rpc.type] ?? 'reorder'} filled size={13} />
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