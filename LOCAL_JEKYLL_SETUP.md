# Local Jekyll Setup

This project deploys through GitHub Actions, but local Jekyll is useful for fast build checks before pushing to `main`.

## macOS Setup

Recommended installation using Homebrew and `rbenv` (Ruby version manager):

1. **Install Homebrew** (if not already installed) from [brew.sh](https://brew.sh).
2. **Install rbenv and ruby-build**:
   ```bash
   brew install rbenv ruby-build
   ```
3. **Configure shell integration** (for zsh):
   ```bash
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
   source ~/.zshrc
   ```
4. **Install and set Ruby version**:
   ```bash
   rbenv install 3.3.11
   rbenv local 3.3.11
   ```
5. **Install bundler**:
   ```bash
   gem install bundler
   ```
6. **Install dependencies**:
   ```bash
   bundle install
   ```

## Windows Setup

Official references:

- Jekyll Windows install: https://jekyllrb.com/docs/installation/windows/
- RubyInstaller downloads: https://rubyinstaller.org/downloads/

1. **Install Ruby with Devkit** from RubyInstaller:
   - Download the recommended `Ruby+Devkit` x64 installer.
   - During install, keep `Add Ruby executables to your PATH` enabled.
   - At the end, run the `ridk install` step when the installer offers it.
   - In the `ridk install` prompt, choose the default MSYS2/Devkit setup option.
   Close and reopen PowerShell.

2. **Verify Ruby Tools**:
   ```powershell
   ruby --version
   gem --version
   bundle --version
   ```
   If `bundle` is missing:
   ```powershell
   gem install bundler
   ```

3. **Install Site Gems**:
   Run from the repository root:
   ```powershell
   bundle install
   ```

## Local Preview

To run the local preview server:
- **macOS / Linux**:
  ```bash
  bundle exec jekyll serve --livereload
  ```
- **Windows**:
  ```powershell
  bundle exec jekyll serve --livereload
  ```

Open:
```text
http://127.0.0.1:4000/
```

## Running Local Checks (Node.js)

If you have Node.js installed, you can run automated verification scripts:

- Static preflight:
  ```bash
  # macOS / Linux
  npm run preflight
  # Windows
  npm.cmd run preflight
  ```
- Jekyll production build:
  ```bash
  # macOS / Linux
  npm run build
  # Windows
  npm.cmd run build
  ```
- Full verification pass (preflight + build + JS budget checks):
  ```bash
  # macOS / Linux
  npm run verify
  # Windows
  npm.cmd run verify
  ```
- Optional HTML Proofer parity check:
  ```bash
  # macOS / Linux
  npm run verify:html
  # Windows
  npm.cmd run verify:html
  ```

## Troubleshooting

### If Native Gems Fail on Windows

Run:
```powershell
ridk install
bundle pristine
bundle install
```

### If Ruby is not found after installation

Close all terminal windows and open a new shell session so the updated environment PATH is loaded.
