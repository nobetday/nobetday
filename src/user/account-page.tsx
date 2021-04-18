import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'

import { ContentBox } from '@/common/content-box'
import { firebaseStore } from '@/common/firebase'
import { getDocument } from '@/common/firebase-document'
import { PageLayout } from '@/common/page-layout'
import { AuthAlert } from '@/user/auth-alert'
import { useAuthState } from '@/user/auth-context'
import { AuthReady } from '@/user/auth-ready'
import { AuthUser, getNameFromId } from '@/user/auth-user'
import { ProfileDocument } from '@/user/profile-document'
import { SignOutButton } from '@/user/signout-button'

const db = firebaseStore()

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

const saveProfile = async (user: AuthUser, profileDoc: ProfileDocument | undefined, message: string) => {
  await db
    .collection('profiles')
    .doc(user.id)
    .set(
      {
        message: message
          ? {
              content: message,
              updatedAt: firebaseStore.FieldValue.serverTimestamp(),
              ...(profileDoc?.message?.createdAt ? {} : { createdAt: firebaseStore.FieldValue.serverTimestamp() }),
            }
          : firebaseStore.FieldValue.delete(),
      },
      { merge: true },
    )
}

const loadProfile = async (user: AuthUser): Promise<ProfileDocument | undefined> => {
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
  const [profileDoc, setProfileDoc] = useState<ProfileDocument | undefined>()
  const [message, setMessage] = useState<string>('')
  const [isSaving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await saveProfile(user, profileDoc, message.trim())
    setProfileDoc(await loadProfile(user))
    setSaving(false)
  }

  useEffect(() => {
    loadProfile(user).then(setProfileDoc)
  }, [user])

  useEffect(() => {
    setMessage(profileDoc?.message?.content || '')
  }, [profileDoc])

  return (
    <section className='section'>
      <EmailField email={user.hiddenInfo.email} />
      <MessageField message={message} onChange={setMessage} />
      <div className='field is-grouped'>
        <div className='control'>
          <button onClick={handleSave} className={clsx('button is-primary', isSaving && 'is-loading')}>
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
