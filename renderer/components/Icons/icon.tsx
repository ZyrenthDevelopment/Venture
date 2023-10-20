export default function icon({ name, filled, weight, size, className }: { name: string, filled?: boolean, weight?: number, size?: number, className?: string }) {
    return ( // @ts-ignore
        <icon style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight ?? '500'}, 'GRAD' 0, 'opsz' ${size ?? '24'}`, fontSize: size ?? '24' }} className={className ?? ``}>{name}</icon>
    )
}