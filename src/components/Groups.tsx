import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import type { Group } from '@/payload-types'

// ... (GroupsProps, helpers, etc.)

interface GroupsProps {
  groups: Group[]
  onRegisterClick: (groupId?: number) => void
}

// Helper function to format day names
const formatDayName = (day: string): string => {
  const dayMap: Record<string, string> = {
    luni: 'Luni',
    marti: 'Marți',
    miercuri: 'Miercuri',
    joi: 'Joi',
    vineri: 'Vineri',
    sambata: 'Sâmbătă',
    duminica: 'Duminică',
  }
  return dayMap[day] || day.charAt(0).toUpperCase() + day.slice(1)
}

const GroupSection = ({
  title,
  groups,
  onRegisterClick,
}: {
  title: string
  groups: Group[]
  onRegisterClick: (id?: number) => void
}) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Check if mobile (md breakpoint is 768px)
    // If screen < 768px, default to collapsed
    if (window.matchMedia('(max-width: 767px)').matches) {
      setIsOpen(false)
    }
  }, [])

  if (groups.length === 0) return null

  return (
    <div className="mb-8 md:mb-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between md:justify-center gap-4 text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-8 border-b border-gray-100 pb-4 group hover:text-blue-600 transition-colors"
      >
        <span>{title}</span>
        {/* Chevron only visible on mobile essentially or just nice to have generally */}
        <span className="md:hidden">
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </span>
      </button>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 max-h-[5000px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="contents">
          {/* Using contents to let grid gap work if not hidden, but opacity/max-h works on the container */}
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} onRegisterClick={onRegisterClick} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const Groups: React.FC<GroupsProps> = ({ groups, onRegisterClick }) => {
  if (!groups || groups.length === 0) {
    return null
  }

  // ... (parsing and bucketing logic remains the same)
  // Helper to parse age range string like "2-3" or "2-3 ani"
  // Returns [min, max]
  const parseAgeRange = (range: string): [number, number] => {
    // Regex matches first two numbers found in string
    const numbers = range.match(/(\d+)/g)
    if (!numbers || numbers.length < 2) return [0, 0]
    return [parseInt(numbers[0]), parseInt(numbers[1])]
  }

  // Sorting helper
  const sortByAge = (a: Group, b: Group) => {
    const [minA] = parseAgeRange(a.ageRange)
    const [minB] = parseAgeRange(b.ageRange)
    return minA - minB
  }

  const section1 = groups
    .filter((g) => {
      const [min] = parseAgeRange(g.ageRange)
      return min < 5
    })
    .sort(sortByAge)

  const bucket2 = groups
    .filter((g) => {
      const [min] = parseAgeRange(g.ageRange)
      return min >= 5 && min < 7
    })
    .sort(sortByAge)

  const bucket3 = groups
    .filter((g) => {
      const [min] = parseAgeRange(g.ageRange)
      return min >= 7
    })
    .sort(sortByAge)

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Alege grupa potrivită pentru copilul tău
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Programe adaptate pentru fiecare vârstă și nivel de experiență
          </p>
        </div>

        <GroupSection title="2 - 4 ani" groups={section1} onRegisterClick={onRegisterClick} />
        <GroupSection title="5 - 7 ani" groups={bucket2} onRegisterClick={onRegisterClick} />
        <GroupSection title="7 - 12 ani" groups={bucket3} onRegisterClick={onRegisterClick} />
      </div>
    </section>
  )
}

const GroupCard = ({
  group,
  onRegisterClick,
}: {
  group: Group
  onRegisterClick: (id?: number) => void
}) => {
  // Specific card styling can go here, cleaner to separate
  return (
    <div
      onClick={() => onRegisterClick(group.id)}
      className="group bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="mb-3 relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{group.name}</h3>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-semibold text-gray-900">{group.ageRange} ani</span>
          {group.gender && (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {group.gender}
            </span>
          )}
        </p>
      </div>

      {/* Schedule Info */}
      {group.scheduleDays && group.scheduleDays.length > 0 && group.startTime && group.endTime && (
        <div className="text-xs md:text-sm text-gray-500 space-y-1 mb-4 flex-1 relative z-10">
          <p className="font-medium">
            {group.scheduleDays.map((day, i) => (
              <span key={i}>
                {formatDayName(day)}
                {i < group.scheduleDays!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
          <p>
            {group.startTime} - {group.endTime}
          </p>
          {group.additionalInfo && (
            <p className="mt-2 italic text-gray-600">{group.additionalInfo}</p>
          )}
        </div>
      )}

      {/* Price and Arrow */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 relative z-10">
        {group.price && (
          <div>
            <div className="text-xl md:text-2xl font-bold text-gray-700">{group.price} Lei</div>
            <div className="text-xs text-gray-500">/lună</div>
          </div>
        )}

        {/* Arrow */}
        <div className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Decorative background element based on gender/age maybe? Keeping it clean for now as per "disregard colors" instruction */}
    </div>
  )
}
