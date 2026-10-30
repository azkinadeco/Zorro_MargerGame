#!/bin/bash
set -e

REPO_URL="https://github.com/azkinadeco/Zorro_MargerGame.git"

echo "🐾 [1/4] Menyiapkan Git Repository Zorro Merge Cats..."
if [ ! -d ".git" ]; then
  git init
fi

git branch -M main

if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

echo "📦 [2/4] Menambahkan seluruh file game & konfigurasi Vercel..."
git add .
git commit -m "feat: Zorro Merge Cats Full Release (Piece of Cake Mechanics + F1-F10 Audit Complete)" || echo "Tidak ada perubahan baru untuk di-commit."

echo "🚀 [3/4] Push ke GitHub ($REPO_URL)..."
git push -u origin main --force

echo "🌐 [4/4] Deploy ke Vercel Production..."
npx vercel --prod --yes

echo "✅ Selesai! Game Zorro Merge Cats sudah live secara online!"
