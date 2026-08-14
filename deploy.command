#!/bin/bash
cd /Users/ethangarr/Documents/OnTimer/ontimer-website
git remote set-url origin git@github.com:EthanMGarr/ontimer-website.git
git push
echo ""
echo "✅ Pushed to GitHub — Vercel is deploying now."
echo "Press any key to close..."
read -n 1
