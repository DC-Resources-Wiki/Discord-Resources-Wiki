const findAndReplace = require('mdast-util-find-and-replace');

const {users, fetchUserByIdentifier, userIdentifierRegex} = require('../lib/users');

function userWidgetInlinePlugin() {
	const identifierRegex = new RegExp(`@${userIdentifierRegex}`, 'g');

	return async function transformer(markdownAST) {
		const toLoad = [];
		const attempted = new Set();

		function replaceOrCollect(match) {
			const userId = match.substring(1);
			if (Object.prototype.hasOwnProperty.call(users, userId)) {
				let loadedUser = users[userId];
				return {
					type: 'mdxJsxTextElement',
					name: 'UserWidgetInline',
					attributes: [
						{
							type: 'mdxJsxAttribute',
							name: 'data',
							value: JSON.stringify(loadedUser),
						},
					],
					children: [],
				};
			} else {
				if (!attempted.has(userId)) {
					toLoad.push(userId);
				}
				return {
					type: 'text',
					value: `@${userId}`,
				};
			}
		}

		// this finds all instances and already replaces them if the users have already been loaded by other pages
		findAndReplace(markdownAST, identifierRegex, replaceOrCollect);

		while (toLoad.length) {
			for (let userId of toLoad) {
				attempted.add(userId);
				await fetchUserByIdentifier(userId);
			}
			toLoad.splice(0, toLoad.length);

			// this replaces the instances that have just been loaded
			findAndReplace(markdownAST, identifierRegex, replaceOrCollect);

			// the implementation seems to have issues finding multiple instances in one node
			// the loop ensures that all instances are replaced by searching again after the last one was already replaced
			findAndReplace(markdownAST, identifierRegex, replaceOrCollect);
		}

		return markdownAST;
	};
}

module.exports = userWidgetInlinePlugin;
