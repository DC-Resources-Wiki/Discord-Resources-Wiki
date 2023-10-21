---
title: योगदान
sidebar_postion: 3
slug: /योगदान
description: शुरुआती से लेकर बिजली उपयोगकर्ताओं तक सभी प्रकार के उपयोगकर्ताओं के लिए उपयोगी कलह संसाधनों और उपयोगिताओं की एक सूची।
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# योगदान

एक त्रुटि या एक टाइपो मिला? एक अच्छा संसाधन है जो इस सूची में फिट बैठता है? एक योगदानकर्ता बनें और ऊपर योगदानकर्ताओं की शानदार सूची में शामिल हों!

योगदान करने के लिए, इस विकी के पीआर में आपका स्वागत है या विकी को संपादित करने के लिए @755792681313108018 पर एक डीएम भेजें, और खुद को सूची में शामिल करें। आप वहां योगदान करने के लिए आधिकारिक [प्रोजेक्ट गिल्ड](https://discord.gg/yxbqz9pNxS) में भी शामिल हो सकते हैं।



## योगदानकर्ताओं

इस परियोजना ने एक से अधिक हाथों को हाथ में लिया, और हमें इस परियोजना में मदद करने वाले योगदानकर्ताओं की इस टीम पर गर्व है!<br/>
हम धन्यवाद देना चाहते हैं:<br/>
@795977947558182954 - विकी मेंटेनर <br/>
@885165099847929887 - <https://dis.wiki/> रीडायरेक्ट मालिक <br/>
@856780995629154305 - वेबसाइट मेंटेनर <br/>
@347727875266576395 - विकी आर्किटेक्ट <br/>
@391660873409888277 - विकी फिक्सर <br/>
@363481883369013259 - GitHub प्रबंधक / दस्तावेज़ीकरण आयोजक<br/>
@337654195526303746 - संसाधन शोधकर्ता / अनुरक्षक<br/>
@337104786593939456 - दस्तावेज़ीकरण आयोजक<br/>
@135877336804360194 - वेबसाइट मेंटेनर <br/>
@485676072176713729 - संसाधन शोधकर्ता / मेंटेनर<br/>
@762387276595724308 - संसाधन शोधकर्ता / मेंटेनर<br/>
@378537973215657984 - प्रोजेक्ट प्रबंधक / दस्तावेज़ीकरण आयोजक<br/>
@287711497118023692 - संसाधन शोधकर्ता / दस्तावेज़ीकरण आयोजक<br/>
@192060404501839872 - डिज़ाइनर<br/>
@386861188891279362 - वेबसाइट वास्तुकार / दस्तावेज़ीकरण आयोजक<br/>
@102102717165506560 - विकास सलाहकार / संसाधन संग्रहाध्यक्ष<br/>
@755792681313108018 - *मेरे पास यह विचार था और उपरोक्त सभी किया*
@480495309491798037 - <http://discord.wiki/> रीडायरेक्ट मालिक <br/>
@421991668556759042 - [PreMiD Presence](https://premid.app/store/presences/Discord%20Resources) निर्माता <br/>
@759301736686026752 - हिंदी अनुवादक | प्रभारी <br/>
@629016373636628493 - हिंदी अनुवादक <br/>
@472633151920013315 - हिंदी अनुवादक


## स्थानीय रूप से परिवर्तनों का परीक्षण कैसे करें

एक अच्छा पीआर चल रहा है लेकिन यह नहीं पता कि यह कैसा दिखता है? कोई समस्या नहीं!<br/>

आवश्यकताएँ हैं:<br/>
Node.js version >= ```16.5.0```<br/>

यदि आप यार्न का उपयोग कर रहे हैं:<br/>
Yarn version >= ```1.22.0```

गिटहब रेपो फोर्क करें और फिर इसे स्थानीय रूप से क्लोन करें।

```bash
git clone https://github.com/yourusername/Discord-Resources-Wiki
```

फिर, `Discord-Resources-Wiki` निर्देशिका खोलें और निम्नलिखित कमांड चलाएँ:

```mdx-code-block
<Tabs>
<TabItem value="npm">
```

```bash
npm install
```

```mdx-code-block
</TabItem>
<TabItem value="yarn">
```

```bash
yarn install
```

```mdx-code-block
</TabItem>
</Tabs>
```

यह हमारे प्रलेखन प्रणाली (डॉक्यूसॉरस) के लिए आवश्यक सभी रिपॉजिटरी को डाउनलोड करता है। आपको इसे केवल एक बार चलाने की आवश्यकता है।

वेबसाइट पर उपयोगकर्ता नाम देखने के लिए, आपको नया डिस्कॉर्ड एप्लिकेशन बनाना होगा और इसे एक बॉट के रूप में बनाना होगा।
नया एप्लिकेशन बनाने के लिए इस [link](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) का अनुसरण करें।

अपना नया बनाया हुआ बॉट टोकन प्राप्त करने के लिए, अपनी एप्लिकेशन सेटिंग में जाएं और "Bot" टैब पर क्लिक करें।
"Token" बटन पर क्लिक करें और आप अपना बॉट टोकन देखेंगे।

अब रूट डायरेक्टरी में .env नाम की नई फाइल बनाएं और निम्नलिखित पेस्ट करें:

```env
DISCORD_TOKEN=<tokenhere>
```

फाइल को सेव करे | 

स्थानीय रूप से अपने परिवर्तनों का परीक्षण करने के लिए, निम्न आदेश चलाएँ:

```mdx-code-block
<Tabs>
<TabItem value="npm">
```

```bash
npm start
```

```mdx-code-block
</TabItem>
<TabItem value="yarn">
```

```bash
yarn start
```

```mdx-code-block
</TabItem>
</Tabs>

यह कमांड वेब सर्वर (```localhost:3000``` डिफ़ॉल्ट रूप से) शुरू करता है और हर बार जब आप संपादन शुरू करना चाहते हैं तो इसे चलाया जाना चाहिए।
हालाँकि, आपके द्वारा किए गए प्रत्येक परिवर्तन के लिए इसे चलाने की आवश्यकता नहीं है, क्योंकि यदि परिवर्तनों का पता चलता है तो डॉक्यूसॉरस सर्वर को स्वचालित रूप से पुनरारंभ कर देगा!

एक बार जब आप स्थानीय रूप से वेबसाइट का चालू उदाहरण प्राप्त कर लेते हैं, तो आप योगदान देना शुरू करने के लिए तैयार हैं!
टिप्पणियाँ: कृपया लाइन ब्रेक वर्णों के लिए ```<br/>``` का उपयोग करें।