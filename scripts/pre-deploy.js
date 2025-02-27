const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue('Running pre-deployment checks...\n'));

// Check for environment variables
const requiredEnvVars = ['REACT_APP_API_URL'];
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.error(
    chalk.red(
      `Missing required environment variables:\n${missingEnvVars.join('\n')}`
    )
  );
  process.exit(1);
}

// Check package.json
const packageJson = require('../package.json');
const requiredFields = ['name', 'version', 'dependencies'];
const missingFields = requiredFields.filter(
  (field) => !packageJson[field]
);

if (missingFields.length > 0) {
  console.error(
    chalk.red(
      `Missing required fields in package.json:\n${missingFields.join('\n')}`
    )
  );
  process.exit(1);
}

// Check for build folder
if (!fs.existsSync(path.join(__dirname, '../build'))) {
  console.error(chalk.red('Build folder not found. Run npm run build first.'));
  process.exit(1);
}

// Check for large files
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
function checkDirectoryForLargeFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      checkDirectoryForLargeFiles(filePath);
    } else if (stats.size > MAX_FILE_SIZE) {
      console.warn(
        chalk.yellow(
          `Warning: Large file detected: ${filePath} (${Math.round(
            stats.size / 1024 / 1024
          )}MB)`
        )
      );
    }
  });
}

checkDirectoryForLargeFiles(path.join(__dirname, '../build'));

console.log(chalk.green('\nPre-deployment checks passed!\n'));

// Print deployment size
const getFolderSize = (dir) => {
  let size = 0;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      size += getFolderSize(filePath);
    } else {
      size += stats.size;
    }
  });
  return size;
};

const buildSize = getFolderSize(path.join(__dirname, '../build'));
console.log(
  chalk.blue(
    `Total deployment size: ${Math.round(buildSize / 1024 / 1024)}MB\n`
  )
); 