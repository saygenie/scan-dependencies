const { execSync } = require("child_process");
const targets = require("./targets.json");

// const execHandler = (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(stdout);
//   console.error(stderr);
// };

targets.forEach(({ language, projects }) => {
  projects.forEach((project) => {
    const projectName = project.split("/")[1];

    try {
      // 프로젝트 다운로드
      const cloneProject = execSync(
        `
      if [ -d "projects/${language}/${projectName}" ]; then
        echo "${project}가 이미 존재합니다."
      else
        git clone https://github.com/${project} projects/${language}/${projectName}
      fi
      `
      );
      console.log(cloneProject.toString());
    } catch (cloneProjectError) {
      console.error(cloneProjectError);
    }
  });
});
