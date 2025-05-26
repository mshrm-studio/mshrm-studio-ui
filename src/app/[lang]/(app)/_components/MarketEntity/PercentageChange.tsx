import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

export default function PercentageChange({
    percentageChange,
}: {
    percentageChange: number
}) {
    return (
        <div
            className={clsx(
                'flex items-center space-x-1',
                percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
            )}
        >
            {percentageChange >= 0 ? (
                <ArrowUpIcon className="w-4 h-4" />
            ) : (
                <ArrowDownIcon className="w-4 h-4" />
            )}

            <span className="font-extrabold">
                {percentageChange.toFixed(1)}%
            </span>
        </div>
    )
}
