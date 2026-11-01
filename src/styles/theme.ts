import { ThemeConfig } from 'antd';

export const customAntdTheme: ThemeConfig = {
  token: {
    // Brand Colors
    colorPrimary: '#A62650', // Rich raspberry blush matching ShyRe brand
    colorInfo: '#C48A5E', // Warm champagne gold
    colorSuccess: '#4E7D5B',
    colorWarning: '#D49B45',
    colorError: '#C13030',
    colorBgBase: '#FBF9F5', // Soft editorial cream
    colorTextBase: '#181716', // Deep charcoal
    colorBorder: '#E6E2DC',
    colorBorderSecondary: '#F0ECE6',

    // Typography
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSizeHeading1: 44,
    fontSizeHeading2: 32,
    fontSizeHeading3: 24,
    fontSizeHeading4: 18,
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: '#181716',
      colorPrimaryHover: '#A62650',
      colorPrimaryActive: '#821B3C',
      borderRadius: 999, // Pill shaped luxury buttons
      controlHeight: 46,
      fontSize: 14,
      fontWeight: 500,
      defaultBorderColor: '#D8D4CC',
      defaultColor: '#181716',
      defaultHoverBg: '#F3EFE9',
      defaultHoverBorderColor: '#181716',
      defaultHoverColor: '#181716',
    },
    Input: {
      colorBgContainer: 'transparent',
      borderRadius: 0,
      activeBorderColor: '#A62650',
      hoverBorderColor: '#181716',
      colorBorder: '#D8D4CC',
      paddingInline: 12,
      paddingBlock: 12,
      controlHeight: 48,
    },
    Select: {
      colorBgContainer: 'transparent',
      borderRadius: 4,
      controlHeight: 46,
      colorPrimary: '#A62650',
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      colorBorderSecondary: 'transparent',
      borderRadiusLG: 16,
      boxShadowTertiary: '0 8px 30px rgba(0, 0, 0, 0.04)',
    },
    Badge: {
      colorPrimary: '#A62650',
    },
    Tag: {
      borderRadiusSM: 999,
      defaultBg: '#F3EFE9',
      defaultColor: '#5C5854',
    },
  },
};
