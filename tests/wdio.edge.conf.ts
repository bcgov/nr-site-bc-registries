import { config as sharedConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'MicrosoftEdge',
        acceptInsecureCerts: true,
        'ms:edgeOptions': {
          args: ['--start-maximized'],
          // unfortunately these don't seem to work
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
  mochaOpts: { bail: true, timeout: 2000000 },
  waitforTimeout: 2000000,
};
