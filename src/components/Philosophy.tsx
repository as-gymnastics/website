import { Quote } from 'lucide-react'
import React from 'react'

interface PhilosophyProps {
  philosophyData?: {
    content?: string | null
    quote?: string | null
    showPhilosophy?: boolean | null
  } | null
}

export const Philosophy: React.FC<PhilosophyProps> = ({ philosophyData }) => {
  // If explicitly hidden in CMS, don't render
  if (philosophyData?.showPhilosophy === false) {
    return null
  }

  const content =
    philosophyData?.content ||
    'Antrenamentele noastre sunt concepute pentru a aduce un plus de valoare fiecărui copil.\n\nForța fizică, coordonarea și flexibilitatea se dezvoltă vizibil încă de la primele antrenamente, iar ulterior echilibrul și îndemânarea completează ceea ce noi numim un corp elegant.'

  const quote = philosophyData?.quote || 'Nu ai cum sa reușești daca nu încerci'

  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Title */}
          <div className="mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Filozofia Noastră</h2>
          </div>

          {/* Main Philosophy Content */}
          <div className="mb-16 md:mb-20 relative">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>

          {/* Motto Section */}
          <div className="relative py-8">
            {/* Decorative divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />

            <div className="relative inline-block">
              <Quote className="absolute -top-6 -left-6 w-8 h-8 text-blue-100 rotate-180 fill-current" />
              <h3 className="text-2xl md:text-4xl font-serif italic text-gray-800 px-6 leading-tight">
                &ldquo;{quote}&rdquo;
              </h3>
              <Quote className="absolute -bottom-6 -right-6 w-8 h-8 text-blue-100 fill-current" />
            </div>

            {/* Decorative divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}
