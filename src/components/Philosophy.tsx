import React from 'react'

const philosophyItems = [
  {
    icon: '🏃',
    title: 'Introducție în Exercițiu',
    description:
      'Să învețe să se miște corect și să descopere bucuria exercițiului fizic de la o vârstă fragedă.',
    color: 'blue-600',
  },
  {
    icon: '⚡',
    title: 'Vigoare și Energie',
    description:
      'Dezvoltă rezistența și energia necesare pentru a excela în orice activitate sportivă.',
    color: 'amber-400',
  },
  {
    icon: '🎯',
    title: 'Disciplină Sportivă',
    description: 'Construiește caracter prin disciplină, dedicare și munca în echipă.',
    color: 'emerald-500',
  },
]

export const Philosophy: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Filozofia Noastră
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            La AS Gymnastics, credem că gimnastica este mai mult decât un sport - este o fundație
            pentru viață
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {philosophyItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-${item.color}/10 text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Decorative gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
