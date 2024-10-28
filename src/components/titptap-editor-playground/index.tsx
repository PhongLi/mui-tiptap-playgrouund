'use client'

import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import TextFields from '@mui/icons-material/TextFields'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'

import MenuButton from '@/controls/MenuButton'
import ImageBubbleMenu from '@/extensions/Image/ImageBubbleMenu'
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
    '<div data-type="d-block"> <h2 style="margin-left: 0px!important; text-align: center">Welcome to Your New Editor!</h2> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;">Explore the possibilities with <code>mui-tiptap-playground!</code> This editor merges the power of <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with the customizable designs of <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a>, providing a seamless experience for all your content needs. </p> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;"></p> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;">Add rich text formatting to give your content personality. Here’s what you can do:</p> </div> <div data-type="d-block"> <ul> <li> <p style="margin-left: 0px!important;"> <strong>Bold</strong>, <em>italic</em>, <u>underline</u>, and even <s>strikethrough</s> your text! </p> </li> <li> <p style="margin-left: 0px!important;">Use mentions like <span class="mention" data-type="mention" data-id="20" data-label="Lenny">@Lenny</span> to include people in your text. </p> </li> <li> <p style="margin-left: 0px!important;"> <mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">Create clean,</mark> <span style="font-family: monospace">s</span> <span style="font-family: monospace">tructured lists and add emphasis where needed.</span> </p> </li> </ul> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;"></p> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;">Get more technical with code blocks. Here’s a quick example:</p> </div> <div data-type="d-block"> <pre> <code class="language-css">   h1 { color: #3498db; }   </code> </pre> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;"></p> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;">Organize your content with images and tables for greater clarity.</p> </div> <div data-type="d-block"> <div style="text-align: center;" class="image"> <img height="auto" src="https://picsum.photos/400/300" alt="Example image" width="500" align="center"> </div> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;"></p> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;">Need to lay out data? Try using a table:</p> </div> <div data-type="d-block"> <div class="tableWrapper"> <table style="min-width: 75px"> <tbody> <tr> <th colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Name</p> </th> <th colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Role</p> </th> <th colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Team</p> </th> </tr> <tr> <td colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Charlie</p> </td> <td colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Engineer</p> </td> <td colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Backend</p> </td> </tr> <tr> <td colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Daisy</p> </td> <td colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">Designer</p> </td> <td colspan="1" rowspan="1"> <p style="margin-left: 0px!important;">UI/UX</p> </td> </tr> </tbody> </table> </div> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;"> <br> <br>Create and track to-dos with checkable lists: </p> </div> <div data-type="d-block"> <ul data-type="taskList"> <li data-checked="true" data-type="taskItem"> <label> <input type="checkbox" checked="checked"> <span></span> </label> <div> <p style="margin-left: 0px!important;">Finish project overview</p> </div> </li> <li data-checked="false" data-type="taskItem"> <label> <input type="checkbox"> <span></span> </label> <div> <p style="margin-left: 0px!important;">Review design drafts</p> </div> </li> </ul> </div> <div data-type="d-block"> <blockquote> <p style="margin-left: 0px!important;">“This editor is truly versatile! It has everything I need.” <br>— User </p> </blockquote> </div> <div data-type="d-block"> <p style="margin-left: 0px!important;">Have fun experimenting with all the features!</p> </div>'

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
                            <ImageBubbleMenu />
                        </>
                    )}
                </RichTextEditor>
            </Box>
            <DOMViewer htmlString={DOMContent} />
        </Container>
    )
}

export default TiptapEditorPlayground
