import { DateField } from '@/common/firestore-document'

export interface ProfileDocument {
  readonly id: string
  readonly message: string
  readonly messageUpdatedAt: DateField
}
