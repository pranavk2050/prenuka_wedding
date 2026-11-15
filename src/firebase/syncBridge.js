import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db } from './firebaseConfig'

const WEDDING_DOC = doc(db, 'weddings', 'pranav-renuka')

let isRemoteWrite = false
let debounceTimer = null
let unsubscribeSnapshot = null

function getOrCreateDeviceId() {
  let id = sessionStorage.getItem('wedding_device_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('wedding_device_id', id)
  }
  return id
}

async function writeToFirestore(state, deviceId) {
  const payload = {
    guests: state.guests,
    tasks: state.tasks,
    budget: state.budget,
    vendors: state.vendors,
    schedule: state.schedule,
    venue: state.venue,
    activityLog: state.activityLog ?? [],
    _deviceId: deviceId,
    _updatedAt: serverTimestamp(),
  }
  await setDoc(WEDDING_DOC, payload)
}

function scheduleWrite(state, deviceId, onStatus) {
  if (isRemoteWrite) return
  clearTimeout(debounceTimer)
  onStatus('syncing')
  debounceTimer = setTimeout(async () => {
    try {
      await writeToFirestore(state, deviceId)
      onStatus('synced')
    } catch {
      onStatus('error')
    }
  }, 1500)
}

function startListening(store, deviceId, onStatus) {
  if (unsubscribeSnapshot) unsubscribeSnapshot()
  unsubscribeSnapshot = onSnapshot(
    WEDDING_DOC,
    snap => {
      if (!snap.exists()) return
      const data = snap.data()
      if (data._deviceId === deviceId) return
      isRemoteWrite = true
      store.getState().setRemoteData(data)
      isRemoteWrite = false
      onStatus('synced')
    },
    () => onStatus('error')
  )
}

async function readOnce(store, deviceId) {
  const snap = await getDoc(WEDDING_DOC)
  if (!snap.exists()) {
    await writeToFirestore(store.getState(), deviceId)
  } else {
    const data = snap.data()
    isRemoteWrite = true
    store.getState().setRemoteData(data)
    isRemoteWrite = false
  }
}

export async function initFirebaseSync(store, onStatus) {
  const deviceId = getOrCreateDeviceId()
  onStatus('syncing')

  window.addEventListener('online', () => {
    onStatus('syncing')
    readOnce(store, deviceId)
      .then(() => { startListening(store, deviceId, onStatus); onStatus('synced') })
      .catch(() => onStatus('error'))
  })

  window.addEventListener('offline', () => {
    onStatus('offline')
    if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null }
  })

  if (!navigator.onLine) {
    onStatus('offline')
    return
  }

  try {
    await readOnce(store, deviceId)
    startListening(store, deviceId, onStatus)
    onStatus('synced')
  } catch {
    onStatus('error')
  }

  store.subscribe(state => {
    scheduleWrite(state, deviceId, onStatus)
  })
}
