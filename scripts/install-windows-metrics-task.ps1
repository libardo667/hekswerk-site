param(
  [string]$Distribution = "Ubuntu-22.04",
  [string]$LinuxRepository = "/home/levib/projects/personal-projects/hekswerk-site",
  [string]$TaskName = "Hekswerk Weekly Metrics",
  [ValidateSet("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")]
  [string]$DayOfWeek = "Monday",
  [ValidatePattern("^(?:[01][0-9]|2[0-3]):[0-5][0-9]$")]
  [string]$At = "09:00"
)

$ErrorActionPreference = "Stop"

if ($Distribution -notmatch "^[A-Za-z0-9._-]+$") {
  throw "Distribution contains unsupported characters."
}

if ($LinuxRepository -notmatch "^/[A-Za-z0-9._/-]+$") {
  throw "LinuxRepository must be an absolute WSL path without spaces or shell metacharacters."
}

$wsl = Join-Path $env:SystemRoot "System32\wsl.exe"
$linuxCommand = "cd '$LinuxRepository' && npm run metrics:weekly:save"
$taskDirectory = Join-Path $env:LOCALAPPDATA "Hekswerk"
$runnerPath = Join-Path $taskDirectory "run-weekly-metrics.ps1"
$legacyRunnerPath = Join-Path $taskDirectory "run-weekly-metrics.cmd"
$logPath = Join-Path $taskDirectory "weekly-metrics-task.log"

New-Item -ItemType Directory -Path $taskDirectory -Force | Out-Null
Remove-Item -Path $legacyRunnerPath -Force -ErrorAction SilentlyContinue
@"
`$ErrorActionPreference = "Continue"
& '$wsl' --distribution '$Distribution' --exec bash -lc "$linuxCommand" *> '$logPath'
exit `$LASTEXITCODE
"@ | Set-Content -Path $runnerPath -Encoding ASCII

$powershell = Join-Path $env:SystemRoot "System32\WindowsPowerShell\v1.0\powershell.exe"
$actionArguments = "-NoProfile -NonInteractive -ExecutionPolicy Bypass -File `"$runnerPath`""
$action = New-ScheduledTaskAction -Execute $powershell -Argument $actionArguments
$trigger = New-ScheduledTaskTrigger -Weekly -WeeksInterval 1 -DaysOfWeek $DayOfWeek -At $At
$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 15) `
  -MultipleInstances IgnoreNew

Register-ScheduledTask `
  -TaskName $TaskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Save the private Hekswerk Analytics Engine report in the WSL repository." `
  -Force | Out-Null

$task = Get-ScheduledTask -TaskName $TaskName
$taskInfo = Get-ScheduledTaskInfo -TaskName $TaskName
[PSCustomObject]@{
  TaskName = $task.TaskName
  State = $task.State
  NextRunTime = $taskInfo.NextRunTime
  Execute = $task.Actions.Execute
  Arguments = $task.Actions.Arguments
  Runner = $runnerPath
  DiagnosticLog = $logPath
} | Format-List
