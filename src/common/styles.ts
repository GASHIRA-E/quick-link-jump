// ボタンの色設定
export const BUTTON_COLORS = {
  primary: { normal: '#007bff', hover: '#0056b3' },
  secondary: { normal: '#6c757d', hover: '#5a6268' },
  danger: { normal: '#dc3545', hover: '#c82333' }
} as const;

// ボタンのサイズ設定
export const BUTTON_SIZES = {
  small: { padding: '8px 12px', fontSize: '12px' },
  medium: { padding: '10px 20px', fontSize: '14px' },
  large: { padding: '12px 24px', fontSize: '16px' }
} as const;

// カードのパディング設定
export const CARD_PADDINGS = {
  small: '10px 20px',
  medium: '20px 30px',
  large: '30px 40px'
} as const;

// 共通の色設定
export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  danger: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  gray: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529'
  }
} as const;

// 共通のフォント設定
export const FONTS = {
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
} as const;

// 共通のスペーシング設定
export const SPACING = {
  xs: '5px',
  sm: '10px',
  md: '15px',
  lg: '20px',
  xl: '30px',
  xxl: '40px'
} as const;

// 共通のボーダー設定
export const BORDERS = {
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  width: {
    thin: '1px',
    normal: '2px',
    thick: '3px'
  }
} as const; 