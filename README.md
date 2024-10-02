
<a href="mui-tiptap-playground.vercel.app/">
  <img alt="MUI TIPTAP PLAYGROUND" src="https://raw.githubusercontent.com/PhongLi/mui-tiptap-playground/refs/heads/main/public/images/demo.png">
 <h1 align="center">MUI TIPTAP PLAYGROUND</h1>
</a>
<p align="center">
 <b>mui-tiptap-playgrouund</b>: A customizable <a href="https://mui.com/material-ui/getting-started/overview/">Material UI</a> styled WYSIWYG rich text editor, using <a href="https://tiptap.dev/">Tiptap</a>.
</p>

<br/>

## Introduction

[MUI TIPTAP PLAYGROUND](https://mui-tiptap-playground.onrender.com/) is a Editor with Styled based on your own MUI theme (colors, fonts, light vs dark mode, etc.).
Built on powerful Tiptap and ProseMirror foundations (extensible, real-time collaborative editing, cross-platform support, etc.)

<br />

## Setting Up Locally

To set up Novel locally, you'll need to clone the repository:
```
git clone https://github.com/PhongLi/mui-tiptap-playground.git
```
Go to the project directory
```
cd mui-tiptap-playground
```

To run the app locally, you can run the following commands:
```
yarn
yarn dev
```

## List of Features

- 😎 Built-in styles for Tiptap’s extensions (text formatting, lists, tables, Google Docs-like collaboration cursors; you name it!)
- ▶️ Composable and extendable menu buttons and controls for the standard Tiptap extensions
- 🖼️ ResizableImage extension for adding and resizing images directly in the editor
- ⚓ HeadingWithAnchor extension for dynamic GitHub-like anchor links for every heading you add
- 🔗 LinkBubbleMenu so adding and editing links is a breeze
- 🔢 FontSize extension for controlling text sizes
- 🔳 TableImproved extension that fixes problems in the underlying Tiptap Table extension
- 📝 TableBubbleMenu for interactively editing your rich text tables
- 💬 General-purpose ControlledBubbleMenu for building your own custom menus, solving some shortcomings of the Tiptap BubbleMenu

## Upcoming

- [ ] Image, Video Upload
- [ ] Import and Export Word, Pdf
- [ ] Excalidraw: allows you to add an Excalidraw to your editor
- [ ] Katex: allows you to add Katex math equations
- [ ] Table Of Contents
- [ ] Attachment
- [ ] Search And Replace

## Tech Stack

mui-tiptap-playground is built on the following stack:

- [Next.js](https://nextjs.org/) – Framework
- [Tiptap](https://tiptap.dev/) – Text editor
- [MUI](https://mui.com/) - Material UI: React components

