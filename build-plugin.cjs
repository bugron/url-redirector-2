const { execSync } = require('child_process')

module.exports = class BuildExtensionPlugin {
  constructor() {
    this.name = 'build extension'
  }

  /**
   * Tap into auto plugin points.
   * @param {import('@auto-it/core').default} auto
   */
  apply(auto) {
    auto.hooks.afterVersion.tapPromise(this.name, async ({ dryRun }) => {
      if (!dryRun) {
        const version = await auto.git.getLatestTagInBranch()
        auto.logger.log.info(`Building and zipping extension ${version}...`)
        await execSync('pnpm zip')
      }
    })
  }
}
