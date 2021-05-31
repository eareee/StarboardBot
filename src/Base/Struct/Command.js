class Command {
	constructor(client, data = {}) {
		this.client = client;

		this.name = data.name;
		this.aliases = data.aliases || [];
		this.cooldown = data.cooldown || 2;

		this.guildOnly = data.guildOnly || true;
		this.ownerOnly = data.ownerOnly || false;

		this.description = data.description || "";
		this.category = "Diğer Komutlar";
		this.usage = data.usage || undefined;
	}

	exec(message, args) {
		throw new Error(`Boş komut: ${this.name}`);
	}
}

module.exports = Command;
