const Command = require("../../Base/Struct/Command");

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "kapat",
		});
	}

	exec(message) {
		let starboard = this.client.starboardsManager.starboards.find(
			(s) => s.guildID === message.guild.id && s.options.emoji === "⭐"
		);
		if (!starboard)
			return message.channel.send(
				"⛔ Bu sunucunun ayarlanmış bir starboard kanalı yok."
			);
		this.client.starboardsManager.delete(starboard.channelID, "⭐");
		message.channel.send("☑️ Kanal ayarı başarıyla kaldırıldı.");
	}
};
