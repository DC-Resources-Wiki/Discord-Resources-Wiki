require('dotenv').config();
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v10');
const {Octokit} = require('@octokit/rest');
const fs = require('fs');

const discordToken = process.env.DISCORD_TOKEN;
const discordRest = discordToken ? new REST({version: '10'}).setToken(discordToken) : null;
const octokit = new Octokit();

const users = loadUsers();
const failedIdentifiers = new Set();

function loadUsers() {
	try {
		const rawData = fs.readFileSync('./users.generated.json');
		return JSON.parse(rawData);
	} catch (e) {
		return {};
	}
}

function persistUsers() {
	fs.writeFileSync('./users.generated.json', JSON.stringify(users));
}

const discordSnowflakeRegex = /^[0-9]+$/;
const userIdentifierRegex = '((discord:)?[0-9]+|github:[0-9a-zA-Z-_]+)';

function discordUserAvatarUrl({id, discriminator, avatar}, size = 128) {
	const DISCORD_CDN = 'https://cdn.discordapp.com';

	if (avatar) {
		if (avatar.startsWith('a_')) {
			return `${DISCORD_CDN}/avatars/${id}/${avatar}.gif?size=${size}`;
		} else {
			return `${DISCORD_CDN}/avatars/${id}/${avatar}.webp?size=${size}`;
		}
	} else {
		return `${DISCORD_CDN}/embed/avatars/${parseInt(discriminator ?? id) % 5}.png?size=32`;
	}
}

async function fetchUserByIdentifier(identifier) {
	if (users[identifier] && !users[identifier].notFound) return users[identifier];
	if (failedIdentifiers.has(identifier)) {
		return buildFallbackUser(identifier);
	}

	let user = buildFallbackUser(identifier);

	if (discordSnowflakeRegex.exec(identifier) || identifier.startsWith('discord:')) {
		let userId = identifier;
		if (identifier.startsWith('discord:')) {
			userId = identifier.substring(8);
		}

		user.id = userId;
		user.avatarUrl = discordUserAvatarUrl({id: userId});

		if (discordToken && discordRest) {
			try {
				const discordUser = await discordRest.get(Routes.user(userId));
				user = {
					notFound: false,
					type: 'discord',
					id: discordUser.id,
					name: discordUser.username,
					username: `${discordUser.username}#${discordUser.discriminator}`,
					discriminator: discordUser.discriminator,
					avatarUrl: discordUserAvatarUrl(discordUser),
					url: `https://discord.com/users/${userId}`,
				};
			} catch {
				console.log(`Failed to fetch discord user with the id ${userId}.`);
				failedIdentifiers.add(identifier);
			}
		} else {
			failedIdentifiers.add(identifier);
		}
	} else if (identifier.startsWith('github:')) {
		const username = identifier.substring(7);
		try {
			const resp = await octokit.rest.users.getByUsername({username});
			if (resp.status === 200) {
				const githubUser = resp.data;
				user = {
					notFound: false,
					type: 'github',
					id: githubUser.id,
					name: githubUser.name || githubUser.login,
					username: githubUser.login,
					avatarUrl: githubUser.avatar_url,
					url: `https://github.com/${githubUser.login}`,
				};
			} else {
				console.log(`Failed to fetch github user with the username ${username}.`);
				failedIdentifiers.add(identifier);
			}
		} catch {
			console.log(`Failed to fetch github user with the username ${username}.`);
			failedIdentifiers.add(identifier);
		}
	}

	// Only cache successful lookups so missing tokens/transient API failures can recover later.
	if (!user.notFound) {
		users[identifier] = user;
		persistUsers();
	}

	return user;
}

function buildFallbackUser(identifier) {
	let discordId = identifier;
	if (identifier.startsWith('discord:')) {
		discordId = identifier.substring(8);
	}

	return {
		notFound: true,
		type: identifier.startsWith('github:') ? 'github' : 'discord',
		id: discordId,
		name: 'Unknown User',
		username: identifier.startsWith('github:') ? identifier.substring(7) : '',
		discriminator: '0000',
		avatarUrl: identifier.startsWith('github:')
			? 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
			: discordUserAvatarUrl({id: discordId}),
		url: null,
	};
}

module.exports = {users, fetchUserByIdentifier, discordUserAvatarUrl, userIdentifierRegex};
