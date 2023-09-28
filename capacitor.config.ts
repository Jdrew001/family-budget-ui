import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'family-budget-ui',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      "launchAutoHide": false,
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
