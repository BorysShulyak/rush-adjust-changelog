## Motivation

This package would be useful if you use [rush.js](https://rushjs.io/) as monorepo tool. 
Rush is a really powerful tool. One of the features is the interactive CLI friendly changelog generating.
If you use rush.js your changelog looks something like this - [CHANGELOG.md](https://github.com/microsoft/rushstack/blob/master/libraries/node-core-library/CHANGELOG.md).

What if you want to add common information for each of your changelog? This script would help you. You could use it as the part of CI or create another one based on this idea.

Pre requirements:

- Branch name pattern: `<type>/<jira-project>-<jira-ticket>-...`

If you use something like this script your changelog would become more informative (screen is attached) - it could help QA team with their tickets flow (they could easily find how has done some changes, etc.)

![](../../../../var/folders/85/_75yhkhn5xn0qz2pz07_vb4c0000gn/T/TemporaryItems/NSIRD_screencaptureui_9HIkOa/Screenshot 2021-12-12 at 18.43.28.png)

FYI, I use this script as a part of our CI/CD in production development.
