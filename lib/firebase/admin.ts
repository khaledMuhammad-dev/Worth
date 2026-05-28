import 'server-only'
import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getAuth, Auth } from 'firebase-admin/auth'

function getAdminApp(): App | null {
  const email = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  if (!email || !privateKey) return null

  if (getApps().length > 0) return getApps()[0]
  return initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: email,
      privateKey:  privateKey.replace(/\\n/g, '\n'),
    }),
  })
}

export function getAdminDb(): Firestore | null {
  const app = getAdminApp()
  return app ? getFirestore(app) : null
}

export function getAdminAuth(): Auth | null {
  const app = getAdminApp()
  return app ? getAuth(app) : null
}

// Lazy-init singletons for backwards compatibility
let _adminDb: Firestore | null = null
let _adminAuth: Auth | null = null

export const adminDb = new Proxy({} as Firestore, {
  get(_target, prop) {
    if (!_adminDb) _adminDb = getAdminDb()
    if (!_adminDb) throw new Error('Firebase Admin not configured. Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.')
    return (_adminDb as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export const adminAuth = new Proxy({} as Auth, {
  get(_target, prop) {
    if (!_adminAuth) _adminAuth = getAdminAuth()
    if (!_adminAuth) throw new Error('Firebase Admin not configured. Set FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY.')
    return (_adminAuth as unknown as Record<string | symbol, unknown>)[prop]
  },
})
