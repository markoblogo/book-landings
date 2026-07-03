
import styles from './GiftBadge.module.css';

interface GiftBadgeProps {
    label: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function GiftBadge({ label, className = '', style }: GiftBadgeProps) {
    // Determine if it's French or Ukrainian specific styling needs (optional, but good for "stamp" variants)
    // For now standard stamp.
    return (
        <div className={`${styles.badge} ux-hover-sticker ${className}`} data-gift-badge style={style}>
            <div className={styles.innerRing} data-gift-badge-ring>
                <span className={styles.text} data-gift-badge-text>{label}</span>
            </div>
        </div>
    );
}
