# Communications Bot

## env structure

```
DISCORDJS_BOT_TOKEN=<YOUR_TOKEN>
GUILD_ID=<YOUR_GUILD_ID>
PREFIX=<PREFIX>
```

## Instructions to start dev mode of the bot

1. Create a `.env` file and follow `.env.example` or [env structure](#env-structure).
2. Create `logs` folder in the root directory and inside it, create `crash_logs.txt` file.
3. Create `config.ts` file in `src` folder by following the template in `config.example.ts`.
4. Run the following command in the terminal:

```bash
npm run dev
```
