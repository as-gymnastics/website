import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
// Default to the sandbox number if not specified
const fromNumber = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'

let client: twilio.Twilio | null = null

if (accountSid && authToken) {
  client = twilio(accountSid, authToken)
} else {
  console.warn('Twilio credentials not found in environment variables.')
}

export const sendWhatsAppMessage = async (to: string, body: string) => {
  if (!client) {
    console.error('Twilio client not initialized. Cannot send message.')
    return
  }

  // Ensure the 'to' number has the whatsapp: prefix
  const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`

  try {
    const message = await client.messages.create({
      contentSid: process.env.TWILIO_WHATSAPP_CONTENT_SID,
      from: fromNumber,
      to: formattedTo,
    })
    console.log(`WhatsApp message sent to ${formattedTo}. SID: ${message.sid}`)
    return message
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    // We don't throw here to avoid failing the entire registration request if notification fails
    return null
  }
}
