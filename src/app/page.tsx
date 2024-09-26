import dynamic from 'next/dynamic'
const TiptapEditorPlayground = dynamic(
    () => import('@/components/titptap-editor-playground'),
    { ssr: false },
)
export default function TiptapEditorPlaygroundPage() {
    return (
        <>
            <TiptapEditorPlayground />
        </>
    )
}
