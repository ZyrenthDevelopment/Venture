import Icon from "../../Icons/icon";
import Tab from "./Tab";

export default function Sidebar({ children, tabs, user }: { children: JSX.Element[], tabs: JSX.Element, user: {
    username: string,
    avatarUrl: string
    status?: string,
} }) {
    return (
        <div className="sidebar">
            <div className="dm-list">
                <div className="content">
                    <div className="tabs">
                        {tabs}
                    </div>
                    <div className="dms">
                        <div className="heading">
                            <span>Direct messages</span>
                            <Icon name='add' filled size={20} />
                        </div>
                        <div className="message-requests">
                            <Tab name='Message requests' icon='contact_support' />
                        </div>
                        <div className="users">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile">
                <div className="user">
                    <img src={user.avatarUrl} alt="Profile Picture" />
                    <div className="info">
                        <span className="username">{user.username}</span>
                        {user.status ? <span className="status">{user.status}</span> : null}
                    </div>
                </div>
                <div className="buttons">
                    <a href="#" className='button'>
                        <Icon name='mic' filled size={22} weight={300} />
                    </a>
                    <a href="#" className='button'>
                        <Icon name='headphones' filled size={22} weight={300} />
                    </a>
                    <a href="#" className='button'>
                        <Icon name='settings' filled size={22} weight={300} />
                    </a>
                </div>
            </div>
        </div>
    );
}