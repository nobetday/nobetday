import { AlertMessage } from '@/common/alert-message'

export const alertToast = (message: AlertMessage) => {
  const { toast } = require('bulma-toast')
  toast({
    message: message.content,
    type: message.type,
    position: 'bottom-left',
    duration: 1000,
  })
}
