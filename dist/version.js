#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _a = process.argv, args = _a.slice(2);
var filePath = args[0];
var fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
fs.writeFile("temp.txt", fileLines, function (err) {
    if (err)
        console.log(err);
    console.log("Successfully Written to File.");
});
var ChangelogSections;
(function (ChangelogSections) {
    ChangelogSections["Unreleased"] = "## [Unreleased]";
    ChangelogSections["Added"] = "### Added";
    ChangelogSections["Changed"] = "### Changed";
    ChangelogSections["Removed"] = "### Removed";
    ChangelogSections["Deprecated"] = "### Deprecated";
    ChangelogSections["Fixed"] = "### Fixed";
    ChangelogSections["Security"] = "### Security";
})(ChangelogSections || (ChangelogSections = {}));
var Releases;
(function (Releases) {
    Releases["Major"] = "major";
    Releases["Minor"] = "minor";
    Releases["Patch"] = "patch";
})(Releases || (Releases = {}));
var releaseDelimiter = '## [';
var sectionDelimiter = '###';
var unreleased = parseUnreleased(fileLines);
// console.log('Added:', parseSection(unreleased, ChangelogSections.Added))
// console.log('Changed:', parseSection(unreleased, ChangelogSections.Changed))
// console.log('Removed:', parseSection(unreleased, ChangelogSections.Removed))
// console.log('Deprecated:', parseSection(unreleased, ChangelogSections.Deprecated))
// console.log('Fixed:', parseSection(unreleased, ChangelogSections.Fixed))
// console.log('Security:', parseSection(unreleased, ChangelogSections.Security))
console.log(determineReleaseType(unreleased));
function determineReleaseType(releaseLog) {
    var removed = parseSection(releaseLog, ChangelogSections.Removed);
    var fixed = parseSection(releaseLog, ChangelogSections.Fixed);
    var security = parseSection(releaseLog, ChangelogSections.Security);
    //Only breaking changes will trigger a Major release.
    if (removed.length > 0) {
        return Releases.Major;
    }
    else if (fixed.length > 0 || security.length > 0) {
        return Releases.Patch;
    }
    else {
        return Releases.Minor;
    }
}
exports.determineReleaseType = determineReleaseType;
function parseUnreleased(fileLines) {
    var result = [];
    for (var i = 0; i < fileLines.length; i++) {
        if (fileLines[i] === ChangelogSections.Unreleased) {
            i++;
            while (isUnreleased(fileLines[i])) {
                if (fileLines[i] !== '') {
                    result.push(fileLines[i]);
                }
                i++;
            }
            break;
        }
    }
    return result;
}
exports.parseUnreleased = parseUnreleased;
function isUnreleased(line) {
    if (line === undefined)
        return false;
    return !line.includes(releaseDelimiter);
}
function parseSection(unreleased, header) {
    var result = [];
    for (var i = 0; i < unreleased.length; i++) {
        if (unreleased[i] === header) {
            i++;
            while (isSameSection(unreleased[i])) {
                result.push(unreleased[i]);
                i++;
            }
            break;
        }
    }
    return result;
}
function isSameSection(line) {
    if (line === undefined)
        return false;
    return !line.includes(sectionDelimiter);
}
