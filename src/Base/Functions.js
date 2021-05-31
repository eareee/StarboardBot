const Command = require("./Struct/Command");
const glob = require("glob");
const path = require("path");

module.exports = class {
	constructor(client) {
		this.client = client;
	}

	isClass(any) {
		return any.toString().substring(0, 5) === "class";
	}

	async load() {
		this.loadCommands();
		this.loadEvents();
	}

	loadCommands() {
		return glob(
			`${path.dirname(require.main.filename)}/Commands/**/*.js`,
			(err, commands) => {
				if (err) throw err;

				for (let f of commands) {
					try {
						delete require.cache[f];

						let filePath = f.split("/");
						let name = filePath.pop();
						let category = filePath.pop();

						let Pull = require(f);
						if (!this.isClass(Pull))
							throw new TypeError(
								`Bu modül (${name}) bir class değil`
							);

						let cmd = new Pull(this.client);
						if (!(cmd instanceof Command))
							throw new TypeError(
								`Bu modül (${name}) bir komut değil!`
							);

						cmd.category = category;
						this.client.commands.set(cmd.name, cmd);
						this.client.logger.log(
							`Komut Yüklendi: ${name}`,
							"READY"
						);
					} catch (e) {
						this.client.logger.log(
							`Komut Yükleme Hatası\nDosya yolu: (${f}): ${e}`,
							"ERROR"
						);
					}
				}
			}
		);
	}

	loadEvents() {
		return glob(
			`${path.dirname(require.main.filename)}/Events/*.js`,
			(err, events) => {
				if (err) throw err;

				for (let f of events) {
					try {
						delete require.cache[f];
						let { name } = path.parse(f);

						let Pull = require(f);
						if (!this.isClass(Pull))
							throw new TypeError(
								`Bu modül (${name}) bir class değil`
							);

						let event = new Pull();

						this.client.on(name, (...args) =>
							event.exec(this.client, ...args)
						);
						this.client.logger.log(
							`Event Yüklendi: ${name}`,
							"READY"
						);
					} catch (e) {
						this.client.logger.log(
							`Event Yükleme Hatası (${f}): ${e}`,
							"ERROR"
						);
					}
				}
			}
		);
	}
};
