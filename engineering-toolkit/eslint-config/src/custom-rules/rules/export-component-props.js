/* eslint-disable func-names */
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure component Props interfaces are exported",
      category: "Best Practices",
      recommended: false,
    },
    // Rule is autofixable
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      "TSInterfaceDeclaration, TSTypeAliasDeclaration": function (node) {
        const { name } = node.id;
        // Get the filename without the path and extension
        const filename = context.filename.split("/").pop().split(".")[0];

        // Check if the interface follows the <filename>Props pattern
        if (name.endsWith("Props") && name.startsWith(filename)) {
          const { sourceCode } = context;
          const exportTokens = sourceCode.getTokensBefore(node, {
            filter: (token) => token.value === "export",
            count: 1,
          });

          if (!exportTokens.length) {
            context.report({
              node,
              message: `\`${name}\` interface should be exported from the file.`,
              fix(fixer) {
                const nodeStart = node.range[0];
                return fixer.insertTextBeforeRange(
                  [nodeStart, nodeStart],
                  "export "
                );
              },
            });
          }
        }
      },
    };
  },
};
