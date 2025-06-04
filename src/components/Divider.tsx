import React from 'react'

interface DividerProps {
    /**
     * Additional Tailwind CSS classes to customize the divider.
     */
    className?: string
    /**
     * Inline styles to override default styling.
     */
    style?: React.CSSProperties
}

/**
 * Renders a vertical divider with default height, width, and color.
 * @param className - extra CSS classes for customization
 * @param style - inline style overrides
 */
const Divider: React.FC<DividerProps> = ({ className = '', style }) => (
    <div
        className={`inline-block h-[30px] w-1 self-stretch bg-black dark:bg-white/10 ${className}`}
        style={style}
    />
)

export default Divider
