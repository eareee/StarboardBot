const Command = require("../../Base/Struct/Command");
const Discord = require("discord.js");

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "ayarla",
			usage: "[kanal] [gerekli yıldız]",
		});
	}

	exec(message, args) {
		let channel = message.mentions.channels.first();
		let threshold = args[1] || 3;

		if (isNaN(threshold))
			return message.channel.send("⛔ Geçerli bir sayı girmelisiniz.");
		if (!message.member.hasPermission("MANAGE_CHANNELS")) {
			return message.channel.send(
				"⛔ Bu komutu kullanabilmek için kanalları yönetme iznine sahip olmalısınız."
			);
		}

		let starboard = this.client.starboardsManager.starboards.find(
			(s) => s.guildID === message.guild.id
		);

		const starboardEmbed = new Discord.MessageEmbed()
			.setColor("GOLD")
			.addFields(
				{ name: "Kanal", value: channel, inline: true },
				{
					name: "Gerekli Yıldız",
					value: `\`${threshold}\` yıldız`,
					inline: true,
				}
			);

		if (starboard) {
			this.client.starboardsManager.delete(starboard.channelID, "⭐");
			this.client.starboardsManager.create(channel, {
				emoji: "⭐",
				selfStar: false,
				threshold: parseInt(threshold),
			});
			message.channel.send(
				"☑️ Kanal Başarılı Bir Şekilde Ayarlandı",
				starboardEmbed
			);
		} else {
			this.client.starboardsManager.create(channel, {
				emoji: "⭐",
				selfStar: false,
				threshold: parseInt(threshold),
			});
			message.channel.send(
				"☑️ Kanal Başarılı Bir Şekilde Ayarlandı",
				starboardEmbed
			);
		}
	}
};
