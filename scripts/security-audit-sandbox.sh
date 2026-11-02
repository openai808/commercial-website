#!/usr/bin/env bash
# OS-enforced sandbox for the security-audit skill (.claude/skills/security-audit).
# Satisfies the skill's "Universal execution safety" contract for any target-controlled
# execution (builds, tests, fixtures, local servers): no network, read-only target,
# scratch-only writes, resource limits, and an explicit env allowlist.
#
# Usage:
#   scripts/security-audit-sandbox.sh <scratch-dir> [ALLOWED_ENV_VAR=value ...] -- <command> [args...]
#
# Example:
#   scripts/security-audit-sandbox.sh /tmp/audit-scratch -- node /workspace/lib/security/rateLimit.ts
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "usage: $0 <scratch-dir> [ENV_VAR=value ...] -- <command> [args...]" >&2
  exit 1
fi

SCRATCH_DIR="$1"; shift
mkdir -p "$SCRATCH_DIR"
SCRATCH_DIR="$(cd "$SCRATCH_DIR" && pwd)"

ENV_ARGS=()
while [ "$#" -gt 0 ] && [ "$1" != "--" ]; do
  ENV_ARGS+=(--env "$1")
  shift
done
[ "${1:-}" = "--" ] && shift

if [ "$#" -lt 1 ]; then
  echo "error: no command given after --" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec docker run --rm \
  --network none \
  --memory 512m \
  --cpus 1 \
  --pids-limit 128 \
  --ulimit fsize=104857600 \
  --read-only \
  --tmpfs /tmp:size=64m \
  -v "$REPO_ROOT:/workspace:ro" \
  -v "$SCRATCH_DIR:/scratch:rw" \
  -w /scratch \
  --env HOME=/scratch \
  --env TMPDIR=/tmp \
  "${ENV_ARGS[@]+"${ENV_ARGS[@]}"}" \
  node:20-alpine \
  timeout 120 "$@"
