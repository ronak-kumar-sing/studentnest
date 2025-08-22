# Create directory structure
mkdir -p src/components/ui
mkdir -p src/pages
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/assets
mkdir -p public

# Create main files
touch src/main.jsx
touch src/App.jsx
touch src/index.css
touch vite.config.js
touch tailwind.config.js
touch postcss.config.js
touch .eslintrc.js
touch .prettierrc
touch public/index.html
touch README.md

# Create component files
touch src/components/Header.jsx
touch src/components/Footer.jsx
touch src/components/ui/Button.jsx
touch src/components/ui/Input.jsx

# Create page files
touch src/pages/Home.jsx
touch src/pages/About.jsx
touch src/pages/Contact.jsx

# Create service files
touch src/services/api.js

# Create utility files
touch src/utils/constants.js
touch src/utils/helpers.js

echo "React project structure created successfully!"