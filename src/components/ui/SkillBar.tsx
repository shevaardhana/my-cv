import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
  triggered: boolean;
}

/**
 * Progress bar animasi dari 0% ke target saat dipicu.
 * Tooltip on hover dengan nama dan persentase.
 * Requirements: 4.3, 4.4, 4.5
 */
function SkillBar({ name, percentage, triggered }: SkillBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-full">
      {/* Label */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>

      {/* Track */}
      <div
        className="relative h-2 w-full rounded-full bg-gray-200 overflow-visible"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="progressbar"
        aria-valuenow={triggered ? percentage : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} skill level`}
      >
        {/* Fill */}
        <motion.div
          className="h-full rounded-full bg-orange-400"
          initial={{ width: '0%' }}
          animate={{ width: triggered ? `${percentage}%` : '0%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Tooltip */}
        {showTooltip && (
          <div
            className="absolute -top-9 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg pointer-events-none"
            role="tooltip"
          >
            {name}: {percentage}%
            {/* Arrow */}
            <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillBar;
