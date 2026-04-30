module.exports = {
  create(context) {
    return {
      Program(node) {
        const options = context.options[0];
        const projectKey = options && options.projectKey;
        const regexOption = options && options.regex;
        const messageOption = options && options.message;
        if(projectKey && regexOption) {
          context.report({ messageId: `bothOptionsProvided`, node });
          return;
        }
        let regex = new RegExp(`^TODO\\s[A-Z]{2,255}-\\d+(\\s.*)?`, `i`);
        if(projectKey) {
          regex = new RegExp(`^TODO\\s${projectKey}-\\d+\\s?.*`, `i`);
        }
        if(regexOption) {
          regex = new RegExp(regexOption, `i`);
        }
        const sourceCode = context.sourceCode || context.getSourceCode();
        for(const node of sourceCode.getAllComments()) {
          const value = node.value.trimStart();
          if(value.toLowerCase().startsWith(`todo`) && !regex.test(value)) {
            const message = messageOption ? { message: messageOption } : { messageId: `addJiraTicketNumber`};
            context.report({ data: { ticketNumber: `${projectKey ? projectKey : `MP`}-123` }, ...message, node });
          }
        }
      },
    };
  },
  meta: {
    defaultOptions: [{}],
    docs: {
      category: `Best Practices`,
      description: `Checks TODO comments and informs about missing Jira (or other issue tracking system) ticket mentions`,
      recommended: true,
      url: `https://github.com/bamboechop/eslint-plugin-jira-ticket-todo-comment`,
    },
    messages: {
      addJiraTicketNumber: `Add a Jira ticket number to the TODO comment (e.g. {{ ticketNumber }})`,
      bothOptionsProvided: `Both projectKey and regex are set. Please only specify one of those properties.`,
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          projectKey: {
            description: `Jira (or other issue tracking system) project key required after TODO`,
            type: `string`,
          },
          regex: {
            description: `Custom regular expression used to validate TODO comments`,
            type: `string`,
          },
          message: {
            description: `Custom message reported when a TODO comment is missing a Jira (or other issue tracking system) ticket`,
            type: `string`,
          },
        },
        type: `object`,
      },
    ],
    type: `problem`,
  },
};
