import { createContext, useContext, useState, useEffect } from 'react'
import { startPresence, logVisit, subscribeVisits } from '../firebase/presenceService'
import { getUserName } from '../hooks/useUserName'

const PresenceContext = createContext({ onlineUsers: [], visitLog: [] })

export function PresenceProvider({ children }) {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [visitLog,    setVisitLog]    = useState([])

  useEffect(() => {
    // Poll until name is set (covers the case where modal is shown on first visit)
    function tryStart() {
      const userName = getUserName()
      if (!userName) return
      clearInterval(poll)
      logVisit(userName)
      startPresence(userName, setOnlineUsers)
      subscribeVisits(setVisitLog)
    }
    const poll = setInterval(tryStart, 1000)
    tryStart()
    return () => clearInterval(poll)
  }, [])

  return (
    <PresenceContext.Provider value={{ onlineUsers, visitLog }}>
      {children}
    </PresenceContext.Provider>
  )
}

export const usePresence = () => useContext(PresenceContext)
