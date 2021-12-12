const fs = require('fs');
const path = require('path');

const getNoSuchFileErrorMessage = (dirPath) => `No such file or directory ${dirPath}`;

const getAllFilesFromDir = (dirPath, arrayOfFiles) => {
  let files;
  try {
    files = fs.readdirSync(dirPath);
  } catch (error) {
    throw new Error(getNoSuchFileErrorMessage(dirPath));
  }

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFilesFromDir(`${dirPath}/${file}`, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

module.exports.getAllFilesFromDir = getAllFilesFromDir;
module.exports.getNoSuchFileErrorMessage = getNoSuchFileErrorMessage;
