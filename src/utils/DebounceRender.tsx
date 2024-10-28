import type { DebouncedFunc, DebounceSettings } from 'lodash'
import debounce from 'lodash/debounce'
import { Component } from 'react'

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
export default class DebounceRender extends Component<DebounceRenderProps> {
    // Similar to the approach from
    // https://github.com/podefr/react-debounce-render, except as a component
    // instead of an HOC.
    public updateDebounced: DebouncedFunc<() => void>

    constructor(props: DebounceRenderProps) {
        super(props)
        this.updateDebounced = debounce(
            this.forceUpdate,
            props.wait ?? 170,
            props.options ?? {
                leading: true,
                trailing: true,
                maxWait: 300,
            },
        )
    }

    shouldComponentUpdate() {
        this.updateDebounced()
        return false
    }

    componentWillUnmount() {
        this.updateDebounced.cancel()
    }

    render() {
        return this.props.children
    }
}
