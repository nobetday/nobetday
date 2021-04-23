import { FunctionComponent } from 'react'

import { Message } from '@/message/message-model'

export interface MessageDisplayProps {
  readonly message: Message
}

export const MessageDisplay: FunctionComponent<MessageDisplayProps> = ({ message }) => {
  return (
    <>
      <div className='block'>
        <h2 className='subtitle is-2 has-text-dark'>{message.userId}</h2>
      </div>
      <div className='block message-content pl-4 py-4'>
        <p className='is-size-4'>{message.content}</p>
      </div>
    </>
  )
}
