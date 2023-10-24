import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.familybudget.app',
  appName: 'Family Budget',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
