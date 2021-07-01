import { firebaseStore } from '@/common/firebase'
import { DocumentSnapshot, getDocument } from '@/common/firebase-document'
import { Message } from '@/message/message-model'
import { getNameFromId } from '@/user/auth-user'
import { ProfileDocument } from '@/user/profile-document'

const db = firebaseStore()
let allMessages: Message[]

export const messageDescription = 'Messages Description'

export const getMessagesInOrder = async (): Promise<Message[]> => {
  if (!allMessages) {
    const profileSnapshots = await db.collection('profiles').get()
    allMessages = profileSnapshots.docs
      .reduce((result: Message[], profileSnapshot: DocumentSnapshot) => {
        const profileDocument = getDocument<ProfileDocument>(profileSnapshot)
        if (profileDocument && profileDocument.message) {
          result.push({
            userId: getNameFromId(profileSnapshot.id),
            content: profileDocument.message.content,
            createdAt: profileDocument.message.createdAt.toDate().toISOString(),
            updatedAt: profileDocument.message.updatedAt.toDate().toISOString(),
          })
        }
        return result
      }, [])
      .sort((message1, message2) => message2.createdAt.localeCompare(message1.createdAt))
  }
  return allMessages
}

export const messagesPerPage = 10

export const getTotalMessagePages = async () => {
  const message = await getMessagesInOrder()
  return Math.ceil(message.length / messagesPerPage)
}
