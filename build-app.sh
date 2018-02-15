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
zip -r webshop-portal-soaring-through-the-cloud-native-sequel.zip .


