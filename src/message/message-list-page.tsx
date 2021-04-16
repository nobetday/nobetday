import { NextPage } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { PageLayout } from '@/common/page-layout'
import { Pagination } from '@/common/pagination'
import { uiConstants } from '@/common/ui-constants'
import { getMessages, getTotalMessagePages, messageDescription, messagesPerPage } from '@/message/message-data'
import { MessageDisplay } from '@/message/message-display'
import { Message } from '@/message/message-model'

const messageListPageTitle = 'Messages'
const messageListPageSeoProps: NextSeoProps = {
  title: messageListPageTitle,
  description: messageDescription,
  openGraph: {
    title: messageListPageTitle,
    description: messageDescription,
    images: [{ url: `${uiConstants.webUrl}/images/utYSgMOIm5w.jpeg` }],
  },
}
export interface MessageListPageProps {
  readonly pageId: number
}

export const MessageListPage: NextPage<MessageListPageProps> = ({ pageId }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [totalMessagePages, setTotalMessagePages] = useState(0)

  useEffect(() => {
    getMessages().then((messages) =>
      setMessages(messages.slice((pageId - 1) * messagesPerPage, pageId * messagesPerPage)),
    )
    getTotalMessagePages().then((totalMessagePages) => setTotalMessagePages(totalMessagePages))
  }, [pageId])

  return (
    <PageLayout title={messageListPageTitle} subtitle={messageDescription}>
      <NextSeo {...messageListPageSeoProps} />
      <ContentBox>
        {messages.map((message) => (
          <section key={message.id} className='section'>
            <MessageDisplay message={message} />
          </section>
        ))}
        <Pagination
          previousPath={pageId > 1 ? (pageId === 2 ? '/messages' : `/messages/p/${pageId - 1}`) : undefined}
          nextPath={pageId < totalMessagePages ? `/messages/p/${pageId + 1}` : undefined}
        />
      </ContentBox>
    </PageLayout>
  )
}
