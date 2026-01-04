import React from 'react'
import Image from 'next/image'
import type { Coach } from '@/payload-types'

interface CoachesProps {
  coaches: Coach[]
}

const bgColorClasses = {
  peach: 'bg-orange-200',
  blue: 'bg-blue-600/20',
  green: 'bg-emerald-500/20',
  yellow: 'bg-amber-400/20',
}

// Helper function to extract list items from Lexical rich text
function extractListItemsFromLexical(bio: Coach['bio']): string[] {
  if (!bio || !bio.root || !bio.root.children) return []

  const items: string[] = []

  const extractText = (node: any): string => {
    let text = ''
    if (node.type === 'text') {
      text += node.text || ''
    } else if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => {
        text += extractText(child)
      })
    }
    return text
  }

  const processNode = (node: any): void => {
    if (node.type === 'list' && node.children) {
      // Process list items
      node.children.forEach((listItem: any) => {
        if (listItem.type === 'listitem') {
          const itemText = extractText(listItem).trim()
          if (itemText) {
            items.push(itemText)
          }
        }
      })
    } else if (node.type === 'paragraph') {
      // Process paragraphs as individual items
      const paragraphText = extractText(node).trim()
      if (paragraphText) {
        items.push(paragraphText)
      }
    } else if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => processNode(child))
    }
  }

  bio.root.children.forEach((child: any) => processNode(child))
  return items
}

export const Coaches: React.FC<CoachesProps> = ({ coaches }) => {
  if (!coaches || coaches.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Antrenează-te cu Campioni
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Echipa noastră de antrenori certificați și experimentați este dedicată succesului
            fiecărui copil
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {coaches.map((coach) => {
            const bgColor =
              bgColorClasses[coach.backgroundColor as keyof typeof bgColorClasses] ||
              bgColorClasses.peach
            const bioItems = extractListItemsFromLexical(coach.bio)

            return (
              <div
                key={coach.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div
                    className={`${bgColor} w-full sm:w-48 h-64 sm:h-auto flex items-center justify-center flex-shrink-0`}
                  >
                    {coach.image && typeof coach.image === 'object' && coach.image.url ? (
                      <Image
                        src={coach.image.url}
                        alt={coach.name}
                        width={192}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <div className="text-4xl md:text-5xl mb-2">👤</div>
                        <p className="text-xs">Fotografie</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {coach.name}
                    </h3>
                    <p className="text-gray-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">
                      {coach.title}
                    </p>

                    {bioItems.length > 0 && (
                      <ul className="space-y-2">
                        {bioItems.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
