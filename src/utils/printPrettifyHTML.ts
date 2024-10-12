export default function printPrettyHTML(str: string) {
    const div = document.createElement('div')
    div.innerHTML = str.trim()
    return prettifyHTML(div, 0).innerHTML
}

function prettifyHTML(node: Element, level: number) {
    const indentBefore = new Array(level++ + 1).join('  ')
    const indentAfter = new Array(level - 1).join('  ')
    let textNode

    for (let i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode('\n' + indentBefore)
        node.insertBefore(textNode, node.children[i])
        prettifyHTML(node.children[i], level)
        if (node.lastElementChild === node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter)
            node.appendChild(textNode)
        }
    }

    return node
}
