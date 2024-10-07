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
  # Default to production URL if both REVIEW_ID and NODE_ENV are empty or false
  SITE_URL="https://www.spyder-ide.org/"
fi

export PUBLIC_SITE_URL=$SITE_URL

# Create a .env file for Vite
cat <<EOF > .env
PUBLIC_SITE_URL=${SITE_URL}
EOF
