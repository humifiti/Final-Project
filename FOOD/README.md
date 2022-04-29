# Getting Started with BaseReactNativeApp v 1.0

## Required
* Node.js version - v14.16.1+

## Available Scripts

This project runs only via **yarn** scripts, **DO NOT** use `npm install` or `npm run start` commands.

Please keep that there should not be package-lock.json file - only yarn.lock.

In the project directory,

### `yarn install ` or ### `yarn`

Installs all necessary dependencies from package.json and yarn.lock

### `yarn ios`

Runs the app in the development mode on IOS Simulator.\

Remember to  install all pods stuff in `ios` folder by `pod install` commands.



### `yarn android`

Runs the app in the development mode on android Simulator.\


## Deployment flow

1. `yarn build`
2. `yarn deloy`

## .env variables

There is an `.env.dist` file in the repository. Use it as a template, **all env** variables\
should be described there.

## Eslint + prettier

Make sure to set up your Code editor eslint settings accordingly to `eslintrc.js` and `prettierrc` files.

`husky & lint-staged` are set up on the project and run before each commit to apply prettier rules to changed files.

### _If there is at least 1 warning from Eslint, you will not be able to commit changes._

## Technologies

1. **React** - core - Functional Components
3. **Redux** - state management
4. **Axios/Redux-toolkits/redux-thunk** - async state management
5. **Eslint + Prettier** - code style management
6. **React-hook-form** - build form

## Files structure overview

`src` - a root files directory. The project uses an absolute imports so make sure to import \
from `app/*` folders, for example:

- `import Button from '@components/buttons/Button'` - correct!
- `import Buttom from '../../../../../buttons/Button'` - incorrect!

`assets` - folder for assets (icons, images etc.).

`components` - reusable components. See below docs for components;

`hooks` - custom and reusable hooks for UI states or Redux+API usage;

`app` - Initial sources of application

`scripts` - containing auto script files for projects, please have a look at "package.json/script" for details

`redux` - Redux structure: slices including actions, selectors

`screens` - screens components that used in the Navigations;

`api` - axios API instance;

`theme` - responsive sizes, fonts and severals common colors using in the project

`utils` - useful tools;

## Git Flows

Our lastest version will sync on `master` branch
We working on our developments branch called `dev`

Always working on `dev` branch and checkout to other branch by `git checkout -b "branch name"`

Naming the branch following to this conventions :

- If you working on new features name it : `feature/**feature-name**`
- If you working on a bug fixing name it : `fix-bug/**issue-name**`

Always sync your onworking brach to `dev` branch . Always check sync status of your branch before and after working on issue , after and before push and pull sources

## Sources syntax

PLease enable your `Eslint` , `prettier` for safe code reviewing online and sync all sources together


## Support

UI and README is still in the progress, I'm (@Tristan / TrungNC) still working on missing pages and components. Please confirm and let me know if you need any missing or any change

Follow existing examples on finished pages, ask if you have any questions. I'll put all possible info and descriptions here with the time.

We will discuss it, or I will add/change it for you.