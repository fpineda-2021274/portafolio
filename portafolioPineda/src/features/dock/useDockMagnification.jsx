import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

function createDefaultScales(itemCount) {
  return Array.from(
    {
      length: itemCount,
    },
    () => 1,
  )
}

export default function useDockMagnification(itemCount) {
  const itemRefs = useRef([])
  const animationFrameRef = useRef(null)
  const latestPointerXRef = useRef(null)
  const touchResetTimeoutRef = useRef(null)

  const [scales, setScales] = useState(() =>
    createDefaultScales(itemCount),
  )

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        )
      }

      if (touchResetTimeoutRef.current !== null) {
        window.clearTimeout(
          touchResetTimeoutRef.current,
        )
      }
    }
  }, [])

  const registerItem = useCallback((index, element) => {
    itemRefs.current[index] = element
  }, [])

  const resetScales = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(
        animationFrameRef.current,
      )

      animationFrameRef.current = null
    }

    setScales(createDefaultScales(itemCount))
  }, [itemCount])

  const calculateMouseScales = useCallback(() => {
    const pointerX = latestPointerXRef.current

    animationFrameRef.current = null

    if (pointerX === null) {
      return
    }

    const maximumDistance = 120
    const maximumGrowth = 0.48

    const nextScales = itemRefs.current
      .slice(0, itemCount)
      .map((element) => {
        if (!element) {
          return 1
        }

        const bounds = element.getBoundingClientRect()
        const itemCenter = bounds.left + bounds.width / 2
        const distance = Math.abs(pointerX - itemCenter)

        const proximity = Math.max(
          0,
          1 - distance / maximumDistance,
        )

        return 1 + proximity * maximumGrowth
      })

    setScales(nextScales)
  }, [itemCount])

  const handlePointerMove = useCallback(
    (event) => {
      if (event.pointerType !== 'mouse') {
        return
      }

      latestPointerXRef.current = event.clientX

      if (animationFrameRef.current !== null) {
        return
      }

      animationFrameRef.current =
        window.requestAnimationFrame(
          calculateMouseScales,
        )
    },
    [calculateMouseScales],
  )

  const handlePointerLeave = useCallback(() => {
    latestPointerXRef.current = null
    resetScales()
  }, [resetScales])

  const handleItemPointerDown = useCallback(
    (index, event) => {
      if (event.pointerType === 'mouse') {
        return
      }

      if (touchResetTimeoutRef.current !== null) {
        window.clearTimeout(
          touchResetTimeoutRef.current,
        )
      }

      const touchScales = createDefaultScales(itemCount)

      touchScales[index] = 1.4

      if (index > 0) {
        touchScales[index - 1] = 1.16
      }

      if (index < itemCount - 1) {
        touchScales[index + 1] = 1.16
      }

      setScales(touchScales)
    },
    [itemCount],
  )

  const handleItemPointerEnd = useCallback(
    (event) => {
      if (event.pointerType === 'mouse') {
        return
      }

      touchResetTimeoutRef.current =
        window.setTimeout(() => {
          setScales(createDefaultScales(itemCount))
        }, 220)
    },
    [itemCount],
  )

  const getScale = useCallback(
    (index) => scales[index] ?? 1,
    [scales],
  )

  return {
    registerItem,
    getScale,
    handlePointerMove,
    handlePointerLeave,
    handleItemPointerDown,
    handleItemPointerEnd,
  }
}