export interface DocumentSnapshot {
  readonly id: string
  readonly exists: boolean
  readonly data: () => any
}

export interface DateField {
  readonly toDate: () => Date
}

export const getDocument = <T>(snapshot: DocumentSnapshot): T | undefined => {
  if (!snapshot.exists) {
    return
  }

  const data = snapshot.data()

  if (!data) {
    return
  }

  return {
    ...data,
    id: snapshot.id,
  }
}
