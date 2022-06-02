import Logo from '../icons/icon48.png'

const configOptions = {
  // storybook
  development: {
    logoPath: Logo,
    version: '0.0.0',
    versionUrl: 'https://github.com/drewrodrigues/blocky',
  },
  // packaged and used in chrome
  production: () => {
    const version = chrome.runtime.getManifest().version

    return {
      logoPath: chrome.runtime.getURL('./icons/icon48.png'),
      version,
      versionUrl: `https://github.com/drewrodrigues/blocky/releases/tag/${version}`,
    }
  },
}

export const CONFIG =
  (process.env.ENV as string) === 'production'
    ? configOptions.production()
    : configOptions.development
