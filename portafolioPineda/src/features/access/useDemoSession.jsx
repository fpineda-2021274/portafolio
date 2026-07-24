import {
  useCallback,
  useSyncExternalStore,
} from 'react'

const STORAGE_KEY = 'portfolio-demo-session'
const SESSION_EVENT = 'portfolio-demo-session-change'

function getServerSnapshot() {
  return false
}

function getSessionSnapshot() {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return (
      window.localStorage.getItem(STORAGE_KEY) === 'active'
    )
  } catch {
    return false
  }
}

function subscribeToSession(onStoreChange) {
  function handleStorageChange(event) {
    if (event.key === STORAGE_KEY) {
      onStoreChange()
    }
  }

  function handleLocalSessionChange() {
    onStoreChange()
  }

  window.addEventListener(
    'storage',
    handleStorageChange,
  )

  window.addEventListener(
    SESSION_EVENT,
    handleLocalSessionChange,
  )

  return () => {
    window.removeEventListener(
      'storage',
      handleStorageChange,
    )

    window.removeEventListener(
      SESSION_EVENT,
      handleLocalSessionChange,
    )
  }
}

function dispatchSessionChange() {
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export default function useDemoSession() {
  const isAuthenticated = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSnapshot,
  )

  const activateSession = useCallback(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        'active',
      )

      dispatchSessionChange()
      return true
    } catch {
      return false
    }
  }, [])

  const deactivateSession = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
      dispatchSessionChange()
      return true
    } catch {
      return false
    }
  }, [])

  return {
    isAuthenticated,
    activateSession,
    deactivateSession,
  }
}