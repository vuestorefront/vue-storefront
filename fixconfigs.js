'use strict'

const path = require('path')
const fs = require('fs')

const CONFIG_EXAMPLE_ORG_PATH = path.resolve(__dirname, './src/config.example.json')
const CONFIG_ORG_PATH = path.resolve(__dirname, './src/config.json')
const CONFIG_DEST_PATH = path.resolve(__dirname, './config/local.json')

if (!fs.existsSync(CONFIG_DEST_PATH)) {
  console.log('Fixing old config paths!')
  fs.writeFileSync(CONFIG_DEST_PATH, fs.readFileSync(CONFIG_ORG_PATH))
  console.log('Removing old configs paths!')
  fs.unlinkSync(CONFIG_ORG_PATH)

  if (fs.existsSync(CONFIG_EXAMPLE_ORG_PATH)) {
    fs.unlinkSync(CONFIG_EXAMPLE_ORG_PATH)
  }
}
