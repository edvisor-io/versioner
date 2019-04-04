#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var changelog_parser_1 = require("../changelog-parser");
var _a = process.argv, args = _a.slice(2);
var filePath = args[0];
try {
    if (fs.existsSync(filePath)) {
        var fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
        var unreleased = changelog_parser_1.parseUnreleased(fileLines);
        console.log(changelog_parser_1.determineReleaseType(unreleased));
    }
}
catch (err) {
    console.log("Invalid file path");
    console.error(err);
}
