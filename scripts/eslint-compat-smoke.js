"use strict";

const { execFileSync } = require(`child_process`);
const path = require(`path`);

const expectedVersion = process.argv[2];
const lookupCommand = process.platform === `win32` ? `where` : `which`;
const eslintBin = execFileSync(lookupCommand, [`eslint`], { encoding: `utf8` })
  .split(/\r?\n/u)
  .find(Boolean);
const eslintPackagePath = path.join(path.dirname(path.dirname(eslintBin)), `eslint`);
const { RuleTester } = require(eslintPackagePath);
const eslintPackage = require(path.join(eslintPackagePath, `package.json`));
const rule = require(`../lib/rules/jira-ticket-todo-comment`);

if(expectedVersion && eslintPackage.version !== expectedVersion) {
  throw new Error(`Expected ESLint ${expectedVersion}, got ${eslintPackage.version}`);
}

const ruleTester = new RuleTester();

ruleTester.run(`Jira ticket TODO comment compatibility smoke test`, rule, {
  invalid: [
    {
      code: `// TODO fix this`,
      errors: [{ message: `Add a Jira ticket number to the TODO comment (e.g. MP-123)` }],
    },
  ],
  valid: [
    {
      code: `// TODO MP-123 fix this`,
    },
    {
      code: `// TODO TP-123 fix this`,
      options: [{ projectKey: `TP` }],
    },
  ],
});

console.log(`ESLint ${eslintPackage.version} compatibility smoke passed`);
