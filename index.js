const fs = require("fs");
const { exec } = require("child_process");

const data = fs.readFileSync("targets.test.json").toString();
const targets = JSON.parse(data);

const execHandler = (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
};

targets.forEach(({ language, projects }) => {
  projects.forEach((project) => {
    const projectName = project.split("/")[1];

    // 프로젝트 다운로드
    const cloneProject = exec(
      `git clone https://github.com/${project} projects/${language}/${projectName}`,
      execHandler
    );

    // 의존성 검사
    const dependencyCheck = exec(
      `dependency-check --scan projects/${language}/${projectName} --out reports/${language}/${projectName} --format ALL`,
      execHandler
    );
  });
});
