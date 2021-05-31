const Command = require("../../Base/Struct/Command");
const Discord = require("discord.js");

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: "sıralama",
		});
	}

	async exec(message) {
		let starboard = this.client.starboardsManager.starboards.find(
			(s) => s.guildID === message.guild.id && s.options.emoji === "⭐"
		);
		if (!starboard)
			return message.channel.send(
				"⛔ Bu sunucunun ayarlanmış bir starboard kanalı yok."
			);
		await starboard
			.leaderboard()
			.then((lb) => {
				const content = lb.map(
					(m, i) =>
						`**${i + 1}.** ${m.stars} ⭐ ${
							m.embeds[0].description
								? clean(m.embeds[0].description)
								: ""
						} ${m.image ? `[Görüntü](${m.image})` : ""}`
				);

				const sıralamaEmbed = new Discord.MessageEmbed()
					.setColor("GOLD")
					.setDescription(content.join("\n"));
				message.channel.send(sıralamaEmbed);
			})
			.catch((e) => {
				console.log(e);
				message.channel.send("⛔ Bir hata oluştu.");
			});
	}
};

const clean = (str) =>
	str.startsWith("```") && str.endsWith("```")
		? `\`\`\`${str.slice(3, -3)}\`\`\``
		: `\`\`\`${str}\`\`\``;
