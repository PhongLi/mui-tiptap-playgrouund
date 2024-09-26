let isMacResult: boolean | undefined
let isTouchDeviceResult: boolean | undefined

/**
 * Return true if the user is using a Mac (as opposed to Windows, etc.) device.
 */
export function isMac(): boolean {
    if (isMacResult === undefined) {
        isMacResult = navigator.platform.includes('Mac')
    }
    return isMacResult
}

export function getModShortcutKey(): string {
    return isMac() ? '⌘' : 'Ctrl'
}

/** Return true if the user is using a touch-based device. */
export function isTouchDevice(): boolean {
    if (isTouchDeviceResult === undefined) {
        // This technique is taken from
        // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
        // (and https://stackoverflow.com/a/4819886/4543977)
        isTouchDeviceResult =
            (window && 'ontouchstart' in window) ||
            navigator.maxTouchPoints > 0 ||
            // @ts-expect-error: msMaxTouchPoints is IE-specific, so needs to be ignored
            navigator.msMaxTouchPoints > 0
    }

    return isTouchDeviceResult
}
