# Build IEPF_Analyzer.html — a single, self-contained, fully-offline file (Windows / PowerShell).
# Inlines the pdf.js library + worker (base64) into src\template.html.
# Usage:  powershell -ExecutionPolicy Bypass -File build.ps1

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

$mainB64   = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $root 'src\vendor\pdf.min.js')))
$workerB64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $root 'src\vendor\pdf.worker.min.js')))

$html = [IO.File]::ReadAllText((Join-Path $root 'src\template.html'))
$html = $html.Replace('__PDFJS_MAIN_B64__', $mainB64).Replace('__PDFJS_WORKER_B64__', $workerB64)

if ($html.Contains('__PDFJS_')) { Write-Error 'Build failed: a placeholder was left unreplaced.' }

$out = Join-Path $root 'IEPF_Analyzer.html'
[IO.File]::WriteAllText($out, $html, (New-Object System.Text.UTF8Encoding($false)))
$mb = [Math]::Round((Get-Item $out).Length / 1MB, 2)
Write-Host "Built IEPF_Analyzer.html ($mb MB)"
