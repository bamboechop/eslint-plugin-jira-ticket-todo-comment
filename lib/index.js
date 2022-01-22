/**
 * @fileoverview Checks TODO comments and informs about missing Jira ticket mentions
 * @author bamboechop <npmjs@bamboechop.at>
 */
"use strict";

// eslint-disable-next-line quotes
const requireIndex = require("requireindex");

// import all rules in lib/rules
module.exports.rules = requireIndex(`${__dirname}/rules`);



