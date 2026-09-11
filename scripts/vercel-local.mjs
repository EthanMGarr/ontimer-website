#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = join(repositoryRoot, "package.json");
const installedVercelPackagePath = join(
  repositoryRoot,
  "node_modules",
  "vercel",
  "package.json",
);
const localVercelCliPath = join(
  repositoryRoot,
  "node_modules",
  "vercel",
  "dist",
  "vc.js",
);
const projectLinkPath = join(repositoryRoot, ".vercel", "project.json");
// Vercel organization and project IDs route deployments; they are not credentials.
const expectedProjectLink = {
  orgId: "team_5zAmf24GD0LUh1NX5dD8hamW",
  projectId: "prj_cSZ5kQOpmEjfNjcpG2o5d1tFBnlp",
  projectName: "ontimer-website",
};

function fail(message) {
  console.error(`\nVercel workflow stopped: ${message}`);
  process.exit(1);
}

function readJson(path, description) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${description} is missing or invalid at ${path}. ${error.message}`);
  }
}

function runLocalVercel(args) {
  const result = spawnSync(process.execPath, [localVercelCliPath, ...args], {
    cwd: repositoryRoot,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    fail(`could not start the pinned local CLI. ${result.error.message}`);
  }

  return result.status ?? 1;
}

function verifyPinnedCli() {
  const packageJson = readJson(packageJsonPath, "package.json");
  const pinnedVersion =
    packageJson.devDependencies?.vercel ?? packageJson.dependencies?.vercel;

  if (!pinnedVersion || !/^\d+\.\d+\.\d+$/.test(pinnedVersion)) {
    fail("package.json must pin Vercel to an exact version.");
  }

  if (!existsSync(localVercelCliPath) || !existsSync(installedVercelPackagePath)) {
    fail("the pinned local Vercel CLI is not installed. Run `npm ci`, then retry.");
  }

  const installedVersion = readJson(
    installedVercelPackagePath,
    "the installed Vercel package",
  ).version;

  if (installedVersion !== pinnedVersion) {
    fail(
      `the installed Vercel CLI is ${installedVersion}, but package.json pins ${pinnedVersion}. Run \`npm ci\`, then retry.`,
    );
  }

  return pinnedVersion;
}

function verifyProjectLink() {
  if (!existsSync(projectLinkPath)) {
    fail(
      "the Vercel project link is missing. Run `npm run vercel:link`, select the OnTimer production project, then retry.",
    );
  }

  const projectLink = readJson(projectLinkPath, "the Vercel project link");

  if (!projectLink.orgId || !projectLink.projectId) {
    fail(
      "`.vercel/project.json` does not contain both orgId and projectId. Run `npm run vercel:link`, then retry.",
    );
  }

  if (
    projectLink.orgId !== expectedProjectLink.orgId ||
    projectLink.projectId !== expectedProjectLink.projectId
  ) {
    fail(
      "`.vercel/project.json` is linked to a different Vercel target. Run `npm run vercel:link`, select the OnTimer production project, then retry.",
    );
  }

  return projectLink.projectName ?? expectedProjectLink.projectName;
}

function verifyAuthentication() {
  console.log("Checking the saved Vercel login with the pinned local CLI...");
  const status = runLocalVercel(["whoami"]);

  if (status !== 0) {
    fail(
      "the pinned local CLI could not authenticate. Run `npm run vercel:login`, then retry. Do not use `npx vercel@latest`.",
    );
  }
}

const action = process.argv[2];
const pinnedVersion = verifyPinnedCli();

if (action === "login") {
  process.exit(runLocalVercel(["login"]));
}

if (action === "link") {
  verifyAuthentication();
  process.exit(runLocalVercel(["link"]));
}

if (action !== "check" && action !== "deploy-production") {
  fail("expected one of: check, login, link, deploy-production.");
}

const projectName = verifyProjectLink();
verifyAuthentication();
console.log(
  `Vercel preflight passed: local CLI ${pinnedVersion}, linked project ${projectName}.`,
);

if (action === "check") {
  process.exit(0);
}

console.log("Deploying production with the same pinned local CLI...");
process.exit(runLocalVercel(["deploy", "--prod", "--yes"]));
