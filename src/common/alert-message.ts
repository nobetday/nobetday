export type AlertType = 'is-info' | 'is-success' | 'is-warning' | 'is-danger'

export interface AlertMessage {
  readonly content: string
  readonly type: AlertType
}
