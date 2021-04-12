export NODE_ENV=production
yarn build
touch dist/.nojekyll
git add dist/
git commit -m "New github pages deploy"
git subtree split --prefix dist -b gh-pages
git push -f origin gh-pages:gh-pages
git branch -D gh-pages
rm -rf dist