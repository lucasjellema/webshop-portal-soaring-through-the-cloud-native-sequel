 git clone https://github.com/lucasjellema/webshop-portal-soaring-through-the-cloud-native-sequel

 cd webshop-portal-soaring-through-the-cloud-native-sequel
 npm install
 ojet build --release

cp -a ./web/. ./jet-on-node/public

cd jet-on-node

npm install

zip -r webshop-portal-soaring-through-the-cloud-native-sequel.zip .
