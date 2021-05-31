module.exports = class {
	exec(client, guild) {
		client.logger.log(`Bir sunucudan atıldım: ${guild.name}`);
	}
};
