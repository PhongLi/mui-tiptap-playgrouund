import { alpha } from '@mui/material/styles'

const GREY = {
  0: '#FFFFFF',
  100: '#F8FAFD',
  200: '#F0F6FF',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#A6B0C3',
  600: '#58667E',
  700: '#323546',
  800: '#21232E',
  800_2: '#171924',
  900: '#16181A',
  500_8: alpha('#A6B0C3', 0.08),
  500_12: alpha('#A6B0C3', 0.12),
  500_16: alpha('#A6B0C3', 0.16),
  500_24: alpha('#A6B0C3', 0.24),
  500_32: alpha('#A6B0C3', 0.32),
  500_48: alpha('#A6B0C3', 0.48),
  500_56: alpha('#A6B0C3', 0.56),
  500_80: alpha('#A6B0C3', 0.8)
}

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

const PRIMARY = {
  lighter: '#EBEFFE',
  light: '#9DB1FB',
  main: '#3961F8',
  dark: '#093AEC',
  darker: '#03134F',
  contrastText: '#fff'
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',      
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff'
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800]
}
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800]
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff'
}

const RED = {
  lighter: '#FFE3D5',
  light: '#FFC1AC',
  main: '#FF3030',
  dark: '#B71833',
  darker: '#7A0930',
  contrastText: '#fff'
}

const ORANGE = {
  lighter: '#FEF4D4',
  light: '#FED680',
  main: '#FDA92D',
  dark: '#B66816',
  darker: '#793908',
  contrastText: GREY[800]
}

const GREEN = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff'
}

const BLUE = {
  lighter: '#EBEFFE',
  light: '#9DB1FB',
  main: '#3961F8',
  dark: '#093AEC',
  darker: '#03134F',
  contrastText: '#fff'
}

const VIOLET = {
  lighter: '#f3ebfe',
  light: '#BA96FF',
  main: '#893FFA',
  dark: '#5b06db',
  darker: '#290363',
  contrastText: '#fff'
}

const BROWN = {
  main: '#F3B77E'
}

const PINK = {
  main: '#E654E0'
}

const YELLOW = {
  light: '#FFF896',
  main: '#F7E016'
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
}

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],

  orange: [ORANGE.main, ORANGE.light],
  brown: [BROWN.main],
  pink: [PINK.main]
}

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  red: { ...RED },
  orange: { ...ORANGE },
  green: GREEN,
  blue: { ...BLUE },
  violet: { ...VIOLET },
  brown: { ...BROWN },
  pink: { ...PINK },
  yellow: { ...YELLOW },
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_16],
  action: {
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48
  }
};

const palette = {
  light: {
    ...COMMON,
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: GREY[0], default: COMMON.common.white, neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action }
  },
  dark: {
    ...COMMON,
    text: { primary: GREY[0], secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action }
  }
}

export default palette
