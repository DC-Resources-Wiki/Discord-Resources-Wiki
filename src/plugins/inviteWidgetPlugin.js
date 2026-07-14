const findAndReplace = require('mdast-util-find-and-replace');

function inviteWidgetPlugin() {
	const widgetMarkupRegex = /@gg\/([a-zA-Z0-9-_]+)/g;

	return function transformer(markdownAST) {
		let found = true;
		function replace(match) {
			found = true;
			return [
				{
					type: 'mdxJsxTextElement',
					name: 'InviteWidget',
					attributes: [
						{
							type: 'mdxJsxAttribute',
							name: 'invite',
							value: match.substring(4),
						},
					],
					children: [],
				},
			];
		}

		while (found) {
			found = false;
			// the implementation seems to have issues finding multiple instances in one node
			// the loop ensures that all instances are replaced by searching again after the last one was already replaced
			findAndReplace(markdownAST, widgetMarkupRegex, replace);
		}

		return markdownAST;
	};
}

module.exports = inviteWidgetPlugin;
