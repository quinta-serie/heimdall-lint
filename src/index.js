#!/usr/bin/env node
const { Command } = require('commander')
const CommandHandler = require('./commands/command-handler')

const commandHandler = new CommandHandler()

commandHandler.run(new Command(), process.argv)
