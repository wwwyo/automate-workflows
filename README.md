# 開発環境構築

```bash
$ cd work dir
$ npm i
$ npm run start:dev
```

# deploy

環境変数は cloud run 上に配置

```bash
$ gcloud projects list
$ gcloud config set project <project id>
$ npm run deploy
```

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
