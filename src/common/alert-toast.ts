import { AlertMessage } from '@/common/alert-message'
import { toast } from 'bulma-toast'

export const alertToast = (message: AlertMessage) => {
  toast({
    message: message.content,
    type: message.type,
    position: 'bottom-left',
    duration: 1000,
  })
}
