name: Heroku Deploy CI

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: deploy

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v3

      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: kfg-substitutions-demo
          heroku_email: ${{secrets.HEROKU_EMAIL}}
          branch: main
        env:
          HD_STAGE: ${{secrets.ENV_STAGE}}
          HD_API_BASE_URL: ${{secrets.ENV_API_BASE_URL}}
          HD_ADMIN_LOGIN_EMAIL: ${{secrets.ENV_ADMIN_LOGIN_EMAIL}}
          HD_ADMIN_LOGIN_PASSWORD: ${{secrets.ENV_ADMIN_LOGIN_PASSWORD}}
          HD_ADMIN_LOGIN_TOKEN: ${{secrets.ENV_ADMIN_LOGIN_TOKEN}}