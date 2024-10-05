#!/bin/bash -ex

# Install project dependencies
npm install
# Install fonts for OpenGraph image creation
mkdir -p ~/.fonts/silka
cp -r static/assets/fonts/silka/desktop/* ~/.fonts/silka/
fc-cache -fv
# Determine if REVIEW_ID is set  to select the correct URL
if [ -n "$REVIEW_ID" ]; then
  # Staging URL (Deploy Preview)
  SITE_URL="https://deploy-preview-${REVIEW_ID}--spyder-svelte-website-preview.netlify.app/"
elif [ "$NODE_ENV" = "production" ]; then
  # Production URL
  SITE_URL="https://www.spyder-ide.org/"
fi

# Export variables for the current shell
export PUBLIC_SITE_URL="$SITE_URL"

# Create a .env file for Vite
cat <<EOF > .env
PUBLIC_SITE_URL=${SITE_URL}
EOF

