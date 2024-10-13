import { Node } from '@tiptap/core'

const Document = Node.create({
    name: 'doc',

    topNode: true,

    content: 'dBlock+',
})
export default Document
