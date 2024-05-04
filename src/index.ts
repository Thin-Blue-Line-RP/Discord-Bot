import {Client, ClientOptions, GatewayIntentBits, Partials, Collection} from 'discord.js';
import initEvents from './initEvents';
import initFunctions from './initFunctions';
const token = process.env.DISCORD_TOKEN || null;
const debug: boolean = Boolean(process.env.DEBUG) || false;
if (!token) {
    throw new Error('DISCORD_TOKEN environment variable is missing.');
}



declare module 'discord.js' {
    interface Client {
        events: Collection<string, any>;
        commands: Collection<string, any>;
        debug: boolean;
        functions: Collection<string, any>;
    }
}

const options: ClientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Reaction
    ]
};

const client = new Client(options)

client.commands = new Collection();
client.events = new Collection();
client.functions = new Collection();
client.debug = debug;

initEvents(client);
initFunctions(client);


client.login(token);