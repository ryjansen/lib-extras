@echo Off

set SRCDIR=%~dp0src
set PROJNAME=lib-extras

set config=%1
if "%config%" == "" (
   set config=Release
)
 
set version=0.0.0
if not "%PackageVersion%" == "" (
   set version=%PackageVersion%
)
 
set nuget=
if "%nuget%" == "" (
	set nuget=nuget
)
 
%WINDIR%\Microsoft.NET\Framework\v4.0.30319\msbuild %SRCDIR%\%PROJNAME%.sln /p:Configuration="%config%" /m /v:M /fl /flp:LogFile=msbuild.log;Verbosity=diag /nr:false
 
rmdir /s /q Build 2>nul
mkdir Build

if exist "%SRCDIR%\%PROJNAME%.nuspec" (
  echo.
  %nuget% pack "%SRCDIR%\%PROJNAME%.nuspec" -NoPackageAnalysis -verbosity detailed -o Build -Version %version% -p Configuration="%config%"
  %nuget% pack "%SRCDIR%\%PROJNAME%.TypeScript.nuspec" -NoPackageAnalysis -verbosity detailed -o Build -Version %version% -p Configuration="%config%"
)
