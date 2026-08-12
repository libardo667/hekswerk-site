import {execFileSync} from 'node:child_process';
import {readdirSync, statSync} from 'node:fs';
import path from 'node:path';

const projectsRoot = path.resolve(process.cwd(), '..');
const ignoredPathPart =
  /(^|\/)(node_modules|vendor|third_party|\.venv|venv|dist|build|coverage|\.docusaurus|\.cache|__pycache__)(\/|$)/i;

const languageByExtension = new Map([
  ['.py', 'Python'],
  ['.pyi', 'Python'],
  ['.ts', 'TypeScript'],
  ['.tsx', 'TypeScript'],
  ['.js', 'JavaScript'],
  ['.jsx', 'JavaScript'],
  ['.mjs', 'JavaScript'],
  ['.cjs', 'JavaScript'],
  ['.html', 'HTML'],
  ['.htm', 'HTML'],
  ['.css', 'CSS'],
  ['.scss', 'CSS'],
  ['.sass', 'CSS'],
  ['.gd', 'GDScript'],
  ['.c', 'C'],
  ['.cc', 'C++'],
  ['.cpp', 'C++'],
  ['.cxx', 'C++'],
  ['.h', 'C++'],
  ['.hpp', 'C++'],
  ['.hxx', 'C++'],
  ['.rs', 'Rust'],
  ['.sh', 'Shell'],
  ['.bash', 'Shell'],
  ['.zsh', 'Shell'],
  ['.ps1', 'PowerShell'],
  ['.sql', 'SQL'],
]);

function git(projectPath, args) {
  return execFileSync('git', ['-C', projectPath, ...args], {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

function isIncludedOrigin(origin) {
  return origin === '' || origin.startsWith('/') || origin.includes('github.com/libardo667/');
}

const languageFiles = new Map();
const languageProjects = new Map();
const includedProjects = [];
const excludedProjects = [];

for (const entry of readdirSync(projectsRoot, {withFileTypes: true})) {
  if (!entry.isDirectory()) continue;

  const projectPath = path.join(projectsRoot, entry.name);
  const gitPath = path.join(projectPath, '.git');
  try {
    statSync(gitPath);
  } catch {
    continue;
  }

  let origin = '';
  try {
    origin = git(projectPath, ['remote', 'get-url', 'origin']);
  } catch {
    // Local-only repositories are intentionally included.
  }

  if (!isIncludedOrigin(origin)) {
    excludedProjects.push(entry.name);
    continue;
  }

  includedProjects.push(entry.name);
  const projectLanguages = new Set();
  const trackedFiles = git(projectPath, ['ls-files', '-z']).split('\0').filter(Boolean);

  for (const filePath of trackedFiles) {
    if (ignoredPathPart.test(filePath)) continue;
    const language = languageByExtension.get(path.extname(filePath).toLowerCase());
    if (!language) continue;

    languageFiles.set(language, (languageFiles.get(language) || 0) + 1);
    projectLanguages.add(language);
  }

  for (const language of projectLanguages) {
    languageProjects.set(language, (languageProjects.get(language) || 0) + 1);
  }
}

const languages = [...languageFiles.entries()]
  .map(([language, files]) => ({
    language,
    files,
    projects: languageProjects.get(language),
  }))
  .sort((left, right) => right.files - left.files || left.language.localeCompare(right.language));

const sourceFiles = languages.reduce((total, language) => total + language.files, 0);

console.log(
  JSON.stringify(
    {
      method: 'Git-tracked source files by filename extension',
      projectsRoot,
      includedProjectCount: includedProjects.length,
      excludedThirdPartyProjects: excludedProjects.sort(),
      sourceFiles,
      languages,
    },
    null,
    2,
  ),
);
