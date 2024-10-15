'use client'

import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import TextFields from '@mui/icons-material/TextFields'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'

import MenuButton from '@/controls/MenuButton'
import LinkBubbleMenu from '@/extensions/Link/LinkBubbleMenu/LinkBubbleMenu'
import TableBubbleMenu from '@/extensions/Table/TableBubbleMenu'
import useExtensions from '@/hooks/useExtensions'
import printPrettyHTML from '@/utils/printPrettifyHTML'

import type { RichTextEditorRef } from '../RichTextEditor'
import RichTextEditor from '../RichTextEditor'
import { DOMViewer } from './parts/DOMViewer'
import EditorMenuControls from './parts/EditorMenuControl'
import { SourceGithub } from './parts/SourceGithub'

const exampleContent =
    '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>'

function TiptapEditorPlayground(): JSX.Element {
    const rteRef = useRef<RichTextEditorRef>(null)

    const [isEditable, setIsEditable] = useState(true)
    const [showMenuBar, setShowMenuBar] = useState(true)
    const initialDOMContent = printPrettyHTML(exampleContent)
    const [DOMContent, setDOMContent] = useState(initialDOMContent)

    const extensions = useExtensions({
        placeholder: 'Add your own content here...',
    })

    return (
        <Container sx={{ mt: 2, pb: 10 }}>
            <SourceGithub url='https://github.com/PhongLi/mui-tiptap-playground' />
            <Typography
                variant='h3'
                sx={{ textAlign: 'center', fontWeight: 'bold', my: 4 }}
            >
                Tiptap Editor Playground
            </Typography>

            <Box>
                <RichTextEditor
                    ref={rteRef}
                    extensions={extensions}
                    content={exampleContent}
                    editable={isEditable}
                    // editorProps={{
                    //     handleDrop: handleDrop,
                    //     handlePaste: handlePaste,
                    // }}
                    renderControls={() => <EditorMenuControls />}
                    RichTextFieldProps={{
                        variant: 'outlined',
                        MenuBarProps: {
                            hide: !showMenuBar,
                        },
                        footer: (
                            <Stack
                                direction='row'
                                spacing={2}
                                sx={{
                                    borderTopStyle: 'solid',
                                    borderTopWidth: 1,
                                    borderTopColor: theme =>
                                        theme.palette.divider,
                                    py: 1,
                                    px: 1.5,
                                }}
                            >
                                <MenuButton
                                    value='menubar'
                                    tooltipLabel={
                                        showMenuBar
                                            ? 'Hide menubar'
                                            : 'Show menubar'
                                    }
                                    size='small'
                                    onClick={() =>
                                        setShowMenuBar(
                                            currentState => !currentState,
                                        )
                                    }
                                    selected={showMenuBar}
                                    IconComponent={TextFields}
                                />

                                <MenuButton
                                    value='mode'
                                    tooltipLabel={
                                        isEditable
                                            ? 'Prevent edits (use read-only mode)'
                                            : 'Allow edits'
                                    }
                                    size='small'
                                    onClick={() =>
                                        setIsEditable(
                                            currentState => !currentState,
                                        )
                                    }
                                    selected={!isEditable}
                                    IconComponent={
                                        isEditable ? LockIcon : LockOpenIcon
                                    }
                                />
                            </Stack>
                        ),
                    }}
                    onUpdate={({ editor }) => {
                        const htmlString = printPrettyHTML(editor.getHTML())
                        setDOMContent(htmlString)
                    }}
                >
                    {() => (
                        <>
                            <LinkBubbleMenu />
                            <TableBubbleMenu />
                        </>
                    )}
                </RichTextEditor>
            </Box>
            <DOMViewer htmlString={DOMContent} />
        </Container>
    )
}

export default TiptapEditorPlayground
