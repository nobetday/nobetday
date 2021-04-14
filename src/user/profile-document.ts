import { DateField } from '@/common/firebase-document'

export interface ProfileDocument {
  readonly id: string
  readonly message: string
  readonly messageUpdatedAt: DateField
}
