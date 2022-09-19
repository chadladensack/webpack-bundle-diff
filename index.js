const actionsCore = require('@actions/core');
const fetch = require('node-fetch');
const { diff, generateReport } = require('webpack-bundle-diff');

const fetchJson = async url => {
  const response = await fetch(url);
  return await response.json();
}

(async () => {
  try {
    const baselineUrl = actionsCore.getInput('baselineUrl'),
      compareUrl = actionsCore.getInput('compareUrl');

    const [baseJson, compareJson] = await Promise.all([
      fetchJson(baselineUrl),
      fetchJson(compareUrl),
    ]);

    let results = diff(baseJson, compareJson);
    let report = generateReport(results, {threshold: 1});

    actionsCore.setOutput('results', results);
    actionsCore.setOutput('report', report);
  }
  catch (err) {
    actionsCore.setFailed(err.message);
  }
})();