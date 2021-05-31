module.exports = class {
	exec(client, guild) {
		client.logger.log(`Yeni bir sunucuya katıldım: ${guild.name}`);
	}
};
