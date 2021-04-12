import firebase from 'firebase/app'

import { ensureEnv } from '@/common/env'

require('firebase/auth')

const PROJECT_ID = ensureEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
const APP_ID = ensureEnv('NEXT_PUBLIC_FIREBASE_APP_ID', process.env.NEXT_PUBLIC_FIREBASE_APP_ID)
const API_KEY = ensureEnv('NEXT_PUBLIC_FIREBASE_API_KEY', process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
const MESSAGING_SENDER_ID = ensureEnv(
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
)
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: process.env.NODE_ENV === 'production' && AUTH_DOMAIN ? AUTH_DOMAIN : `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
