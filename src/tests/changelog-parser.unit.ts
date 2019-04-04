import test from 'ava'
import fs = require('fs')
import { determineReleaseType, parseUnreleased } from '../changelog-parser'

test('Determines version is Major when something was Removed', t => {
	const filePath = 'src/tests/test-changelogs/major-release.md'
	const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
	const parsedLog = parseUnreleased(fileLines)
	const version = determineReleaseType(parsedLog)

	t.is(version, 'major')
});

test('Determines version is Minor when Added or Changed included', t => {
	const filePath = 'src/tests/test-changelogs/minor-release.md'
	const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
	const parsedLog = parseUnreleased(fileLines)
	const version = determineReleaseType(parsedLog)

	t.is(version, 'minor')
});

test('Determines version is Patch when Fixed section inlcuded', t => {
	const filePath = 'src/tests/test-changelogs/patch-release.md'
	const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
	const parsedLog = parseUnreleased(fileLines)
	const version = determineReleaseType(parsedLog)

	t.is(version, 'patch')
});



