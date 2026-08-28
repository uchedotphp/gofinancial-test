#!/usr/bin/env sh
set -eu

check_branch() {
  branch=$(git branch --show-current)
  if [ "$branch" = "main" ] || [ "$branch" = "dev" ]; then
    echo "ERROR: do not commit on '$branch'. Use a feature branch." >&2
    exit 1
  fi
}

check_message() {
  raw="${1:-}"
  if [ -z "$raw" ]; then
    echo "ERROR: empty commit message." >&2
    exit 1
  fi

  if [ -f "$raw" ]; then
    first=$(head -n 1 "$raw")
  else
    first=$(printf '%s\n' "$raw" | head -n 1)
  fi

  if ! printf '%s\n' "$first" | grep -qE '^(feat|fix|chore|docs|refactor|style): '; then
    echo "ERROR: commit message must start with feat:, fix:, chore:, docs:, refactor:, or style:" >&2
    echo "  got: $first" >&2
    exit 1
  fi
}

case "${1:-}" in
  branch)
    check_branch
    ;;
  message)
    shift
    check_message "${1:-}"
    ;;
  *)
    echo "Usage: check-commit.sh branch|message <msg-or-file>" >&2
    exit 1
    ;;
esac
