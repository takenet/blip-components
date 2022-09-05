[![npm](https://img.shields.io/npm/v/blip-components.svg)](https://www.npmjs.com/package/blip-components)

# (DEPRECATED) blip-components

BLiP components to use in AngularJS (1.x) applications. 


## How run components in local machine

To run blip-components on your machine, you need to follow these steps:
`npm link` - this command will run npm install and also generate the local library on your machine.
After that, it is necessary to run the command `npm run build` a first time and for each change that is made.

In the project where this library is being used, it's necessary to run the command `npm link blip-components` and then run the project normally.

## Usage

Install blip-components via npm:

```
$ npm install blip-components
```

Then, use it as module on your angularjs application

```
import * as blipComponents from 'blip-components';
import 'blip-components/dist/blip-components.css';

const componentNames = components =>
    Object.keys(components).map(c => components[c]);

const app = angular
    .module('myApp', [
        ...componentNames(blipComponents)
    ])
    ...
```

You can also use each component separately

```
import { BlipInputComponent } from 'blip-components';
import 'blip-components/dist/blip-components.css';

const app = angular
    .module('myApp', [
        BlipInputComponent
    ])
    ...
```

Remeber to import the css file to style your components

## Building

If you want to contribute to our project, clone this project and, on root directory, run `npm start`. A new process will be started
on port `3000`, and all changes will be tracked. 

To finish a build, run `npm run build`.

## Want to contribute?

If you want to do a commit, all you need to do is run `npm run commit` and you will get the prompts needed to start a commit!

Follow contributing guidelines as [described here](CONTRIBUTING.md)

## License
`blip-components` is under the [ISC license](https://opensource.org/licenses/ISC).


