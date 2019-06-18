const JsqlConfig = require('jsql-node-plugin').JsqlConfig;
const Jsql = require('jsql-node-plugin').Jsql;

const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const jsqlConfig = new JsqlConfig({
    apiKey: "dawid.senko@jsql.it",
    devKey: "production-dawid.senko@jsql.it",
    providerUrl: "https://test-provider.jsql.it"
});

app.post('/api/jsql/select', (req, res) => {
    Jsql.select(req, res, jsqlConfig);
});

app.post('/api/jsql/delete', (req, res) => {
    Jsql.delete(req, res, jsqlConfig);
});

app.post('/api/jsql/update', (req, res) => {
    Jsql.update(req, res, jsqlConfig);
});

app.post('/api/jsql/insert', (req, res) => {
    Jsql.insert(req, res, jsqlConfig);
});

app.post('/api/jsql/rollback', (req, res) => {
    Jsql.rollback(req, res, jsqlConfig);
});

app.post('/api/jsql/commit', (req, res) => {
    Jsql.commit(req, res, jsqlConfig);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));