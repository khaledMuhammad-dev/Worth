'use client'

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey) return null

  if (getApps().length > 0) return getApps()[0]
  return initializeApp({
    apiKey,
    authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  })
}

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp()
  return app ? getAuth(app) : null
}

// Lazy proxy — safe to import anywhere; only initializes in the browser
export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    const instance = getFirebaseAuth()
    if (!instance) return undefined
    return (instance as unknown as Record<string | symbol, unknown>)[prop]
  },
})
