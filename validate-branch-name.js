const execSync = require("child_process").execSync;

const branchName = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim();
const branchNamePattern =
  /^(feat|bugfix|hotfix|test|chore)\/issue-\d+\/[\w-]+$/;

if (!branchNamePattern.test(branchName)) {
  console.error(
    `ERROR: The branch name "${branchName}" does not follow the required format!`,
  );
  console.error("\nExpected format: <type>/issue-<number>/<description>");
  console.error("Example: feat/issue-123/add-login-button\n");
  process.exit(1);
}
