import { doc, updateDoc, onSnapshot, arrayUnion, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebaseConfig'

const PRESENCE_DOC = doc(db, 'presence', 'wedding')
const VISITS_DOC   = doc(db, 'visits',   'wedding')
const ONLINE_THRESHOLD_MS = 3 * 60 * 1000 // 3 minutes

function isOnline(lastSeen) {
  if (!lastSeen) return false
  const ts = lastSeen.toMillis ? lastSeen.toMillis() : lastSeen
  return Date.now() - ts < ONLINE_THRESHOLD_MS
}

export async function startPresence(userName, onUsersChange) {
  if (!userName) return

  async function heartbeat() {
    try {
      await setDoc(PRESENCE_DOC, { [userName]: { lastSeen: serverTimestamp() } }, { merge: true })
    } catch {}
  }

  await heartbeat()
  const timer = setInterval(heartbeat, 60000)

  const unsub = onSnapshot(PRESENCE_DOC, snap => {
    if (!snap.exists()) { onUsersChange([]); return }
    const data = snap.data()
    const online = Object.entries(data)
      .filter(([, v]) => isOnline(v?.lastSeen))
      .map(([name]) => name)
    onUsersChange(online)
  }, () => onUsersChange([]))

  window.addEventListener('beforeunload', () => {
    clearInterval(timer)
    unsub()
  })

  return () => { clearInterval(timer); unsub() }
}

export async function logVisit(userName) {
  if (!userName) return
  const key = 'wedding_visit_logged'
  if (sessionStorage.getItem(key)) return
  sessionStorage.setItem(key, '1')

  const sessionId = crypto.randomUUID()
  try {
    const snap = await getDoc(VISITS_DOC)
    if (!snap.exists()) {
      await setDoc(VISITS_DOC, { log: [{ user: userName, at: Date.now(), sessionId }] })
    } else {
      const existing = snap.data().log || []
      const trimmed  = existing.slice(-49)
      await setDoc(VISITS_DOC, { log: [...trimmed, { user: userName, at: Date.now(), sessionId }] })
    }
  } catch {}
}

export function subscribeVisits(onVisitsChange) {
  return onSnapshot(VISITS_DOC, snap => {
    if (!snap.exists()) { onVisitsChange([]); return }
    const log = (snap.data().log || []).slice().sort((a, b) => b.at - a.at)
    onVisitsChange(log)
  }, () => onVisitsChange([]))
}
