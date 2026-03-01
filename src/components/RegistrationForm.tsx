'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import type { Group } from '@/payload-types'

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  groups: Group[]
  selectedGroupId?: number
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
  groups,
  selectedGroupId,
}) => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    intention: '',
    program: '',
    hasHealthProblems: false,
    healthProblemsDetails: '',
    referralSource: '',
    firstTrainingDate: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Auto-select group when selectedGroupId changes
  useEffect(() => {
    if (selectedGroupId) {
      setFormData((prev) => ({ ...prev, program: selectedGroupId.toString() }))
    }
  }, [selectedGroupId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          parentName: '',
          email: '',
          phone: '',
          childName: '',
          childAge: '',
          intention: '',
          program: '',
          hasHealthProblems: false,
          healthProblemsDetails: '',
          referralSource: '',
          firstTrainingDate: '',
        })

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">📝 Formular de Înscriere</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              <p className="font-semibold">✅ Înscriere trimisă cu succes!</p>
              <p className="text-sm mt-1">Vă vom contacta în curând.</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-semibold">❌ A apărut o eroare</p>
              <p className="text-sm mt-1">Vă rugăm să încercați din nou.</p>
            </div>
          )}

          {/* Parent Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informații Părinte</h3>

            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                Nume Părinte <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Child Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informații Copil</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nume Copil <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  required
                  value={formData.childName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                  Vârsta Copilului <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="childAge"
                  name="childAge"
                  required
                  min="1"
                  max="18"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Program Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Detalii Program</h3>

            <div>
              <label htmlFor="intention" className="block text-sm font-medium text-gray-700 mb-1">
                Intenție Înscriere <span className="text-red-500">*</span>
              </label>
              <select
                id="intention"
                name="intention"
                required
                value={formData.intention}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Selectează...</option>
                <option value="fitness">Mișcare</option>
                <option value="other">Disciplină și încredere</option>
                <option value="recreation">Pasiune</option>
                <option value="competition">Performanță</option>
              </select>
            </div>

            <div>
              <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                Program Dorit <span className="text-red-500">*</span>
              </label>
              <select
                id="program"
                name="program"
                required
                value={formData.program}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Selectează grupa...</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.ageRange})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="firstTrainingDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data Primului Antrenament
              </label>
              <input
                type="date"
                id="firstTrainingDate"
                name="firstTrainingDate"
                value={formData.firstTrainingDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Health Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informații Sănătate</h3>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="hasHealthProblems"
                name="hasHealthProblems"
                checked={formData.hasHealthProblems}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
              />
              <label htmlFor="hasHealthProblems" className="text-sm text-gray-700">
                Copilul are probleme de sănătate care ar trebui să le cunoaștem
              </label>
            </div>

            {formData.hasHealthProblems && (
              <div>
                <label
                  htmlFor="healthProblemsDetails"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Detalii Probleme de Sănătate
                </label>
                <textarea
                  id="healthProblemsDetails"
                  name="healthProblemsDetails"
                  rows={3}
                  value={formData.healthProblemsDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Vă rugăm să descrieți..."
                />
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div>
            <label
              htmlFor="referralSource"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              De unde ați auzit despre noi?
            </label>
            <input
              type="text"
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              placeholder="Ex: Facebook, Google, Recomandare prieten..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Se trimite...' : 'Trimite Înscrierea'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-semibold"
            >
              Anulează
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
