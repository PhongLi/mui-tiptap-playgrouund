import type { Theme } from '@mui/material/styles';
import { darken } from '@mui/material/styles'
import { omit } from 'lodash'

import { DARK } from '@/constants/theme'

export default function CssBaseline(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: '100%',
          height: '100%',
          msTextSizeAdjust: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.grey[300]
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
            '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' }
          }
        },
        textarea: {
          '&::-webkit-input-placeholder': { color: theme.palette.text.disabled },
          '&::-moz-placeholder': { opacity: 1, color: theme.palette.text.disabled },
          '&:-ms-input-placeholder': { color: theme.palette.text.disabled },
          '&::placeholder': { color: theme.palette.text.disabled }
        },
        a: { color: theme.palette.primary.main },
        img: { display: 'block', maxWidth: '100%' },   
        /* TipTap editor styles */
        '& .ProseMirror': {
          '&:focus': {
            outline: 'none'
          },
          '& p:empty::before': {
            content: '""',
            display: 'inline-block'
          },

          '& h1': {
            ...omit(theme.typography.h3, ['lineHeight']),
            fontWeight: 700
          },
          '& h2': {
            ...omit(theme.typography.h4, ['lineHeight']),
            fontWeight: 700
          },
          '& h3': {
            ...omit(theme.typography.h5, ['lineHeight']),
            fontWeight: 700
          },

          '& h4': {
            ...omit(theme.typography.h6, ['lineHeight'])
          },

          '& h5': {
            ...omit(theme.typography.subtitle1, ['lineHeight'])
          },

          '& h1, & h2': {
            marginBottom: `${theme.spacing(2.2)}`,
            marginTop: `${theme.spacing(2.2)}`,
            lineHeight: 'normal'
          },
          '& h3, & h4, & h5, & h6': {
            marginTop: `${theme.spacing(1.6)}`,
            marginBottom: `${theme.spacing(1.2)}`,
            lineHeight: 'normal'
          },
          '& p': {
            ...theme.typography.body1,
            marginBottom: `${theme.spacing(2.1)} !important`,
            marginTop: `0px !important`
          },

          '& ul, & ol': {
            marginBlockStart: 0,
            marginBlockEnd: 0,
            paddingInlineStart: theme.spacing(5)
          },

          '& ol': {
            listStyleType: 'decimal',
            '& ol': {
              listStyleType: 'lower-alpha',
              '& ol': {
                listStyleType: 'lower-roman',
                '& ol': {
                  listStyleType: 'decimal',
                  '& ol': {
                    listStyleType: 'lower-alpha',
                    '& ol': {
                      listStyleType: 'lower-roman'
                    }
                  }
                }
              }
            }
          },

          '& ul': {
            listStyleType: 'disc',
            '& ul': {
              listStyleType: 'circle',
              '& ul': {
                listStyleType: 'square',
                '& ul': {
                  listStyleType: 'disc',
                  '& ul': {
                    listStyleType: 'circle',
                    '& ul': {
                      listStyleType: 'square'
                    }
                  }
                }
              }
            }
          },

          '& ul[data-type="taskList"]': {
            listStyle: 'none',
            padding: 0,
            '& li': {
              display: 'flex',

              '& > label': {
                flex: '0 0 auto',
                marginRight: '0.5rem',
                userSelect: 'none'
              },

              '& > div': {
                flex: '1 1 auto'
              }
            }
          },

          '& blockquote': {
            paddingLeft: '1rem',
            marginInlineStart: theme.spacing(1.2),
            marginInlineEnd: theme.spacing(1),
            position: 'relative', // This allows us to use a pseudo-element with absolute positioning inside

            '&:before': {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              display: 'block',
              width: 4,
              borderRadius: theme.shape.borderRadius,
              background: theme.palette.primary.main,
              content: '""'
            }
          },

          '& :not(pre) > code': {
            padding: '2px 3px 1px',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            borderRadius: 3,
            backgroundColor: theme.palette.action.hover,
            color:
              theme.palette.mode === 'dark' ? theme.palette.secondary.main : darken(theme.palette.secondary.dark, 0.1)
          },

          '& pre': {
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
            padding: theme.spacing(1),
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            borderRadius: theme.shape.borderRadius,
            background: theme.palette.action.hover,
            lineHeight: 1.4,
            overflowX: 'auto',
            whiteSpace: 'pre !important'
          },

          '& hr': {
            borderWidth: 0,
            borderTopWidth: 'thin',
            borderStyle: 'solid',
            borderColor: theme.palette.text.secondary,
            margin: theme.spacing(2, 0),
            '&.ProseMirror-selectednode': {
              borderColor: theme.palette.primary.main
            }
          },

          '& strong': {
            fontWeight: '700'
          },

          '& figure': {
            '& img': {
              display: 'inline-block',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius
            }
          },

          '& figure[data-youtube-video]': {
            paddingBottom: theme.spacing(2),
            textAlign: 'center',
            '& iframe': {
              aspectRatio: '16/9',
              width: '100%',
              height: 'auto',
              maxWidth: '80%',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius
            },
            '&.ProseMirror-selectednode > iframe': {
              transition: `outline .15s ease-in-out`,
              outline: `2px solid ${theme.palette.primary.main}`
            }
          },

          '& p.is-editor-empty:first-of-type::before': {
            color: theme.palette.text.disabled,
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            pointerEvents: 'none'
          },

          '& .ProseMirror-gapcursor:after': {
            borderColor: theme.palette.text.primary
          },
          '& table': {
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            margin: 0,
            overflowY: 'hidden',
            overflowX: 'auto',
            display: 'block',
            width: '100%',

            '& td, th': {
              minWidth: '1em',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: theme.palette.mode === DARK ? theme.palette.grey[500] : theme.palette.grey[400],
              padding: '3px 5px',
              verticalAlign: 'top',
              boxSizing: 'border-box',
              position: 'relative',

              '& > *': {
                marginBottom: '0px !important'
              }
            },

            '& th': {
              fontWeight: 500,
              textAlign: 'left',
              backgroundColor: theme.palette.action.selected
            }
          },

          '& .tableWrapper': {
            overflowX: 'auto',

            '& table': {
              overflow: 'hidden',
              display: 'table'
            }
          },

          '& .selectedCell:after': {
            zIndex: 1,
            position: 'absolute',
            content: '""',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: 'rgba(200, 200, 255, 0.4)',
            pointerEvents: 'none'
          },

          '&[contenteditable="true"]': {
            '& .column-resize-handle': {
              position: 'absolute',
              right: -2,
              top: -1,
              bottom: -2,
              width: 4,
              zIndex: 1,
              backgroundColor: theme.palette.primary.light,
              pointerEvents: 'none'
            },

            '&.resize-cursor': {
              cursor: 'col-resize'
            }
          },

          '&[contenteditable="false"]': {
            '& .column-resize-handle': {
              display: 'none'
            },
            '&.resize-cursor': {
              pointerEvents: 'none'
            }
          },

          '& .img-placeholder': {
            position: 'relative',
            display: 'inline-block',

            '& .img-loading': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          },

          '& .details': {
            display: 'flex',
            marginBottom: theme.spacing(2.5),
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
            padding: theme.spacing(1),
            background: theme.palette.mode === DARK ? theme.palette.grey[800] : theme.palette.grey[200],

            '& > button': {
              display: 'flex',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              padding: 0,
              '&::before': {
                content: '"\\25B6"',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '1.5rem',
                height: '1.5rem',
                color: theme.palette.text.primary
              }
            },
            '&.is-open > button::before': {
              content: '"\\25BC"'
            },
            '& > div': {
              flex: '1 1 auto'
            },
            '&:last-child': {
              marginBottom: 0
            }
          }
        }
      }
    }
  }
}
