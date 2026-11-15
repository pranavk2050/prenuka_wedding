import { createContext, useContext, useState, useEffect } from 'react'
import { initFirebaseSync } from '../firebase/syncBridge'
import useWeddingStore from '../store/useWeddingStore'

const SyncContext = createContext('syncing')

export function SyncProvider({ children }) {
  const [status, setStatus] = useState('syncing')

  useEffect(() => {
    initFirebaseSync(useWeddingStore, setStatus)
  }, [])

  return <SyncContext.Provider value={status}>{children}</SyncContext.Provider>
}

export const useSyncStatus = () => useContext(SyncContext)
