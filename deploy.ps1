param(
    [string]$Message = "Update Maki website"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=== Maki Deployment ==="
Write-Host "Local -> GitHub main -> Vercel Production"
Write-Host ""

# 1) Verify this is a Git repository.
git rev-parse --is-inside-work-tree *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: This folder is not a Git repository."
    exit 1
}

# 2) Verify the current branch is main.
$branch = (git branch --show-current).Trim()
if ($branch -ne "main") {
    Write-Host "ERROR: Current branch is '$branch'. Switch to main first:"
    Write-Host "git checkout main"
    exit 1
}

# 3) Verify the GitHub origin points to the Maki repository.
$origin = (git remote get-url origin).Trim()
if ($LASTEXITCODE -ne 0 -or $origin -notmatch "Mahendrancbe90/Maki(\.git)?$") {
    Write-Host "ERROR: 'origin' is not the expected Maki GitHub repository."
    Write-Host "Current origin: $origin"
    Write-Host "Expected: https://github.com/Mahendrancbe90/Maki.git"
    exit 1
}

# 4) Stage and commit local changes (if any).
git add -A
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: git add failed."
    exit 1
}

git diff --cached --quiet
$hasNoStagedChanges = ($LASTEXITCODE -eq 0)

if (-not $hasNoStagedChanges) {
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: git commit failed."
        exit 1
    }
} else {
    Write-Host "No new local changes to commit."
}

# 5) Bring in any remote main changes before pushing.
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Pull/rebase failed."
    Write-Host "If Git reports a conflict, resolve it in VS Code, then run:"
    Write-Host "git add -A"
    Write-Host "git rebase --continue"
    Write-Host ".\deploy.ps1 -Message `"$Message`""
    exit 1
}

# 6) Push main to GitHub.
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: GitHub push failed."
    exit 1
}

Write-Host ""
Write-Host "SUCCESS: GitHub main is updated."
Write-Host "Vercel Git deployment has been triggered."
Write-Host "Live site: https://maki-nu.vercel.app/"
Write-Host ""
