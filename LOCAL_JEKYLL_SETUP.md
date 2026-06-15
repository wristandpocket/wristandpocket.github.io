# Local Jekyll Setup On Windows

This project deploys through GitHub Actions, but local Jekyll is useful for fast build checks before pushing to `main`.

Official references:

- Jekyll Windows install: https://jekyllrb.com/docs/installation/windows/
- RubyInstaller downloads: https://rubyinstaller.org/downloads/

## 1. Install Ruby

Install Ruby with Devkit from RubyInstaller:

- Download the recommended `Ruby+Devkit` x64 installer.
- During install, keep `Add Ruby executables to your PATH` enabled.
- At the end, run the `ridk install` step when the installer offers it.
- In the `ridk install` prompt, choose the default MSYS2/Devkit setup option.

Close and reopen PowerShell after installation.

## 2. Verify Ruby Tools

```powershell
ruby --version
gem --version
bundle --version
```

If `bundle` is missing:

```powershell
gem install bundler
```

## 3. Install Site Gems

Run this from the site repository root:

```powershell
cd C:\Users\igors\Documents\GitHub\WristAndPocket-Studio\wristandpocket.github.io
bundle install
```

## 4. Run Local Checks

Static preflight:

```powershell
npm.cmd run preflight
```

Jekyll production build:

```powershell
npm.cmd run build
```

Usual local verification:

```powershell
npm.cmd run verify
```

Optional HTML Proofer parity check:

```powershell
npm.cmd run verify:html
```

On Windows this may require MSYS2/libcurl support from RubyInstaller Devkit. GitHub Actions runs this check on Ubuntu.

Local preview:

```powershell
bundle exec jekyll serve --livereload
```

Open:

```text
http://127.0.0.1:4000/
```

## 5. If Native Gems Fail

Run:

```powershell
ridk install
bundle pristine
bundle install
```

If the terminal still cannot find Ruby, close all terminals and open a new PowerShell window so the updated PATH is loaded.
