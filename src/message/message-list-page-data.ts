import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { getTotalMessagePages } from '@/message/message-data'
import { MessageListPageProps } from '@/message/message-list-page'

export interface MessageListPageParams extends ParsedUrlQuery {
  readonly messagePageId: string
}

export const getMessageListPageStaticPaths: GetStaticPaths = async () => {
  const totalMessagePages = await getTotalMessagePages()
  const paths = Array.from({ length: totalMessagePages }, (_, pageIndex) => ({
    params: { messagePageId: `${pageIndex + 1}` },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getMessageListPageStaticProps: GetStaticProps<MessageListPageProps, MessageListPageParams> = async ({
  params,
}) => {
  const messagePageId = params && params.messagePageId

  if (!messagePageId) {
    return {
      notFound: true,
    }
  }

  return {
    props: { pageId: +messagePageId },
  }
}

export const getFirstMessageListPageStaticProps: GetStaticProps<MessageListPageProps> = async () => {
  return {
    props: { pageId: 1 },
  }
}
