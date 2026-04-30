/**
 * @fileoverview Checks TODO comments and informs about missing Jira (or other issue tracking system) ticket mentions
 * @author bamboechop <npmjs@bamboechop.at>
 */
"use strict";

// import all rules in lib/rules
module.exports.rules = {
  'jira-ticket-todo-comment': require(`./rules/jira-ticket-todo-comment`),
};



