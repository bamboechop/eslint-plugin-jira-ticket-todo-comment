# eslint-plugin-jira-ticket-todo-comment

Checks TODO comments and informs about missing Jira (or other issue tracking system) ticket mentions

## Installation

```sh
npm install eslint-plugin-jira-ticket-todo-comment --save-dev
```

## Compatibility

Version `1.0.6` supports ESLint 6 and later, including ESLint 8, 9, and 10. Version `1.0.5` and earlier can fail on ESLint 10 with `context.getSourceCode is not a function`.

Development tooling in this repository uses ESLint 10 and requires a Node.js version supported by ESLint 10.

## Usage

For ESLint 10, add the plugin to your `eslint.config.mjs` file:

```js
import jiraTicketTodoComment from "eslint-plugin-jira-ticket-todo-comment";

export default [
    {
        plugins: {
            "jira-ticket-todo-comment": jiraTicketTodoComment
        },
        rules: {
            "jira-ticket-todo-comment/jira-ticket-todo-comment": "error"
        }
    }
];
```

For ESLint 9 or lower using eslintrc, add `jira-ticket-todo-comment` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:


```json
{
    "plugins": [
        "jira-ticket-todo-comment"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "jira-ticket-todo-comment/jira-ticket-todo-comment": "error"
    }
}
```

## Rule Details

This rule aims to enforce consistent style of TODO comments making it easier for developer teams to quickly see if a TODO comment is already in Jira (or other issue tracking system).

## Options

This rule has an optional object option.

* `"projectKey": "TP"` (default `MP`) sets a specific project key which is used in your Jira (or other issue tracking system) project; when not provided the rule will check against the default regex; can **NOT** be set together with `"regex"` option
```json
{
    "rules": {
        "jira-ticket-todo-comment/jira-ticket-todo-comment": ["error", { "projectKey":  "TP" }]
    }
}
```
* `"regex": "^TODO\\s[A-Z]_[A-Z]{1,9}-\\d+\\s?.*"` (default `^TODO\\s[A-Z]{2,255}-\\d+(\\s.*)?`) allows you to override the default regex which is used to check for the Jira (or other issue tracking system) ticket format; can **NOT** be set together with `"projectKey"` option
```json
{
    "rules": {
        "jira-ticket-todo-comment/jira-ticket-todo-comment": ["error", { "regex":  "^TODO\\s[A-Z]_[A-Z]{1,9}-\\d+\\s?.*" }]
    }
}
```
* `"message": "Please replace this TODO with a Jira reference."` allows you to override the default message that appears when a TODO is detected without any Jira (or other issue tracking software) key.
```json
{
    "rules": {
        "jira-ticket-todo-comment/jira-ticket-todo-comment": ["error", { "message":  "Please replace this TODO with a Jira reference." }]
    }
}
```
