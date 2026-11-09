# Gera output/ebook.html e output/ebook.pdf (Windows/PowerShell).
# Funciona de qualquer diretório e repassa o código de saída de scripts/build.mjs.

$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error 'Node.js não encontrado. Instale o Node.js 18 ou superior em https://nodejs.org e tente novamente.'
    exit 2
}

Push-Location $raiz
try {
    & node (Join-Path 'scripts' 'build.mjs')
    $codigo = $LASTEXITCODE
}
finally {
    Pop-Location
}
exit $codigo
