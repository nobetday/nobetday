import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import firebase from 'firebase/app'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { getDocument } from '@/common/firestore-document'
import { PageLayout } from '@/common/page-layout'
import { AuthAlert } from '@/user/auth-alert'
import { useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { AuthUser, getNameFromId } from '@/user/auth-user'
import { ProfileDocument } from '@/user/profile-document'
import { SignOutButton } from '@/user/signout-button'

interface EmailFieldProps {
  readonly email?: string
}

const EmailField: FunctionComponent<EmailFieldProps> = ({ email }) => {
  const [isVisible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible(!isVisible)
  }

  if (!email) {
    return <></>
  }

  return (
    <div className='field'>
      <label className='label is-medium'>Email</label>
      <div className='control'>
        <button onClick={toggleVisible} title={isVisible ? 'Hide' : 'Unhide'} className='button is-small'>
          <span className='icon'>
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </span>
        </button>
        <span className='ml-3'>{isVisible ? email : '*****'}</span>
      </div>
    </div>
  )
}

interface MessageFieldProps {
  readonly message: string
  readonly onChange: (value: string) => void
}

const MessageField: FunctionComponent<MessageFieldProps> = ({ message, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className='field'>
      <label className='label is-medium'>Message</label>
      <div className='control'>
        <textarea value={message} onChange={handleChange} rows={7} className='textarea is-medium' />
      </div>
    </div>
  )
}

const saveProfile = async (user: AuthUser, message: string) => {
  const db = firebase.firestore()
  const profileRef = db.collection('profiles').doc(user.id)
  await db.runTransaction(async (transaction) => {
    const profileSnapshot = await transaction.get(profileRef)
    const profileDoc = getDocument<ProfileDocument>(profileSnapshot)
    await transaction.set(profileRef, {
      ...profileDoc,
      id: user.id,
      message,
      messageUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  })
}

const loadProfile = async (user: AuthUser): Promise<ProfileDocument | undefined> => {
  const db = firebase.firestore()
  const profileSnapshot = await db
    .collection('profiles')
    .doc(user.id)
    .get()
  return getDocument<ProfileDocument>(profileSnapshot)
}

interface AccountSettingsProps {
  readonly user: AuthUser
}

const AccountSettings: FunctionComponent<AccountSettingsProps> = ({ user }) => {
  const [message, setMessage] = useState<string>('')
  const [isLoading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await saveProfile(user, message)
    setLoading(false)
  }

  useEffect(() => {
    loadProfile(user).then((profileDoc) => {
      if (profileDoc) {
        setMessage(profileDoc.message)
      }
    })
  }, [user])

  return (
    <section className='section'>
      <EmailField email={user.hiddenInfo.email} />
      <MessageField message={message} onChange={setMessage} />
      <div className='field is-grouped'>
        <div className='control'>
          <button onClick={handleSave} className={clsx('button is-primary', isLoading && 'is-loading')}>
            Save
          </button>
        </div>
        <div className='control'>
          <SignOutButton />
        </div>
      </div>
    </section>
  )
}

const accountPageTitle = 'Account'

export const AccountPage: NextPage = () => {
  const { user } = useAuthState()

  return (
    <PageLayout title={accountPageTitle} subtitle={user ? getNameFromId(user.id) : undefined}>
      <NextSeo title={accountPageTitle} noindex nofollow />
      <ContentBox>
        <AuthReady>{user ? <AccountSettings user={user} /> : <AuthAlert />}</AuthReady>
      </ContentBox>
    </PageLayout>
  )
}
