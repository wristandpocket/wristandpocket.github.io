[CmdletBinding()]
param(
    [string]$OutputPath = 'ci-results/site-ci.md',
    [string]$Preflight = 'SKIP',
    [string]$Build = 'SKIP',
    [string]$Html = 'SKIP',
    [string]$JavaScript = 'SKIP',
    [string]$Quality = 'SKIP'
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
    [PSCustomObject]@{ Check = 'Generated-site quality'; Status = (Normalize-Status $Quality); Detail = 'Generated-page landmarks, accessible names, headings, canonical metadata, and locale routing.' }
)
$lines = [Collections.Generic.List[string]]::new()
$lines.Add('# Site CI')
$lines.Add('')
$lines.Add('This report covers static PR/deployment verification. It does not claim browser, accessibility, search-engine, or production-host evidence.')
$lines.Add('')
$lines.Add('| Status | Check | Detail |')
$lines.Add('| --- | --- | --- |')
foreach ($row in $rows) { $lines.Add("| $($row.Status) | $($row.Check) | $($row.Detail) |") }
$failures = @($rows | Where-Object Status -eq 'FAIL')
$skips = @($rows | Where-Object Status -eq 'SKIP')
$lines.Add('')
$lines.Add(("Overall: **{0}** (failures={1}, skipped={2})." -f ($(if ($failures.Count -gt 0) { 'FAIL' } elseif ($skips.Count -gt 0) { 'SKIP' } else { 'PASS' }), $failures.Count, $skips.Count)))
Set-Content -LiteralPath $resolved -Value $lines -Encoding UTF8
if ($env:GITHUB_STEP_SUMMARY) { Add-Content -LiteralPath $env:GITHUB_STEP_SUMMARY -Value ($lines -join [Environment]::NewLine) -Encoding UTF8 }
foreach ($failure in $failures) {
    $detail = "Site CI failed at $($failure.Check): $($failure.Detail)" -replace '%', '%25' -replace "`r", '%0D' -replace "`n", '%0A'
    Write-Output "::error title=Site CI failure::$detail"
}
foreach ($skip in $skips) {
    $detail = "Site CI evidence skipped at $($skip.Check): $($skip.Detail)" -replace '%', '%25' -replace "`r", '%0D' -replace "`n", '%0A'
    Write-Output "::warning title=Site CI evidence skipped::$detail"
}
Write-Output "Wrote CI report: $resolved"
if ($failures.Count -gt 0) { exit 1 }
