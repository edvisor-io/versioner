#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var moment = require("moment");
var _a = process.argv, args = _a.slice(2);
var filePath = args[0];
var version = args[1];
try {
    if (fs.existsSync(filePath)) {
        var fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
        var temp_1 = fs.createWriteStream('tmp.txt');
        fileLines.forEach(function (line) {
            temp_1.write(line + "\n");
            if (line.includes('## [Unreleased]')) {
                var release = "\n## [" + version + "] - " + moment().format('YYYY-MM-DD') + "\n";
                temp_1.write(release);
            }
        });
        fs.rename('tmp.txt', filePath, function (err) {
            if (err)
                throw err;
        });
    }
    else {
        throw new Error('Invalid file path');
    }
}
catch (err) {
    console.error(err);
}
