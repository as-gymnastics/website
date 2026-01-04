import React from 'react'

const features = [
  {
    icon: '💪',
    title: 'Forță și Echilibru',
    description: 'Dezvoltă forța musculară și echilibrul necesar pentru performanță',
  },
  {
    icon: '🤸',
    title: 'Flexibilitate',
    description: 'Îmbunătățește flexibilitatea și amplitudinea de mișcare',
  },
  {
    icon: '⚡',
    title: 'Agilitate și Viteză',
    description: 'Antrenează reflexele rapide și coordonarea motorie',
  },
  {
    icon: '🌟',
    title: 'Încredere în Sine',
    description: 'Construiește încrederea prin realizări și progres constant',
  },
]

export const Experience: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Experiență completă pentru toată familia
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Beneficiile gimnasticii depășesc sala de antrenament
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              {/* Icon */}
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">{feature.icon}</div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
