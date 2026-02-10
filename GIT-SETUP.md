# Git + GitHub setup for FlashcardsFinal

Follow these steps **in order** in the terminal. Do them from the project folder: `c:\Users\thoma\Downloads\FlashcardsFinal`.

---

## Step 1: Open terminal in the project folder

```powershell
cd "c:\Users\thoma\Downloads\FlashcardsFinal"
```

---

## Step 2: Initialize a Git repo (only for this project)

```powershell
git init
```

This creates a `.git` folder inside FlashcardsFinal. Your project is now a Git repository.

---

## Step 3: Set your name and email (if not already set globally)

Git needs this for every commit. Use the **same email** as your GitHub account if you want commits linked to your profile.

```powershell
git config user.name "Thomas Calabria"
git config user.email "your-github-email@example.com"
```

Replace `your-github-email@example.com` with the email you use on GitHub.

To only set it for this project (recommended for assignments), the commands above are correct. To set it for all repos on your computer, add `--global`:

```powershell
git config --global user.name "Thomas Calabria"
git config --global user.email "your-github-email@example.com"
```

---

## Step 4: Add files and make the first commit

```powershell
git add .
git status
```

You should see: App.js, index.js, app.json, assets/, package.json, etc. **Not** node_modules (it’s in .gitignore).

```powershell
git commit -m "Initial commit: Expo flashcard app with Material 3"
```

---

## Step 5: Create a new repository on GitHub

1. Go to **https://github.com** and sign in.
2. Click the **+** (top right) → **New repository**.
3. **Repository name:** e.g. `COMP-265-A1-Flashcards-Thomas-Calabria`
4. **Description:** optional (e.g. "Single-screen flashcard app - COMP-265 A1")
5. Choose **Public**.
6. **Do not** check "Add a README" or "Add .gitignore" — you already have files.
7. Click **Create repository**.

---

## Step 6: Connect your project to GitHub and push

GitHub will show you commands. Use these (replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repo name):

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

Example if your username is `tcalabria` and repo is `COMP-265-A1-Flashcards-Thomas-Calabria`:

```powershell
git remote add origin https://github.com/tcalabria/COMP-265-A1-Flashcards-Thomas-Calabria.git
git push -u origin main
```

---

## Step 7: When Git asks for your credentials

- **Option A – Browser (easiest):**  
  When you run `git push`, Windows may open a browser or a credential window. Sign in with your **GitHub account**. That links this machine to GitHub.

- **Option B – Personal Access Token (PAT):**  
  If it asks for a **password**, GitHub no longer accepts your account password. You must use a **Personal Access Token**:
  1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
  2. **Generate new token (classic)**. Give it a name, set an expiry, check **repo**.
  3. Copy the token. When Git asks for **password**, paste the token (not your GitHub password).

After a successful push, your code is on GitHub and your assignment folder has a proper `.git` with history.

---

## Optional: More commits (for “frequent commits” on the rubric)

You can add more commits as you work, for example:

```powershell
git add App.js
git commit -m "Add Material 3 styling and Picker"
git push
```

---

## For submission: ZIP including .git

When you create the ZIP for Brightspace:

1. Include **everything** in `FlashcardsFinal` **except** `node_modules`.
2. **Include** the `.git` folder (so the marker can see your Git history).

If you use Windows “Send to → Compressed folder,” make sure the parent folder you zip is `FlashcardsFinal` and that the ZIP contains `.git` and your source files, but not `node_modules`.
