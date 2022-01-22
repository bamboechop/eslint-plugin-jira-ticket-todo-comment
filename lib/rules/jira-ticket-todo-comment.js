module.exports = {
  create(context) {
    return {
      "Program": function(node) {
        const options = context.options[0];
        const projectKey = options && options.projectKey;
        const regexOption = options && options.regex;
        if(projectKey && regexOption) {
          context.report({ message: `Both projectKey and regex are set. Please only specify one of those properties.`, node });
          return;
        }
        let regex = new RegExp(`^TODO\\s[A-Z]{2,255}-\\d+(\\s.*)?`);
        if(projectKey) {
          regex = new RegExp(`^TODO\\s${projectKey}-\\d+\\s?.*`);
        }
        if(regexOption) {
          regex = new RegExp(regexOption);
        }
        for(const comment of context.getSourceCode().getAllComments()) {
          const value = comment.value.trimStart();
          if(value.startsWith(`TODO`) && !regex.test(value)) {
            context.report({ message: `Add a JIRA ticket number to the TODO comment (e.g. ${projectKey ? projectKey : `MP`}-123)`, node });
          }
        }
      },
    };
  },
  meta: {
    docs: {
      category: `Best Practices`,
      description: `Checks TODO comments and informs about missing Jira ticket mentions`,
      recommended: true,
      url: `https://github.com/bambuschop/eslint-plugin-jira-ticket-todo-comment`,
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          projectKey: {
            type: `string`,
          },
          regex: {
            type: `string`,
          },
        },
        type: `object`,
      },
    ],
    type: `problem`,
  },
};
