#!/usr/bin/env sh
# Gera output/ebook.html e output/ebook.pdf (Unix).
# Funciona de qualquer diretório e repassa o código de saída de scripts/build.mjs.

RAIZ="$(cd "$(dirname "$0")/.." && pwd)" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js não encontrado. Instale o Node.js 18 ou superior em https://nodejs.org e tente novamente." >&2
  exit 2
fi

cd "$RAIZ" || exit 1
exec node scripts/build.mjs
