import { useCallback, useSyncExternalStore } from 'react'

const USER_MODE = 'user'
const DEVELOPER_MODE = 'developer'

let currentMode = USER_MODE
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return currentMode
}

function updateMode(nextMode) {
  if (nextMode !== USER_MODE && nextMode !== DEVELOPER_MODE) {
    return
  }

  if (currentMode === nextMode) {
    return
  }

  currentMode = nextMode
  listeners.forEach((listener) => listener())
}

export default function usePerspectiveMode() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const setUserMode = useCallback(() => {
    updateMode(USER_MODE)
  }, [])

  const setDeveloperMode = useCallback(() => {
    updateMode(DEVELOPER_MODE)
  }, [])

  const toggleMode = useCallback(() => {
    updateMode(currentMode === USER_MODE ? DEVELOPER_MODE : USER_MODE)
  }, [])

  return {
    mode,
    isUserMode: mode === USER_MODE,
    isDeveloperMode: mode === DEVELOPER_MODE,
    setUserMode,
    setDeveloperMode,
    toggleMode,
  }
}