/** Minimum size for image adjustments */
export const IMAGE_MIN_SIZE = 20 as const
/** Maximum size for image adjustments */
export const IMAGE_MAX_SIZE = 100_000 as const
/** Throttle time during adjustments for images (milliseconds) */
export const IMAGE_THROTTLE_WAIT_TIME = 16 as const

/** Options for setting image size in the bubble menu */
export enum IMAGE_SIZE {
    sizeS = 200,
    sizeM = 500,
    sizeL = '100%',
}
