#!/usr/bin/env node
/**
 * Next.js 16+ requires Node >= 20.9.0.
 * Run automatically via npm pre* hooks so wrong shells fail fast.
 */
const MIN_MAJOR = 20;
const MIN_MINOR = 9;

const [majorStr, minorStr] = process.version.slice(1).split(".");
const major = Number(majorStr);
const minor = Number(minorStr);

const ok =
  major > MIN_MAJOR || (major === MIN_MAJOR && minor >= MIN_MINOR);

if (!ok) {
  console.error(
    `\n[landing] 현재 Node: ${process.version}. 이 프로젝트는 Node ${MIN_MAJOR}.${MIN_MINOR}.0 이상이 필요합니다.\n` +
      `  nvm:   cd 프로젝트 루트 후  nvm use\n` +
      `  fnm:   cd 프로젝트 루트 후  fnm use (또는 셸에 fnm 훅 설정)\n` +
      `  Volta: volta install node@${MIN_MAJOR}\n`,
  );
  process.exit(1);
}
