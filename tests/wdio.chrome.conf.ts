import { config as sharedConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: ['--start-maximized'],
          prefs: {
            'download.default_directory': downloadDir,
            directory_upgrade: true,
            prompt_for_download: false,
          },
        },
      },
    ],
  },
  specs: [
    './test/specs/v1.0.0/siteIdSearch/*.ts',
    './test/specs/v1.0.0/synopsisReport/*.ts',
    './test/specs/v1.0.0/detailedReport/*.ts',
  ],
  suites: {
    v100: [
      './test/specs/v1.0.0/siteIdSearch/*.ts',
      './test/specs/v1.0.0/synopsisReport/*.ts',
      './test/specs/v1.0.0/detailedReport/*.ts',
    ],
  },
  specFileRetries: 0,
  mochaOpts: { bail: true, timeout: 20000 },
};
