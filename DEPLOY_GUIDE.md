# Deploy your portfolio on GitHub Pages (free), step by step

Time needed: about 20–30 minutes the first time.
Your site will live at: **https://mi-sabbir4545.github.io**

---

## Step 0: Install two tools (one time)

1. **Git:** https://git-scm.com/downloads. Install it with the default options.
2. **Node.js 22 LTS:** https://nodejs.org. You only need it to run the tests on your own computer.

Check that both are installed. Open a terminal (Windows: "Git Bash" or PowerShell) and run:

```bash
git --version
node --version
```

## Step 1: Create the repository on GitHub

1. Log in to GitHub as **mi-sabbir4545**.
2. Click **+** (top right) → **New repository**.
3. For **Repository name**, type exactly: `mi-sabbir4545.github.io`
   (the name must match your username, or the URL will be different).
4. Choose **Public**.
5. Do **not** tick "Add a README". Leave the repo empty.
6. Click **Create repository**.

## Step 2: Turn on GitHub Pages with Actions

1. In the new repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's all. The workflow file in `.github/workflows/deploy.yml` does the rest.

## Step 3: Test the site on your computer (recommended)

Unzip `portfolio.zip`, open a terminal inside the unzipped folder and run:

```bash
npm install
npx playwright install chromium
npm test
```

You should see all tests pass. Then run `npm start` to open the site in your browser.

## Step 4: Upload the code

In the same folder, run:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/mi-sabbir4545/mi-sabbir4545.github.io.git
git push -u origin main
```

If Git asks you to log in, use your GitHub account. When it asks for a password, use a **Personal Access Token** or sign in through the browser window, not your normal password.

> **Don't want to use the terminal?** Install **GitHub Desktop** (https://desktop.github.com). Choose *File → Add local repository*, pick the folder, then click *Publish repository* with the name above.
> Avoid drag-and-drop upload on the GitHub website: it can skip the hidden `.github` folder, and then nothing will deploy.

## Step 5: Watch it deploy

1. Open the repo's **Actions** tab. You'll see a run called **Test & Deploy**.
2. It runs three jobs: **Playwright + axe**, **Lighthouse CI** and **Deploy to GitHub Pages**.
3. When all three are green (about 3–5 minutes), open **https://mi-sabbir4545.github.io**.

If a job is red, click it to see which test failed. The Playwright HTML report is attached under **Artifacts**.

## Step 6: Put the link everywhere

- **LinkedIn:** add the link under *Contact info → Website*, and add it to the **Featured** section.
- **GitHub profile:** pin the `mi-sabbir4545.github.io` repo. Recruiters will see the tests and the CI badge.
- **CV:** the link is already in the header.

## Updating later

1. Edit `site/assets/js/data.js`. All the website text is there.
2. Run `npm test`.
3. Push the change:

```bash
git add .
git commit -m "Update portfolio"
git push
```

The site updates automatically after the checks pass.

## Optional: custom domain (e.g. moinulislam.dev)

1. Buy a domain from any registrar (Namecheap, Cloudflare, Porkbun…).
2. In the repo, go to **Settings → Pages → Custom domain**, type the domain and save.
3. At your registrar, add the DNS records GitHub shows you. For a root domain these are four `A` records pointing to GitHub Pages; for `www`, a `CNAME` pointing to `mi-sabbir4545.github.io`.
4. When the domain works, tick **Enforce HTTPS**.
5. Update the URLs in `site/index.html` (canonical and og tags), `site/robots.txt` and `site/sitemap.xml`.

## Troubleshooting

| Problem | Fix |
|---|---|
| Site shows 404 | Check that the repo name is exactly `mi-sabbir4545.github.io` and that Pages → Source is **GitHub Actions** |
| Actions tab shows nothing | The `.github` folder wasn't uploaded. Push with Git or GitHub Desktop |
| "npm ci" fails | Make sure `package-lock.json` was uploaded too |
| Lighthouse job fails | Open the job log. It links to the full report and names the category that dropped |
| Old version still showing | Hard-refresh the browser (Ctrl+Shift+R); GitHub Pages can cache for a few minutes |
