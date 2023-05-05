Find Termin in Bürgeramt!

[![CI/CD](https://github.com/breslavsky/book-termin/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/breslavsky/book-termin/actions/workflows/ci-cd.yml)

# Use case
1. Open https://service.berlin.de/dienstleistung/327537/
2. Find **Bürgeramt Prenzlauer Berg**
3. Click **Termin buchen**
4. Find available dates slots
5. Send Telegram message

# How to deploy
1. Fork this repository.
2. In Telegram:
   1. Create bot https://t.me/botfather
   2. Create public channel.
   3. Add bot as admin in channel.
3. Create **Production** [environment](https://github.com/breslavsky/find-termin/settings/environments/new) on GitHub.
4. Put bot API key as secret `TG_API_KEY` on GitHub.
