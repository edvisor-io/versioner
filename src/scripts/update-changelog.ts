#!/usr/bin/env node

import fs = require('fs')
import moment = require('moment')

const [,, ...args] = process.argv
const filePath = args[0]
const version = args[1]

try {
  if (fs.existsSync(filePath)) {
    const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
    const temp = fs.createWriteStream('tmp.txt')

    fileLines.forEach((line) => {
      temp.write(`${line}\n`)
      if (line.includes('## [Unreleased]')) {
        const release = `\n## [${version}] - ${moment().format('YYYY-MM-DD')}`
        temp.write(release)
      }
    })

    fs.rename('tmp.txt', filePath, (err) => {
      if (err) throw err;
    });
  
  } else {
    throw new Error('Invalid file path')
  }
} catch(err) {
  console.error(err)
}