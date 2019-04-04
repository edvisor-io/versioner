
enum ChangelogSections {
  Unreleased = '## [Unreleased]',
  Added = '### Added',
  Changed = '### Changed',
  Removed = '### Removed',
  Deprecated = '### Deprecated',
  Fixed = '### Fixed',
  Security = '### Security'
}

enum Releases {
  Major = 'major',
  Minor = 'minor',
  Patch = 'patch'
}

const releaseDelimiter = '## ['
const sectionDelimiter = '###'


export function determineReleaseType(releaseLog: string[]) {
  const removed = parseSection(releaseLog, ChangelogSections.Removed)
  const fixed = parseSection(releaseLog, ChangelogSections.Fixed)
  const security = parseSection(releaseLog, ChangelogSections.Security)

  //Only breaking changes will trigger a Major release.
  if (removed.length > 0) {
    return Releases.Major
  } else if (fixed.length > 0 || security.length > 0) {
    return Releases.Patch
  } else {
    return Releases.Minor
  }
}

export function parseUnreleased(fileLines: string[]): string[] {
  const result: string[] = []

  for (let i = 0; i < fileLines.length; i++) {
    if(fileLines[i] === ChangelogSections.Unreleased) {
      i++
      while (isUnreleased(fileLines[i])) {
        if (fileLines[i] !== '') {
          result.push(fileLines[i])
        }
        i++
      }
      break
    }
  }

  return result
}

function isUnreleased(line?: string): boolean {
  if (line === undefined) return false

  return !line.includes(releaseDelimiter)
}

function parseSection(unreleased: string[], header: string): string[] {
  const result: string[] = []

  for (let i = 0; i < unreleased.length; i++) {
    if(unreleased[i] === header) {
      i++
      while (isSameSection(unreleased[i])) {
        result.push(unreleased[i])
        i++
      }
      break
    }
  }
  return result
}

function isSameSection(line?: string): boolean {
  if (line === undefined) return false

  return !line.includes(sectionDelimiter)
}

