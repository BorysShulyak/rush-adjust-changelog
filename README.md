## Motivation

This package would be useful if you use [rush.js](https://rushjs.io/) as monorepo tool. 
Rush is a really powerful tool. One of the features is the interactive CLI friendly changelog generating.
If you use rush.js your changelog looks something like this - [CHANGELOG.md](https://github.com/microsoft/rushstack/blob/master/libraries/node-core-library/CHANGELOG.md).

What if you want to add common information for each of your changelog? This script would help you. You could use it as the part of CI or create another one based on this idea.

Pre requirements:

- Branch name pattern: `<type>/<jira-project>-<jira-ticket>-...`

If you use something like this script your changelog would become [more informative](https://gyazo.com/cefad5ccdef2063fe9ed09b7d5db5c46) (screen is attached) - it could help QA team with their tickets flow (they could easily find how has done some changes, etc.)

FYI, I use this script as a part of our CI/CD in production development.
