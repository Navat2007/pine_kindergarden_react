let timer
let latestTouchTap = { time: 0, target: null }

export default function withSupportDoubleClick({ onDoubleClick = () => {}, onSingleClick = () => {} }, maxDelay = 250) {
    return (event, data) => {
        clearTimeout(timer)

        const touchTap = { time: new Date().getTime(), target: event.currentTarget }

        const isDoubleClick =
            touchTap.target === latestTouchTap.target && touchTap.time - latestTouchTap.time < maxDelay

        latestTouchTap = touchTap

        timer = setTimeout(() => {
            if (isDoubleClick) onDoubleClick(event, data)
            else onSingleClick(event, data)
        }, maxDelay)
    }
}