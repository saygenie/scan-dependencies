const { execSync } = require("child_process");
const targets = require("./targets.json");

targets.forEach(({ language, projects }) => {
  projects.forEach((project) => {
    const projectName = project.split("/")[1];

    try {
      // 의존성 검사
      const scanDependencies = execSync(
        `dependency-check --scan projects/${language}/${projectName} --out reports/${language}/${projectName} --project ${project}  --format ALL --prettyPrint`
      );
      console.log(scanDependencies.toString());
    } catch (scanDependenciesError) {
      console.error(scanDependenciesError);
    }
  });
});
