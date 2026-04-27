[![npm](https://img.shields.io/npm/v/blip-components.svg)](https://www.npmjs.com/package/blip-components)

# (DEPRECATED) blip-components

> **This library is deprecated.** No new features will be added. The repository is maintained solely for security patches and critical bug fixes in applications that still depend on it. New projects should not use this library.

A library of shared UI components built for AngularJS (1.x) applications used across the BLiP portal. It wraps and extends components from [blip-toolkit](https://github.com/takenet/blip-toolkit) and [blip-ds](https://github.com/takenet/blip-ds) in Angular-compatible wrappers.

## Running locally

To run blip-components on your machine:

```sh
npm link
npm run build
```

Then, in the project that consumes this library:

```sh
npm link blip-components
```

Re-run `npm run build` after any change to this library.

## Usage

Install via npm:

```sh
npm install blip-components
```

Import the full module in your AngularJS application:

```js
import * as blipComponents from 'blip-components';
import 'blip-components/dist/blip-components.css';

const componentNames = components =>
    Object.keys(components).map(c => components[c]);

const app = angular
    .module('myApp', [
        ...componentNames(blipComponents)
    ]);
```

Or import individual components:

```js
import { BlipInputComponent } from 'blip-components';
import 'blip-components/dist/blip-components.css';

const app = angular
    .module('myApp', [
        BlipInputComponent
    ]);
```

Remember to import the CSS file to style your components.

## Building

Clone the repository and, from the root directory, run:

```sh
npm start
```

This starts a development server on port `3000` with file watching enabled.

To produce a production build:

```sh
npm run build
```

## Committing

This project uses [Commitizen](https://github.com/commitizen/cz-cli) and conventional commits. Run:

```sh
npm run commit
```

This guides you through the commit message format interactively.

To report a bug or security issue, please open a [GitHub issue](https://github.com/takenet/blip-components/issues).

## License

`blip-components` is under the [ISC license](https://opensource.org/licenses/ISC).

