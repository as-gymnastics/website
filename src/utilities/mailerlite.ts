import MailerLite from '@mailerlite/mailerlite-nodejs'

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY || '',
})

export const addSubscriberToGroup = async (email: string, name: string, groupID: string) => {
  const params = {
    email,
    fields: {
      name,
    },
    groups: [groupID],
  }

  try {
    const response = await mailerlite.subscribers.createOrUpdate(params)
    return response.data
  } catch (error) {
    console.error('Error adding subscriber to MailerLite group:', error)
    throw error
  }
}
