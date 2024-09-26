import type { DebouncedFunc, DebounceSettings } from 'lodash'
import debounce from 'lodash/debounce'
import { useEffect, useRef, useState } from 'react'

export type DebounceRenderProps = {
    /**
     * The wait in ms for debouncing. Any changes to this prop after initial
     * render are ignored.
     */
    wait?: number
    /**
     * Options to use for lodash's debounce call. Any changes to this prop after
     * initial render are ignored.
     */
    options?: DebounceSettings
    /** Content to render at debounced intervals as props change */
    children: React.ReactNode
}

function DebounceRender({
    wait = 170,
    options = { leading: true, trailing: true, maxWait: 300 },
    children,
}: DebounceRenderProps) {
    const updateDebouncedRef = useRef<DebouncedFunc<() => void>>()
    const [, setForceUpdate] = useState(false)

    const forceUpdate = () => {
        setForceUpdate(prev => !prev)
    }

    useEffect(() => {
        updateDebouncedRef.current = debounce(
            () => forceUpdate(),
            wait,
            options,
        )

        return () => {
            updateDebouncedRef.current?.cancel()
        }
    }, [wait, options])

    useEffect(() => {
        updateDebouncedRef.current?.()
        return () => {
            updateDebouncedRef.current?.cancel()
        }
    }, [])

    return children
}

export default DebounceRender
