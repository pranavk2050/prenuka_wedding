import { useState } from 'react'

const KEY = 'wedding_user_name'

export function useUserName() {
  const [name, setNameState] = useState(() => localStorage.getItem(KEY) || '')

  function setName(n) {
    localStorage.setItem(KEY, n)
    setNameState(n)
  }

  return [name, setName]
}

export function getUserName() {
  return localStorage.getItem(KEY) || 'Someone'
}
