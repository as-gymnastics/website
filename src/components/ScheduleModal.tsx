'use client'

import React from 'react'
import { Media } from './Media'
import type { Media as MediaType } from '@/payload-types'
import { X } from 'lucide-react'

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  scheduleImage?: MediaType | number | string | null
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, scheduleImage }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-2 hover:bg-white text-gray-800 transition-colors shadow-md"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          {scheduleImage && typeof scheduleImage === 'object' ? (
            <Media resource={scheduleImage} imgClassName="w-full h-auto rounded-xl" />
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p>No schedule image available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
