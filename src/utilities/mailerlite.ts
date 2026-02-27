import MailerLite, { CreateOrUpdateSubscriberParams } from '@mailerlite/mailerlite-nodejs'

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY || '',
})

export const addSubscriberToGroup = async (
  email: string,
  name: string,
  lastName: string,
  phone: string,
  firstTrainingDate: string | undefined | null,
  groupID: string,
) => {
  const params: CreateOrUpdateSubscriberParams = {
    email,
    fields: {
      name,
      last_name: lastName,
      phone,
      company: firstTrainingDate ? firstTrainingDate.split('T')[0] : '',
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
