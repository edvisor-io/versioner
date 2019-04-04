"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var fs = require("fs");
var changelog_parser_1 = require("../changelog-parser");
ava_1.default('Determines version is Major when something was Removed', function (t) {
    var filePath = 'src/tests/test-changelogs/major-release.md';
    var fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
    var parsedLog = changelog_parser_1.parseUnreleased(fileLines);
    var version = changelog_parser_1.determineReleaseType(parsedLog);
    t.is(version, 'major');
});
ava_1.default('Determines version is Minor when Added or Changed included', function (t) {
    var filePath = 'src/tests/test-changelogs/minor-release.md';
    var fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
    var parsedLog = changelog_parser_1.parseUnreleased(fileLines);
    var version = changelog_parser_1.determineReleaseType(parsedLog);
    t.is(version, 'minor');
});
ava_1.default('Determines version is Patch when Fixed section inlcuded', function (t) {
    var filePath = 'src/tests/test-changelogs/patch-release.md';
    var fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
    var parsedLog = changelog_parser_1.parseUnreleased(fileLines);
    var version = changelog_parser_1.determineReleaseType(parsedLog);
    t.is(version, 'patch');
});
