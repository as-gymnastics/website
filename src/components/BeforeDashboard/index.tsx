'use client'
import { Banner } from '@payloadcms/ui/elements/Banner'
import React, { useState } from 'react'

import './index.scss'
import { Link } from 'lucide-react'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSeed = async () => {
    setIsSeeding(true)
    setSeedResult(null)

    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      const data = await response.json()
      setSeedResult(data)
    } catch (error) {
      setSeedResult({ success: false, message: 'Failed to seed database' })
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>AS Gymnastics Admin Panel</h4>
      </Banner>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleSeed}
          disabled={isSeeding}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSeeding ? 'not-allowed' : 'pointer',
            opacity: isSeeding ? 0.6 : 1,
          }}
        >
          {isSeeding ? 'Seeding...' : '🌱 Seed Groups Database'}
        </button>

        {seedResult && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: seedResult.success ? '#D1FAE5' : '#FEE2E2',
              color: seedResult.success ? '#065F46' : '#991B1B',
            }}
          >
            {seedResult.message}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
        <p>
          <strong>Quick Actions:</strong>
        </p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>
            <Link href="/admin/collections/groups" style={{ color: '#2563EB' }}>
              Manage Training Groups
            </Link>
          </li>
          <li>
            <Link href="/admin/collections/coaches" style={{ color: '#2563EB' }}>
              Manage Coaches
            </Link>
          </li>
          <li>
            <Link href="/admin/collections/registrations" style={{ color: '#2563EB' }}>
              View Registrations
            </Link>
          </li>
          <li>
            <a href="/" target="_blank" style={{ color: '#2563EB' }}>
              View Website
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BeforeDashboard
