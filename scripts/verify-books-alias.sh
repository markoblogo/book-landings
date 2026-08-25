#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${VERIFY_ALIAS_DOMAIN:-books.1d3x.com}"
EXPECTED_DEPLOYMENT_ID="${VERIFY_EXPECTED_DEPLOYMENT_ID:-}"
VERCEL_TOKEN="${VERCEL_TOKEN:-}"
VERCEL_SCOPE_ID="${VERCEL_SCOPE_ID:-${VERCEL_TEAM_ID:-${VERCEL_ORG_ID:-}}}"

if [[ -z "$VERCEL_TOKEN" ]]; then
  echo "Missing VERCEL_TOKEN environment variable"
  exit 1
fi

if [[ -z "$EXPECTED_DEPLOYMENT_ID" ]]; then
  echo "Missing VERIFY_EXPECTED_DEPLOYMENT_ID"
  exit 1
fi

SCOPE_ARGS=()
if [[ -n "$VERCEL_SCOPE_ID" ]]; then
  SCOPE_ARGS+=(--scope "$VERCEL_SCOPE_ID")
fi

resolve_alias_deployment() {
  local raw id
  local methods=(
    "inspect"
    "alias ls"
  )

  for method in "${methods[@]}"; do
    if [[ "$method" == "inspect" ]]; then
      raw=$(npx --yes vercel inspect "$DOMAIN" --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" 2>/dev/null || true)
    else
      raw=$(npx --yes vercel alias ls "$DOMAIN" --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" 2>/dev/null || true)
    fi

    id=$(printf '%s\n' "$raw" | grep -oE 'dpl_[A-Za-z0-9]+' | head -n 1 || true)
    if [[ -n "$id" ]]; then
      echo "$id"
      return 0
    fi
  done

  echo "Unable to resolve deployment id for ${DOMAIN} using Vercel CLI"
  echo "--- CLI output snapshot ---"
  printf '%s\n' "$raw" | sed -n '1,80p'
  return 1
}

ALIAS_DEPLOYMENT_ID="$(resolve_alias_deployment)"

if [[ "$ALIAS_DEPLOYMENT_ID" != "$EXPECTED_DEPLOYMENT_ID" ]]; then
  echo "Alias drift detected for ${DOMAIN}"
  echo "Expected: ${EXPECTED_DEPLOYMENT_ID}"
  echo "Observed: ${ALIAS_DEPLOYMENT_ID}"
  exit 1
fi

echo "Alias check passed: ${DOMAIN} -> ${ALIAS_DEPLOYMENT_ID}"
