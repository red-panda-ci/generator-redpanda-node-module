[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

# generator-redpanda-node-module

## Installation

First, install [Yeoman](http://yeoman.io) and generator-redpanda-node-module using [npm](https://www.npmjs.com/) 

```bash
npm install -g generator-redpanda-node-module
```

Then generate your new project:

```bash
yo generator-redpanda-node-module
```
## Features

- Contributor [Covenant code of conduct](https://www.contributor-covenant.org/)
- Linter [Standard](https://standardjs.com/)  style
- [Commit validation](https://github.com/willsoto/validate-commit) with presets: eslint, angular, atom, ember
- [Changelog](https://github.com/conventional-changelog/conventional-changelog) creation
- [yargs](https://github.com/yargs/yargs) CLI support
- [Mocha](https://mochajs.org/) Test
- [nyc](https://github.com/istanbuljs/nyc) coverage
- [Coverage visualization](https://github.com/indexzero/http-server)
- [nsp](https://github.com/nodesecurity/nsp) known vulnerability check
- Github repo synchronization
- Jenkins integration
- Travis integration
- SonarQube support

# Publish 

Execute the command `npm run make:publish`
If UPDATE_GIT_BRANCHES is 'true' branches `develop` and `master` will be update in remote and local repo.

´´´bash
npm run make:publish <VERSION> <UPDATE_GIT_BRANCHES>

# Example: npm run make:publish 1.0.0 true

´´´

## License

MIT © [red-panda-ci](https://github.com/red-panda-ci)

[npm-image]: https://badge.fury.io/js/generator-redpanda-node-module.svg
[npm-url]: https://npmjs.org/package/generator-redpanda-node-module
[travis-image]: https://travis-ci.org/red-panda-ci/generator-redpanda-node-module.svg?branch=develop
[travis-url]: https://travis-ci.org/red-panda-ci/generator-redpanda-node-module
[daviddm-image]: https://david-dm.org/red-panda-ci/generator-redpanda-node-module.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/red-panda-ci/generator-redpanda-node-module
[coveralls-image]: https://coveralls.io/repos/red-panda-ci/generator-redpanda-node-module/badge.svg
[coveralls-url]: https://coveralls.io/r/red-panda-ci/generator-redpanda-node-module
