export default function ListItem({ iconUrl, hasNewMessages, isSelected }: { iconUrl: string, hasNewMessages: boolean, isSelected: boolean }) {
    return (
        <>
            <div className={`ServerList__Item${isSelected ? ' Item__Selected' : ''}`}>
                <img className='Item__Icon' src={iconUrl} alt='Icon' onError={(e) => e.target['style'].display = 'none'} width={'48px'} height={'48px'} />
                <div className={isSelected ? `Item__UnreadIdicator UnreadIdicator__SelectedItem` : (hasNewMessages ? `Item__UnreadIdicator` : `absolute`)}></div>
            </div>
        </>
    );
}