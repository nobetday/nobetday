import { firebaseStore } from '@/common/firebase'
import { DocumentSnapshot, getDocument } from '@/common/firebase-document'
import { Message } from '@/message/message-model'
import { getNameFromId } from '@/user/auth-user'
import { ProfileDocument } from '@/user/profile-document'

const db = firebaseStore()
let allMessages: Message[]

export const messageDescription = 'Messages Description'

export const getMessages = async (): Promise<Message[]> => {
  if (!allMessages) {
    const profileSnapshots = await db.collection('profiles').get()
    allMessages = profileSnapshots.docs.reduce((result: Message[], profileSnapshot: DocumentSnapshot) => {
      const profileDocument = getDocument<ProfileDocument>(profileSnapshot)
      if (profileDocument) {
        result.push({
          id: getNameFromId(profileSnapshot.id),
          content: profileDocument.message,
          updatedAt: profileDocument.messageUpdatedAt.toDate().toISOString(),
        })
      }
      return result
    }, [])
  }
  return allMessages
}

export const messagesPerPage = 1

export const getTotalMessagePages = async () => {
  const message = await getMessages()
  return Math.ceil(message.length / messagesPerPage)
}
