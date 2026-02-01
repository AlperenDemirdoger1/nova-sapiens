import { motion } from 'framer-motion'

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial="hidden"
            animate="visible"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>
            </defs>

            {/* Outer Nova Rays */}
            <motion.path
                d="M50 5L55 40L90 35L60 50L95 65L60 65L75 95L50 75L25 95L40 65L5 65L40 50L10 35L45 40L50 5Z"
                stroke="url(#logo-gradient)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="rgba(52, 211, 153, 0.05)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Inner Sapiens Core */}
            <motion.circle
                cx="50"
                cy="50"
                r="12"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            />

            <motion.path
                d="M50 38C50 38 58 42 58 50C58 58 50 62 50 62C50 62 42 58 42 50C42 42 50 38 50 38Z"
                fill="url(#logo-gradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Neural Connections */}
            {[15, 35, 65, 85].map((pos, i) => (
                <motion.line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={i % 2 === 0 ? 50 : (i < 2 ? 85 : 15)}
                    y2={i % 2 === 0 ? (i < 2 ? 15 : 85) : (pos)}
                    stroke="url(#logo-gradient)"
                    strokeWidth="0.5"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5 + i * 0.1, duration: 1 }}
                />
            ))}
        </motion.svg>
    )
}
