# migrate-gitbook-plugin-include-codeblock [![Build Status](https://travis-ci.org/azu/migrate-gitbook-plugin-include-codeblock.svg?branch=master)](https://travis-ci.org/azu/migrate-gitbook-plugin-include-codeblock)

Migration tool that convert exist markdown to v2 from v1.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install -g migrate-gitbook-plugin-include-codeblock

## Usage

You can specify target files by glob([node-glob](https://github.com/isaacs/node-glob "node-glob"))

    migrate-gitbook-plugin-include-codeblock "src/**/*.md"
    # all markdown file under the src directory

:warning: Please backup before migration :warning:

### Sample of result


```

[import, lang-typescript](path/to/code.ts)

=>

[import, lang-typescript, title:"code.ts"](path/to/code.ts)

```

```

[import](path/to/code.js)

=>

[import, title:"code.js"](path/to/code.js)

```

```

[import,](path/to/code.js)

=>

[import, title:"code.js"](path/to/code.js)

```

```

[import, code.js](path/to/code.js)

=>

[import, title:"code.js"](path/to/code.js)

```

```

[import, title](path/to/code.js)

=>

[import, title, title:"code.js"](path/to/code.js)

```

```

[include](path/to/code.js)

=>

[include, title:"code.js"](path/to/code.js)

```

```

[include:1-10](path/to/code.js)

=>

[include:1-10, title:"code.js"](path/to/code.js)

```

```

[include:1-10,code.js](path/to/code.js)

=>

[include:1-10,title:"code.js"](path/to/code.js)

```

```

[include](http://example.com/to/code.js)

=>

[include](http://example.com/to/code.js)

```

## Changelog

See [Releases page](https://github.com/azu/migrate-gitbook-plugin-include-codeblock/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.
For bugs and feature requests, [please create an issue](https://github.com/azu/migrate-gitbook-plugin-include-codeblock/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](http://twitter.com/azu_re)

## License

MIT © azu
