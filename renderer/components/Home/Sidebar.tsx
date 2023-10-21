import Icon from "../Icons/icon";
import DMTab from "./DMTab";
import DMHeading from "./Heading";

export default function Sidebar({ children, pinnedDMs, tabs, user }: { children: JSX.Element[], pinnedDMs: JSX.Element[], tabs: JSX.Element, user: {
    username: string,
    avatarUrl: string
    status?: string,
} }) {
    return (
        <div className="App__DM_Sidebar">
            <div className="DM_Sidebar__Header">
                <div className="Header__TextInput">Search for everything.</div>
            </div>
            <div className="DM_Sidebar__Separator">
                <div className="Separator__Border"></div>
                <div className="Separator__Dropshadow"></div>
            </div>
            <div className="DM_Sidebar__Scrollable">
                <div className="DM_Sidebar__DMTabs">
                    {tabs}
                </div>
                <div className="DM_Sidebar__DMUsers">
                    <DMHeading name="Pinned DMs" icon="add" />
                    {pinnedDMs}
                    <DMHeading name="Direct messages" icon="add" />
                    <DMTab name='Message requests' icon='contact_support' />
                    {children}
                </div>
            </div>
            <div className="DM_Sidebar__ProfilePanel">
                <div className="ProfilePanel__UserSection">
                    <img src={user.avatarUrl} alt="Profile Picture" className="UserSection__Avatar" />
                    <div className="UserSection__USI_Info">
                        <span className="USI_Info__Username">{user.username}</span>
                        {user.status ? <span className="USI_Info__Status">{user.status}</span> : null}
                    </div>
                </div>
                <div className="ProfilePanel__UActionButtons">
                    <div className="UActionButtons__UAIconButton">
                        <Icon name="mic" filled size={20} />
                    </div>
                    <div className="UActionButtons__UAIconButton">
                        <Icon name="headphones" filled size={20} />
                    </div>
                    <div className="UActionButtons__UAIconButton">
                        <Icon name="settings" filled size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}