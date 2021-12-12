#!/usr/bin/env node

import fs from 'fs';
import { getAllFilesFromDir, getNoSuchFileErrorMessage }  from './fileUtils.js';

// Regex patterns
//= ===================================================================================================================//
const CHANGELOG_INFO_REGEX =
  /\[[A-Z]+-[0-9]+\]\(https:\/\/[a-zA-Z0-9_.-\/]+\.atlassian\.net\/browse\/[A-Z]+-[0-9]+\) \/ \[![[0-9]+\]\(https:\/\/[a-zA-Z0-9_.-\/]+\/-\/merge_requests\/[0-9]+\) \/ by \[.+\]\(https:\/\/[a-zA-Z0-9_.-\/]+\/.+\)/;
//= ===================================================================================================================//

// Handlers
//= ===================================================================================================================//
const handleIncorrectCommentMessage = () => {
  console.log(
    `Your change file should provide the correct format of changelog info.`
  );
  process.exit(1);
};
//= ===================================================================================================================//

// Operations with files
//= ===================================================================================================================//
const rewriteChangeFile = (file, fileContent, textForReplacing) => {
  const newValue = fileContent.replace(/"comment": "/, `"comment": "${textForReplacing} `);
  fs.writeFileSync(file, newValue, 'utf-8');
};
//= ===================================================================================================================//

// Generate Changelog info
//= ===================================================================================================================//
const getJiraTicketLink = (jiraDomain, branchName) => {
  const branchInfo = branchName.split('/')[1];
  const jiraProject = branchInfo.split('-')[0];
  const jiraTicket = branchInfo.split('-')[1];
  return `[${jiraProject}-${jiraTicket}](https://${jiraDomain}.atlassian.net/browse/${jiraProject}-${jiraTicket})`;
};
const getMergeRequestLink = (gitlabDomain, gitlabProjectRoute, mergeRequestIID) => {
  return `[!${mergeRequestIID}](https://${gitlabDomain}/${gitlabProjectRoute}/-/merge_requests/${mergeRequestIID})`;
};
const getAuthorLink = (gitlabDomain, authorName, authorLogin) => {
  return `[${authorName}](https://${gitlabDomain}/${authorLogin})`;
};

const getChangelogInfo = (
  jiraDomain,
  gitlabDomain,
  gitlabProjectRoute,
  branchName,
  mergeRequestIID,
  authorName,
  authorLogin
) => {
  return `${getJiraTicketLink(jiraDomain, branchName)} / ${getMergeRequestLink(
    gitlabDomain,
    gitlabProjectRoute,
    mergeRequestIID
  )} / by ${getAuthorLink(gitlabDomain, authorName, authorLogin)}`;
};
//= ===================================================================================================================//

// Main function
//= ===================================================================================================================//
export const adjustChangelog = async (jiraDomain, gitlabDomain, gitlabProjectRoute) => {
  const branchName = process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME;
  const mergeRequestIID = process.env.CI_MERGE_REQUEST_IID;
  const authorName = process.env.GITLAB_USER_NAME;
  const authorLogin = process.env.GITLAB_USER_LOGIN;
  const changeFilesDir = 'common/changes';
  let changeFiles;
  try {
    changeFiles = getAllFilesFromDir(changeFilesDir);
  } catch (error) {
    const noSuchFileError = getNoSuchFileErrorMessage(changeFilesDir);
    if (error.toString().includes(noSuchFileError)) {
      process.exit(0);
    }
    console.error(error);
    process.exit(1);
  }

  for (const file of changeFiles) {
    console.log(`Verify ${file}`);
    const fileContent = fs.readFileSync(file, 'utf-8');

    if (!CHANGELOG_INFO_REGEX.test(fileContent)) {
      branchName === 'master' && handleIncorrectCommentMessage();
      const textForReplacing = getChangelogInfo(
        jiraDomain,
        gitlabDomain,
        gitlabProjectRoute,
        branchName,
        mergeRequestIID,
        authorName,
        authorLogin
      );
      rewriteChangeFile(file, fileContent, textForReplacing);
      console.log('Changelog info was successfully added.');
    }
  }
  process.exit(0);
};
//= ===================================================================================================================//
