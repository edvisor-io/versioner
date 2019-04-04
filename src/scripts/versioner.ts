#!/usr/bin/env node

import fs = require('fs')
import { parseUnreleased, determineReleaseType } from '../changelog-parser'
const [,, ...args] = process.argv
const filePath = args[0]

try {
  if (fs.existsSync(filePath)) {
    const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
    const unreleased = parseUnreleased(fileLines)
    console.log(determineReleaseType(unreleased))
  }
} catch(err) {
  console.log("Invalid file path")
  console.error(err)
}

