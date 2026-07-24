import {
  useCallback,
  useSyncExternalStore,
} from 'react'

function getServerSnapshot() {
  return false
}

export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(query)

      mediaQuery.addEventListener('change', onStoreChange)

      return () => {
        mediaQuery.removeEventListener(
          'change',
          onStoreChange,
        )
      }
    },
    [query],
  )

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )
}