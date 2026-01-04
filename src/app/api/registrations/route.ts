import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'parentName',
      'email',
      'phone',
      'childName',
      'childAge',
      'intention',
      'program',
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Get Payload instance
    const payload = await getPayload({ config })

    // Create registration entry
    const registration = await payload.create({
      collection: 'registrations',
      data: {
        parentName: body.parentName,
        email: body.email,
        phone: body.phone,
        childName: body.childName,
        childAge: parseInt(body.childAge),
        intention: body.intention,
        program: body.program,
        hasHealthProblems: body.hasHealthProblems || false,
        healthProblemsDetails: body.healthProblemsDetails || '',
        referralSource: body.referralSource || '',
        firstTrainingDate: body.firstTrainingDate || null,
        status: 'pending',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully',
        id: registration.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Registration submission error:', error)
    return NextResponse.json({ error: 'Failed to submit registration' }, { status: 500 })
  }
}
