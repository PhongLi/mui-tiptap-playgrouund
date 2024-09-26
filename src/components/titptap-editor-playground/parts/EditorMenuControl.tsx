import { Divider } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import {
    MenuButtonAlignCenter,
    MenuButtonBlockquote,
    MenuButtonBold,
    MenuButtonBulletedList,
    MenuButtonHighlightColor,
    MenuButtonIndent,
    MenuButtonRedo,
    MenuButtonRemoveFormatting,
    MenuButtonStrikethrough,
    MenuButtonSubscript,
    MenuButtonSuperscript,
    MenuButtonTaskList,
    MenuButtonTextColor,
    MenuButtonUnderline,
    MenuButtonUndo,
    MenuButtonUnindent,
    MenuControlsContainer,
    MenuSelectFontFamily,
    MenuSelectFontSize,
    MenuSelectHeading,
    MenuSelectTextAlign,
} from '@/controls'

const MenuDivider = styled(props => (
    <Divider orientation='vertical' {...props} />
))(({ theme }) => ({
    height: 18,
    margin: theme.spacing(0, 0.5),
}))

export default function EditorMenuControls() {
    const theme = useTheme()
    return (
        <MenuControlsContainer>
            <MenuDivider />
            <MenuSelectHeading />
            <MenuDivider />

            <MenuSelectFontFamily
                options={[
                    { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
                    { label: 'Cursive', value: 'cursive' },
                    { label: 'Monospace', value: 'monospace' },
                    { label: 'Serif', value: 'serif' },
                ]}
            />
            <MenuDivider />

            <MenuSelectFontSize />
            <MenuDivider />
            <MenuButtonStrikethrough />

            <MenuButtonSubscript />

            <MenuButtonSuperscript />

            <MenuButtonBlockquote />
            <MenuButtonBold />
            <MenuButtonBulletedList />
            <MenuButtonTaskList />

            <MenuButtonUnderline />
            <MenuDivider />

            <MenuButtonIndent />
            <MenuButtonUnindent />

            <MenuSelectTextAlign />
            <MenuButtonAlignCenter />
            <MenuDivider />
            <MenuButtonTextColor
                defaultTextColor={theme.palette.text.primary}
                swatchColors={[
                    { value: '#000000', label: 'Black' },
                    { value: '#ffffff', label: 'White' },
                    { value: '#888888', label: 'Grey' },
                    { value: '#ff0000', label: 'Red' },
                    { value: '#ff9900', label: 'Orange' },
                    { value: '#ffff00', label: 'Yellow' },
                    { value: '#00d000', label: 'Green' },
                    { value: '#0000ff', label: 'Blue' },
                ]}
            />
            <MenuButtonHighlightColor
                swatchColors={[
                    { value: '#595959', label: 'Dark grey' },
                    { value: '#dddddd', label: 'Light grey' },
                    { value: '#ffa6a6', label: 'Light red' },
                    { value: '#ffd699', label: 'Light orange' },
                    // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
                    { value: '#ffff00', label: 'Yellow' },
                    { value: '#99cc99', label: 'Light green' },
                    { value: '#90c6ff', label: 'Light blue' },
                    { value: '#8085e9', label: 'Light purple' },
                ]}
            />
            <MenuDivider />
            <MenuButtonRemoveFormatting />
            <MenuDivider />

            <MenuButtonUndo />
            <MenuButtonRedo />
        </MenuControlsContainer>
    )
}
