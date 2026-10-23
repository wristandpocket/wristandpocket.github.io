# Local Jekyll Setup

This project deploys through GitHub Actions, but local Jekyll and Node.js verification scripts are used for fast pre-push checks on both **macOS** and **Windows**.

## Runtime Baseline

- **Ruby:** `3.4.x` (pinned in `.ruby-version` and `.github/workflows/jekyll.yml`)
- **Bundler:** `2.x+`
- **Node.js:** `18+` / `20+` (used by `.frontmatter/scripts/*` and `scripts/*`)
- **Browser (for `verify:browser-320`):** Google Chrome, Chromium, Brave Browser, or Microsoft Edge

## macOS Setup (Apple Silicon / Intel)

You can use either **Homebrew Ruby 3.4** (`/opt/homebrew/opt/ruby@3.4/bin`) or **rbenv**. CI pins Ruby `3.4`; the unversioned Homebrew `ruby` formula is Ruby 4.x, where `bundle exec jekyll` fails with `cannot load such file -- ostruct`.

### Option A: Homebrew Ruby (Recommended on Apple Silicon MacBook)

1. **Install Ruby and Node.js via Homebrew**:
   ```bash
   brew install ruby@3.4 node
   ```
2. **Ensure Homebrew Ruby and Gems are on your `PATH`** (in `~/.zshrc`):
   ```bash
   export PATH="/opt/homebrew/opt/ruby@3.4/bin:/opt/homebrew/bin:$PATH"
   ```
3. **Install Bundler and repository gems**:
   ```bash
   gem install bundler
   bundle install
   ```

### Option B: rbenv

1. **Install `rbenv` and `ruby-build`**:
   ```bash
   brew install rbenv ruby-build
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
   source ~/.zshrc
   ```
2. **Install Ruby 3.4**:
   ```bash
   rbenv install 3.4.2
   rbenv local 3.4.2
   gem install bundler
   bundle install
   ```

## Windows Setup

Official references:

- Jekyll Windows install: https://jekyllrb.com/docs/installation/windows/
- RubyInstaller downloads: https://rubyinstaller.org/downloads/

1. **Install Ruby+Devkit 3.4.x** from RubyInstaller:
   - Keep `Add Ruby executables to your PATH` enabled.
   - Run the `ridk install` step at the end and select the default MSYS2/Devkit option.
   - Close and reopen PowerShell.

2. **Verify Ruby Tools & Install Site Gems**:
   ```powershell
   ruby --version
   bundle --version
   bundle install
   ```

## Local Preview

To run the local preview server:

```bash
bundle exec jekyll serve --livereload
```

Open:

```text
http://127.0.0.1:4000/
```

## Running Local Verification Checks

On **macOS / Linux** use `npm run <script>`; on **Windows PowerShell** use `npm.cmd run <script>`:

- **Static preflight** (front matter, 4-locale groups, permalinks, media assets):
  ```bash
  npm run preflight
  ```
- **Production Jekyll build** (`JEKYLL_ENV=production` with UTF-8 enforced):
  ```bash
  npm run build
  ```
- **Source & generated claim guard** (plus negative unit tests):
  ```bash
  npm run verify:source-claims
  npm run test:source-claims
  ```
- **Route, metadata, JSON-LD, anchor & sitemap audit** (plus mutation tests):
  ```bash
  npm run verify:routes
  npm run test:audit
  ```
- **Generated-site accessibility & JS budget checks**:
  ```bash
  npm run verify:quality
  npm run verify:js
  ```
- **320×568 headless browser smoke check** (uses installed Chrome/Chromium/Brave/Edge via DevTools Protocol):
  ```bash
  npm run verify:browser-320
  ```
- **HTMLProofer check**:
  ```bash
  npm run verify:html
  ```
- **Image format policy check** (WebP/SVG + approved PNG icons):
  ```bash
  npm run check:images
  ```
- **Full 10-step CI verification pipeline**:
  ```bash
  npm run verify
  ```

## Troubleshooting

### If Native Gems Fail on Windows

Run:
```powershell
ridk install
bundle pristine
bundle install
```

### If `npm run verify:html` Fails with `libcurl` Error 126 on Windows

This is a known Windows RubyInstaller/MSYS2 DLL search path limitation for `typhoeus`/`ethon`. Both macOS (`npm run verify:html`) and the Linux GitHub Actions workflow run HTMLProofer natively, and `npm run verify:routes` independently validates all internal targets, assets, and anchors via Nokogiri on every platform.
