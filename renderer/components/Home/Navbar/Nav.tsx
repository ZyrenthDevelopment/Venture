import Icon from "../../Icons/icon";

export default function Nav({ name, icon, children }: { name: string, icon: string, children: JSX.Element[] }) {
    return (
        <div className="navbar">
            <div className="sidebar">
                <div className="content">
                    <span>Search for users, servers, DMs...</span>
                </div>
                <div className="shadow">
                    <div className="separator"></div>
                    <div className="dropshadow"></div>
                </div>
            </div>
            <div className="body">
                <div className="content">
                    <div className="nav-left">
                        <div className="heading">
                            <Icon name={icon} filled />
                            <span>{name}</span>
                        </div>
                        <div className="separator"></div>
                        <div className="tabs">
                            {children}
                        </div>
                    </div>
                    <div className="nav-right">
                        <div className="new-dm">
                            <Icon name='maps_ugc' filled />
                        </div>
                        <div className="separator"></div>
                        <div className="icons">
                            <Icon name='inbox' filled />
                            <Icon name='code' filled />
                        </div>
                    </div>
                </div>
                <div className="shadow">
                    <div className="separator"></div>
                    <div className="dropshadow"></div>
                </div>
            </div>
        </div>
    );
}