export default function ServerListItem({ iconUrl, hasNewMessages, isSelected }: { iconUrl: string, hasNewMessages: boolean, isSelected: boolean }) {
    return (
        <>
            <div className={`server-item${isSelected ? ' selected' : ''}`}>
                <img className='server-icon' src={iconUrl} alt='Icon' onError={(e) => e.target['style'].display = 'none'} width={'48px'} height={'48px'} />
                <div className={`absolute ${isSelected ? `indicator full` : (hasNewMessages ? `indicator` : ``)}`}></div>
            </div>
        </>
    );
}