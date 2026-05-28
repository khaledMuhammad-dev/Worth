import type {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'
import type { AdminUser } from '@/lib/rbac/types'
import type { Announcement, BlogMeta } from '@/lib/types/content'

export const adminUserConverter: FirestoreDataConverter<AdminUser> = {
  toFirestore(user: AdminUser): DocumentData {
    return { ...user }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): AdminUser {
    return { uid: snapshot.id, ...snapshot.data() } as AdminUser
  },
}

export const announcementConverter: FirestoreDataConverter<Announcement> = {
  toFirestore(a: Announcement): DocumentData {
    return { ...a }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Announcement {
    return { id: snapshot.id, ...snapshot.data() } as Announcement
  },
}

export const blogMetaConverter: FirestoreDataConverter<BlogMeta> = {
  toFirestore(b: BlogMeta): DocumentData {
    return { ...b }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): BlogMeta {
    return { slug: snapshot.id, ...snapshot.data() } as BlogMeta
  },
}
