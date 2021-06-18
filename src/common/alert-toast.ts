import { toast } from 'bulma-toast'

import { AlertMessage } from '@/common/alert-message'

export const alertToast = (message: AlertMessage) => {
  toast({
    message: message.content,
    type: message.type,
    position: 'bottom-left',
    duration: 1000,
  })
}
