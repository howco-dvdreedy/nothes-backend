### Prerequisites

Run the following command to install dependencies:

```shell
npm install
```

### Environment variables

This project depends on some environment variables.
If you are running this project locally, create a `.env` file at the root for these variables.
Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

```
DB_USER
DB_PASSWORD
```

### Run the project

Run the following command to run the project:

```shell
npx nx serve api
```


## Deplpyment methods

Api is currently running on windows server s-us-web02
To deploy new version
remote to s-us-web05
pm2 stop nothes
replace the dist folder in the nothes backend located in C/www/nothes
pm2 start ecosystem.config.js --env production 

to test
curl localhost:3000/api/approvers 
curl http://10.5.20.96/nothes/api/approvers

## logs
logs can be found in programdata/pm2/logs
