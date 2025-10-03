param(
  [ValidateSet('login','signup-farm','signup-company','dashboard','admin')]
  [string]$page = 'login'
)

$base = "${PSScriptRoot}\..\pages"

switch ($page) {
  'login'         { Start-Process (Join-Path $base 'login.html') }
  'signup-farm'   { Start-Process (Join-Path $base 'signup-farm-owner.html') }
  'signup-company'{ Start-Process (Join-Path $base 'signup-cattle-company.html') }
  'dashboard'     { Start-Process (Join-Path $base 'dashboard.html') }
  'admin'         { Start-Process (Join-Path $base 'admin-dashboard.html') }
}

Write-Host "Opened $page page in your default browser. Follow QA_CHECKLIST.md for steps."
