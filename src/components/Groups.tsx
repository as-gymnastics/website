import React from 'react'
import type { Group } from '@/payload-types'

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

export const Groups: React.FC<GroupsProps> = ({ groups, onRegisterClick }) => {
  if (!groups || groups.length === 0) {
    return null
  }

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

        {/* Grid layout - 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => onRegisterClick(group.id)}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-gym-blue hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Header */}
              <div className="mb-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{group.name}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{group.ageRange}</span>
                </p>
              </div>

              {/* Schedule Info */}
              {group.scheduleDays &&
                group.scheduleDays.length > 0 &&
                group.startTime &&
                group.endTime && (
                  <div className="text-xs md:text-sm text-gray-500 space-y-1 mb-4 flex-1">
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
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                {group.price && (
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-gray-700">
                      {group.price} Lei
                    </div>
                    <div className="text-xs text-gray-500">/lună</div>
                  </div>
                )}

                {/* Arrow */}
                <div className="text-gray-400 group-hover:text-gym-blue group-hover:translate-x-1 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
