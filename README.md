# `webdevandsausages.org`

The Web Dev and Sausages Tampere-based meetup website and registration service.

## Old versions

* [First version of the website](https://github.com/webDevAndSausages/webDevAndSausages.github.io)
* [Archived meetup stuff](https://github.com/webDevAndSausages/archivedMeetupStuff)
* [Development version](https://tasteless-drug.surge.sh/)

## Contributing

Thanks so much for lending a hand to improve our website by spotting bugs, fixing bugs, or adding new features. Please make an issue.

## Frontend

The frontend was created with the [Preact-cli](https://github.com/developit/preact-cli/blob/master/README.md).

### Running the frontend locally

```bash
git clone https://github.com/RikuVan/webdevandsausages.v2
# enter the frontend
cd webdevandsausages.v2/frontend

# install yarn globally if you do not have it already
yarn install
# serve with hot reload at localhost:8080
yarn run dev

# test the production build locally
# you must in stall the preact-cli globally on your computer
yarn run build
preact serve
```

The frontend uses a development firebase instance in when NODE_ENV="development".

## e2e tests

There are e2e tests under `test/e2e` that should pass before pushing to master:

```
yarn run test:e2e
```

## Backend

The backend, in Typescript, was created using the Firebase cli. There are two projects in firebase, one for production and one for development and testing.

### To get started

Each project requires its own account keys to be added: `functions/devServiceAccountKey.json` and `functions/prodServiceAccountKey.json`

To deploy to Firebase, you must have a project with a Firestore database enabled. A number of config variables need to be set with the cli using `firebase functions:config:set`.

```js
{
  "nexmo": {
    "api_secret": "<SECRET>",
    "api_key": "<API_KEY>"
  },
  "slack": {
    "url": "https://hooks.slack.com/services/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"
  },
  "googleapi": {
    "client_secret": "<SECRET>",
    "sheet_id": "<ID>",
    "client_id": "<ID>"
  },
  "sendgrid": {
    "key": "<API_KEY>"
  },
  "app": {
    "version": "dev/prod"
  }
}
```

## To deploy

Commits to master should trigger and automatic update to Firebase. To update the front or backend locally, You must have the Firebase CLI installed.

### Backend

```bash
firebase use default #firebase use test for dev backend
firebase deploy --only functions
```

### Frontend

```bash
cd frontend
yarn run build
firebase deploy --only hosting
```
