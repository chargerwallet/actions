const core = require("@actions/core");
import {
  readBuildGradleAsync,
  writeBuildGradleAsync,
  setVersionCode,
  setVersionName,
  setApplicationId,
} from "./gradleUtils";

async function main() {
  const input_version_code = core.getInput("versionCode", {
    required: true,
  });
  const input_version_name = core.getInput("versionName", {
    required: true,
  });
  const project_path = core.getInput("android_dir");
  const input_package_name = core.getInput("packageName", {
    required: false,
  });

  if (!project_path) return;
  console.log(`Reading build.gradle from ${project_path}`);

  let buildGradle = await readBuildGradleAsync(project_path);

  buildGradle = setVersionCode(input_version_code, buildGradle);
  buildGradle = setVersionName(input_version_name, buildGradle);
  buildGradle = setApplicationId(input_package_name, buildGradle);

  await writeBuildGradleAsync({
    projectDir: project_path,
    buildGradle: buildGradle,
  });
}

main().catch((err) => console.error(err));
