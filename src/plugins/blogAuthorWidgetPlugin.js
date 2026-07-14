const findAndReplace = require('mdast-util-find-and-replace');

const {users, fetchUserByIdentifier, userIdentifierRegex} = require('../lib/users');

function blogAuthorWidgetPlugin() {
	const identifierRegex = new RegExp(
		`@authors/${userIdentifierRegex}(,${userIdentifierRegex})*`,
		'g'
	);

	return async function transformer(markdownAST) {
		const toLoad = [];
		const attempted = new Set();

		function replaceOrCollect(match) {
			const userIds = match.substring(9).split(',');

			let ready = true;
			for (let userId of userIds) {
				if (!Object.prototype.hasOwnProperty.call(users, userId)) {
					ready = false;
					if (!attempted.has(userId)) {
						toLoad.push(userId);
					}
				}
			}

			if (ready) {
				const loadedUsers = userIds.map((userId) => users[userId]);
				return {
					type: 'mdxJsxTextElement',
					name: 'BlogAuthorWidget',
					attributes: [
						{
							type: 'mdxJsxAttribute',
							name: 'data',
							value: JSON.stringify(loadedUsers),
						},
					],
					children: [],
				};
			} else {
				return {
					type: 'text',
					value: `@authors/${userIds.join(',')}`,
				};
			}
		}

		findAndReplace(markdownAST, identifierRegex, replaceOrCollect);

		while (toLoad.length) {
			for (let userId of toLoad) {
				attempted.add(userId);
				await fetchUserByIdentifier(userId);
			}

			toLoad.splice(0, toLoad.length);

			findAndReplace(markdownAST, identifierRegex, replaceOrCollect);
			findAndReplace(markdownAST, identifierRegex, replaceOrCollect);
		}

		return markdownAST;
	};
}

module.exports = blogAuthorWidgetPlugin;
