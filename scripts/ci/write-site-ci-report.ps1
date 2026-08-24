[CmdletBinding()]
param(
    [string]$OutputPath = 'ci-results/site-ci.md',
    [string]$Preflight = 'SKIP',
    [string]$Build = 'SKIP',
    [string]$Html = 'SKIP',
    [string]$JavaScript = 'SKIP'
)

$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$resolved = if ([IO.Path]::IsPathRooted($OutputPath)) { $OutputPath } else { Join-Path $root $OutputPath }
$directory = Split-Path -Parent $resolved
if (-not (Test-Path -LiteralPath $directory)) { New-Item -ItemType Directory -Path $directory -Force | Out-Null }

function Normalize-Status([string]$Value) {
    switch ($Value.ToLowerInvariant()) {
        'success' { return 'PASS' }
        'failure' { return 'FAIL' }
        'cancelled' { return 'SKIP' }
        'skipped' { return 'SKIP' }
        default { return 'SKIP' }
    }
}

$rows = @(
    [PSCustomObject]@{ Check = 'Preflight'; Status = (Normalize-Status $Preflight); Detail = 'Static URL, metadata, localization, and safety policy.' }
    [PSCustomObject]@{ Check = 'Jekyll build'; Status = (Normalize-Status $Build); Detail = 'Generated _site output.' }
    [PSCustomObject]@{ Check = 'HTML Proofer'; Status = (Normalize-Status $Html); Detail = 'Links, assets, and generated HTML.' }
    [PSCustomObject]@{ Check = 'JavaScript budget'; Status = (Normalize-Status $JavaScript); Detail = 'Built script size budget.' }
)
$lines = [Collections.Generic.List[string]]::new()
$lines.Add('# Site CI')
$lines.Add('')
$lines.Add('This report covers static PR/deployment verification. It does not claim browser, accessibility, search-engine, or production-host evidence.')
$lines.Add('')
$lines.Add('| Status | Check | Detail |')
$lines.Add('| --- | --- | --- |')
foreach ($row in $rows) { $lines.Add("| $($row.Status) | $($row.Check) | $($row.Detail) |") }
Set-Content -LiteralPath $resolved -Value $lines -Encoding UTF8
if ($env:GITHUB_STEP_SUMMARY) { Add-Content -LiteralPath $env:GITHUB_STEP_SUMMARY -Value ($lines -join [Environment]::NewLine) -Encoding UTF8 }
Write-Output "Wrote CI report: $resolved"
