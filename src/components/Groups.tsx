import React from 'react'
import type { Group } from '@/payload-types'
import { Button } from './ui/button'

interface GroupsProps {
  groups: Group[]
  onRegisterClick: () => void
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

        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-12">
          {groups.map((group, index) => (
            <div
              key={group.id}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-4 md:p-6 hover:border-gym-blue hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3 md:gap-6 flex-1">
                  {/* Icon/Number */}
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gym-blue/10 flex items-center justify-center text-gym-blue font-bold text-base md:text-lg group-hover:bg-gym-blue group-hover:text-white transition-colors">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {group.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-2">
                      Vârsta: <span className="font-semibold text-gray-900">{group.ageRange}</span>
                    </p>
                    {group.schedule && (
                      <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line">
                        {group.schedule}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price and Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  {group.price && (
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-gray-700">
                        {group.price} Lei
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">/lună</div>
                    </div>
                  )}

                  {/* Arrow */}
                  <div className="text-gray-400 group-hover:text-gym-blue group-hover:translate-x-1 transition-all">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={onRegisterClick}
            size="lg"
            className="bg-blue-700 hover:bg-blue-700 text-white px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            📅 Programează Ședința
          </Button>
        </div>
      </div>
    </section>
  )
}
