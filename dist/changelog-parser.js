"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
