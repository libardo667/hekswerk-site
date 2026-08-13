#!/usr/bin/env bash

set -euo pipefail
umask 077

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
report_directory="${HEKSWERK_METRICS_REPORT_DIR:-${repository_root}/.metrics-reports}"
timestamp="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
report_path="${report_directory}/weekly-${timestamp}.txt"
temporary_path=""

mkdir -p -- "${report_directory}"
chmod 700 -- "${report_directory}"
temporary_path="$(mktemp "${report_directory}/.weekly-${timestamp}.XXXXXX")"

cleanup() {
  if [[ -n "${temporary_path}" && -f "${temporary_path}" ]]; then
    rm -f -- "${temporary_path}"
  fi
}
trap cleanup EXIT

if (
  cd "${repository_root}"
  npm run --silent metrics:weekly
) >"${temporary_path}" 2>&1; then
  mv -- "${temporary_path}" "${report_path}"
  temporary_path=""
  chmod 600 -- "${report_path}"
  printf 'Saved private weekly metrics report: %s\n' "${report_path}"
else
  failure_path="${report_directory}/failed-${timestamp}.txt"
  mv -- "${temporary_path}" "${failure_path}"
  temporary_path=""
  chmod 600 -- "${failure_path}"
  printf 'Weekly metrics report failed; details saved to: %s\n' "${failure_path}" >&2
  exit 1
fi
