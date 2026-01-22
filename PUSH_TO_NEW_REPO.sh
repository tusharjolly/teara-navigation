#!/bin/bash
# Script to push code to new public repository

# Replace YOUR_NEW_REPO_NAME with the actual repository name you created
NEW_REPO_NAME="teara-navigation"

echo "Adding new remote..."
git remote add cloudflare https://github.com/tusharjolly/${NEW_REPO_NAME}.git

echo "Pushing to new repository..."
git push cloudflare main

echo "Done! Now connect this repository to Cloudflare Pages."
