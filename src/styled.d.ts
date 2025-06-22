import 'styled-components';



declare module 'styled-components' {
  export interface DefaultTheme {
    red: string;
    black: {
      light: string;
      dark: string;
      heavy: string;
    };
    white: {
      light: string;
      dark: string;
      heavy: string;
    };
  }
}