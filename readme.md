# react-typescript-sfdx

Demo showing how to use typescript to create client side react apps in Salesforce Visualforce pages

## setup

### sfdx cli

SFDX is used to compile and push metadata to salesforce. Optionally, you can develop against scratch orgs.

1. install the [sfdx cli](https://developer.salesforce.com/tools/sfdxcli)

1. authorize a dev org `sfdx force:auth:web:login -a dev --setdefaultusername`

### install

1. clone

1. cd

1. `npm install`

### build

#### non-scratch org

1. `npm run deploy-dev`

#### scratch org

1. `run new-scratch-org`
1. `npm run deploy-scratch`

## develop

### on salesforce

1. navigate to: `[ORG]/apex/app`

1. start webpack-dev-server: `npm start run`

1. append `?local=1` url.  Might need to allow invalid ssl for the first time on the js file (look in source for app.js, open it in browser, tell chrome to fuck off)

1. change something & save

1. page will be updated

### locally

When working locally we can take advantage of HMR.

***Note: if you use `@RemoteActions` or `RemoteObjects` local dev will not work without mocking them out***

1. `npm run start-local`

### connecting with SF API

`webpack.locl.config.js` is currently setup to inject global vars need to connect to the REST API.  If you inject additional vars into your visual force page, you'll need to add these to the `webpack.DefinePlugin` section.

```javascript
new webpack.DefinePlugin( //inject global
{
    '__ACCESSTOKEN__': JSON.stringify(orgInfo.result.accessToken),
    '__RESTHOST__':JSON.stringify('https://dry-taiga-29622.herokuapp.com')
}),
```

#### `__ACCESSTOKEN__`

In order to make API requests against salesforce, we first need a access token.  Luckily we can easily obtain this using `sfdx force:org:display --json`.

```javascript
var orgInfo = JSON.parse(child_process.execSync("sfdx force:org:display --json").toString('utf8'));
```

#### `__RESTHOST__` (CORS proxy)

It order to make API requests to salesforce we need to allow CORS.  We can't modify the headers on salesforce (doh), but we can create a proxy and route our requests through it.
The [sf-cors-proxy](https://github.com/jamesward/sf-cors-proxy) app does exactly this. Only takes a couple minutes to setup if you already have heroku cli.

You don't need to set anything for this value in your Visualforce page since we can use relative paths.

***WARNING:  This is defaulted to a heroku instance I'm running.  YOU ARE WELCOME TO SEND YOUR REQUEST THROUGH MY PROXY, BUT YOU REALLY SHOULD CREATE YOUR OWN! THIS WHOLE REPO COULD JUST BE A PLOY FOR ME TO STEAL YOUR DATA!!!! SHOULD NEVER RUN IN LOCAL MODE WHEN CONNECTED WITH PRODUCT!!!!***

### switching between dev and scatch

The by default, the API token will default to pull from the `dev` user.  You can change where the access token is pull from by running one of these commands:

```
npm run make-dev-default
npm run make-scratch-default
npm run make-prod-default
```

***Note: Developing against prod is NOT RECOMMENDED!!! I only added it for emergancy usecases where you need to debug a production issue.  DONT BE DUMB!!!***

## release

1. authorize a production org `sfdx force:auth:web:login -a production`

1. `npm run deploy-prod`

1. drink beer ;)

## todo

- Make react example more complete
- create production webpack config
- move SObject client classes to their own package
  - add bulk API support
  - add RemoteAction support
  - add code gen tool to generate sObject types from meta-data API
