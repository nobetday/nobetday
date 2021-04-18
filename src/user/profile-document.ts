import { DateField } from '@/common/firebase-document'

export interface MessageField {
  readonly content: string
  readonly createdAt: DateField
  readonly updatedAt: DateField
}

export interface ProfileDocument {
  readonly id: string
  readonly message?: MessageField
}
