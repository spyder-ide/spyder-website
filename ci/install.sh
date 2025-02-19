#!/bin/bash -ex

# Install project dependencies
npm install

# Install fonts for OpenGraph image creation
mkdir -p ~/.fonts/silka
cp -r static/assets/fonts/silka/desktop/* ~/.fonts/silka/
fc-cache -fv

# Determine if REVIEW_ID is set to select the URL to export
if [ -n "$REVIEW_ID" ]; then
  # Staging URL (Deploy Preview)
  SITE_URL="https://deploy-preview-${REVIEW_ID}--spyder-svelte-website-preview.netlify.app/"
else
  # Default to production URL if REVIEW_ID is empty or false
  SITE_URL="https://www.spyder-ide.org/"
fi

export PUBLIC_SITE_URL=$SITE_URL

# Create a .env file for Vite, only expose what's needed at build time
cat <<EOF > .env
PUBLIC_SITE_URL=${SITE_URL}
EOF

# Create a separate .env.local for development only (not committed to git)
if [ -n "$VITE_GITHUB_TOKEN" ]; then
  # Only write tokens if they exist in the environment
  cat <<EOF > .env.local
VITE_GITHUB_TOKEN=${VITE_GITHUB_TOKEN}
VITE_HUBSPOT_TOKEN=${VITE_HUBSPOT_TOKEN}
EOF
fi
