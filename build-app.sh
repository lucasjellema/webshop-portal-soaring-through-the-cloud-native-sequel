#git clone https://github.com/lucasjellema/webshop-portal-soaring-through-the-cloud-native-sequel
# cd webshop-portal-soaring-through-the-cloud-native-sequel

git pull
wait

npm install
wait
ojet build --release
wait
cp -a ./web/. ./jet-on-node/public
wait
cd jet-on-node
wait
npm install
wait
zip -r webshop.zip .
wait
cd jet-on-node
wait
cd /oracle-cloud-psm-cli/webshop-portal-soaring-through-the-cloud-native-sequel/jet-on-node

psm accs push -n SoaringWebshopPortal -r node -s hourly -d deployment.json -p webshop.zip


