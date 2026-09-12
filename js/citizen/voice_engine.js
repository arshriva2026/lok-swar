// js/citizen/voice_engine.js - Voice Assistant Guidance Engine & Dictionary
(function() {
const GUIDANCE_DICTIONARY = {
    welcome: {
      hi: {
        display: "लोक स्वर में आपका स्वागत है। स्क्रीन पर कहीं भी क्लिक करें, मैं बोलकर आपका मार्गदर्शन करूँगा।",
        spoken: "लोक स्वर में आपका स्वागत है। स्क्रीन पर कहीं भी क्लिक करें, मैं बोलकर आपका मार्गदर्शन करूँगा।",
        enSub: "Welcome to Lok Swar. Tap anywhere on the page and the voice assistant will guide you through speech."
      },
      bho: {
        display: "लोक स्वर में रउआ के स्वागत बा। स्क्रीन पर कहीं भी क्लिक करब, हम बोल के बताएम।",
        spoken: "लोक स्वर में रउआ के स्वागत बा। स्क्रीन पर कहीं भी क्लिक करब, हम बोल के बताएम।",
        enSub: "Welcome to Lok Swar. Tap anywhere for speech guidance in Bhojpuri."
      },
      or: {
        display: "ଲୋକ ସ୍ୱର ପୋର୍ଟାଲକୁ ସ୍ୱାଗତ। ସ୍କ୍ରିନରେ ଯେକୌଣସି ସ୍ଥାନରେ କ୍ଲିକ୍ କରନ୍ତୁ, ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବ।",
        spoken: "ଲୋକ ସ୍ୱର ପୋର୍ଟାଲକୁ ସ୍ୱାଗତ। ସ୍କ୍ରିନରେ ଯେକୌଣସି ସ୍ଥାନରେ କ୍ଲିକ୍ କରନ୍ତୁ, ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବ।",
        enSub: "Welcome to Lok Swar. Tap anywhere for speech guidance in Odia."
      },
      bn: {
        display: "লোক স্বর পোর্টালে স্বাগতম। স্ক্রিনে যেকোনো স্থানে ক্লিক করলে ভয়েস অ্যাসিস্ট্যান্ট আপনাকে সাহায্য করবে।",
        spoken: "লোক স্বর পোর্টালে স্বাগতম। স্ক্রিনে যেকোনো স্থানে ক্লিক করলে ভয়েস অ্যাসিস্ট্যান্ট আপনাকে সাহায্য করবে।",
        enSub: "Welcome to Lok Swar. Tap anywhere for speech guidance in Bengali."
      },
      en: {
        display: "Welcome to Lok Swar. Tap anywhere on the page and the voice assistant will guide you through speech.",
        spoken: "Welcome to Lok Swar. Tap anywhere on the page and the voice assistant will guide you through speech.",
        enSub: "Voice guidance active. Tap any element to hear its description."
      }
    },
    search_input: {
      hi: {
        display: "शिकायत इनपुट बॉक्स: अपनी समस्या लिखें या माइक बटन दबाकर बोलें।",
        spoken: "यह शिकायत लिखने का मुख्य बॉक्स है। अपनी समस्या टाइप करें या माइक बटन दबाकर बोलें।",
        enSub: "Grievance input box: Type or speak your civic problem here."
      },
      bho: {
        display: "समस्या इनपुट बॉक्स: आपन समस्या लिखीं भा माइक दबा के बोलीं।",
        spoken: "ई समस्या लिखे के मुख्य बॉक्स बा। आपन समस्या लिखीं भा माइक दबा के बोलीं।",
        enSub: "Grievance input box in Bhojpuri."
      },
      or: {
        display: "ଅଭିଯୋଗ ଇନପୁଟ୍ ବକ୍ସ: ଆପଣଙ୍କ ସମସ୍ୟା ଟାଇପ୍ କରନ୍ତୁ କିମ୍ବା ମାଇକ୍ ଦବାଇ କୁହନ୍ତୁ।",
        spoken: "ଏହା ଅଭିଯୋଗ ଲେଖିବା ପାଇଁ ମୁଖ୍ୟ ବକ୍ସ। ଆପଣଙ୍କ ସମସ୍ୟା ଟାଇପ୍ କରନ୍ତୁ କିମ୍ବା ମାଇକ୍ ଦବାଇ କୁହନ୍ତୁ।",
        enSub: "Grievance input box in Odia."
      },
      bn: {
        display: "অভিযোগ লেখার বাক্স: আপনার समस्या टाइप করুন বা মাইক চেপে বলুন।",
        spoken: "এটি অভিযোগ লেখার মূল বাক্স। আপনার समस्या टाइप করুন বা মাইক চেপে বলুন।",
        enSub: "Grievance input box in Bengali."
      },
      en: {
        display: "Grievance Input Box: Type your issue or tap the microphone to speak.",
        spoken: "This is the main complaint box. Type your issue or tap the microphone to speak.",
        enSub: "Primary input bar for civic grievances."
      }
    },
    mic_button: {
      hi: {
        display: "माइक रिकॉर्डिंग: अपनी क्षेत्रीय भाषा में समस्या बोलने के लिए यहाँ क्लिक करें।",
        spoken: "माइक रिकॉर्डिंग बटन। अपनी क्षेत्रीय भाषा में समस्या बोलने के लिए यहाँ क्लिक करें।",
        enSub: "Microphone recording: Speak your issue in your local dialect."
      },
      bho: {
        display: "माइक बटन: आपन भाषा में समस्या बोले खातिर क्लिक करीं।",
        spoken: "माइक बटन। आपन भाषा में समस्या बोले खातिर क्लिक करीं।",
        enSub: "Tap to record voice in Bhojpuri."
      },
      or: {
        display: "ମାଇକ୍ ରେକର୍ଡିଂ: ନିଜ ଭାଷାରେ ସମସ୍ୟା କହିବା ପାଇଁ ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
        spoken: "ମାଇକ୍ ରେକର୍ଡିଂ ବଟନ୍। ନିଜ ଭାଷାରେ ସମସ୍ୟା କହିବା ପାଇଁ ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
        enSub: "Tap to record voice in Odia."
      },
      bn: {
        display: "মাইক রেকর্ডিং: নিজের ভাষায় समस्या বলতে এখানে ক্লিক করুন।",
        spoken: "মাইক রেকর্ডিং বোতাম। নিজের ভাষায় সমস্যা বলতে এখানে ক্লিক করুন।",
        enSub: "Tap to record voice in Bengali."
      },
      en: {
        display: "Microphone Recording: Click to speak your civic issue.",
        spoken: "Microphone recording button. Click to record your issue in your spoken language.",
        enSub: "Click to record voice grievance."
      }
    },
    submit_button: {
      hi: {
        display: "रिपोर्ट जमा करें: अपनी नागरिक शिकायत आधिकारिक पोर्टल पर दर्ज करने के लिए यहाँ दबाएं।",
        spoken: "रिपोर्ट जमा करने का बटन। अपनी शिकायत आधिकारिक सरकारी पोर्टल पर दर्ज करने के लिए यहाँ दबाएं।",
        enSub: "Submit grievance report to official public ledger."
      },
      bho: {
        display: "रिपोर्ट जमा करीं: पोर्टल पर शिकायत दर्ज करे खातिर दबाईं।",
        spoken: "रिपोर्ट जमा करे के बटन। सरकारी पोर्टल पर शिकायत दर्ज करे खातिर दबाईं।",
        enSub: "Submit report in Bhojpuri."
      },
      or: {
        display: "ରିପୋର୍ଟ ଦାଖଲ: ସରକାରୀ ପୋର୍ଟାଲରେ ଅଭିଯୋଗ ଦାଖଲ କରିବାକୁ ଏଠାରେ ଦବାନ୍ତୁ।",
        spoken: "ରିପୋର୍ଟ ଦାଖଲ ବଟନ୍। ସରକାରୀ ପୋର୍ଟାଲରେ ଅଭିଯୋଗ ଦାଖଲ କରିବାକୁ ଏଠାରେ ଦବାନ୍ତୁ।",
        enSub: "Submit report in Odia."
      },
      bn: {
        display: "রিপোর্ট জমা দিন: পোর্টালে আপনার অভিযোগ দায়ের করতে এখানে চাপুন।",
        spoken: "রিপোর্ট জমা দিন বোতাম। সরকারি পোর্টালে আপনার অভিযোগ দায়ের করতে এখানে চাপুন।",
        enSub: "Submit report in Bengali."
      },
      en: {
        display: "Submit Report: Tap to officially file your civic complaint.",
        spoken: "Submit Report button. Tap to officially submit your complaint to the government portal.",
        enSub: "Official filing button."
      }
    },
    camera_button: {
      hi: {
        display: "कैमरा बटन: समस्या का फोटो या दृश्य साक्ष्य अपलोड करने के लिए यहाँ क्लिक करें।",
        spoken: "कैमरा बटन। समस्या की फोटो या दृश्य साक्ष्य अपलोड करने के लिए यहाँ क्लिक करें।",
        enSub: "Upload photographic evidence of the issue."
      },
      bho: {
        display: "कैमरा बटन: समस्या के फोटो अपलोड करे खातिर क्लिक करीं।",
        spoken: "कैमरा बटन। समस्या के फोटो अपलोड करे खातिर क्लिक करीं।",
        enSub: "Upload photo in Bhojpuri."
      },
      or: {
        display: "କ୍ୟାମେରା ବଟନ୍: ସମସ୍ୟାର ଫଟୋ କିମ୍ବା ପ୍ରମାଣ ଅପଲୋଡ୍ କରନ୍ତୁ।",
        spoken: "କ୍ୟାମେରା ବଟନ୍। ସମସ୍ୟାର ଫଟୋ କିମ୍ବା ପ୍ରମାଣ ଅପଲୋଡ୍ କରିବାକୁ ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
        enSub: "Upload photo in Odia."
      },
      bn: {
        display: "ক্যামেরা বোতাম: সমস্যার ছবি বা প্রমাণ আপলোড করতে এখানে ক্লিক করুন।",
        spoken: "ক্যামেরা বোতাম। সমস্যার ছবি বা প্রমাণ আপলোড করতে এখানে ক্লিক করুন।",
        enSub: "Upload photo in Bengali."
      },
      en: {
        display: "Camera Button: Upload photo or evidence of the civic issue.",
        spoken: "Camera button. Click to upload photos or evidence of the civic issue.",
        enSub: "Upload photographic proof."
      }
    },
    translate_chip: {
      hi: {
        display: "भाषा अनुवाद: क्षेत्रीय भाषा को अंग्रेज़ी में बदलने के लिए यहाँ क्लिक करें।",
        spoken: "भाषा अनुवाद बटन। क्षेत्रीय भाषा को अंग्रेज़ी में बदलने के लिए यहाँ क्लिक करें।",
        enSub: "Translate regional text into English."
      },
      en: {
        display: "Translation Button: Converts regional dialect to English.",
        spoken: "Translation button. Converts your regional language input into English.",
        enSub: "Real-time AI translation."
      }
    },
    undo_button: {
      hi: {
        display: "पूर्ववत करें: अनुवाद हटाकर मूल क्षेत्रीय शब्दों पर वापस जाने के लिए क्लिक करें।",
        spoken: "पूर्ववत करें बटन। अनुवाद हटाकर अपने मूल क्षेत्रीय शब्दों पर वापस जाने के लिए क्लिक करें।",
        enSub: "Revert back to your original regional input."
      },
      en: {
        display: "Undo Translation: Restore your original typed words.",
        spoken: "Undo translation button. Revert back to your original input.",
        enSub: "Reverts to original text."
      }
    },
    card_roads: {
      hi: {
        display: "सड़क एवं बुनियादी ढांचा: टूटी सड़कों, गड्ढों, पुलों और जल निकासी की शिकायतें।",
        spoken: "सड़क एवं बुनियादी ढांचा अनुभाग। टूटी सड़कों, गड्ढों, पुलों और जल निकासी की शिकायतें यहाँ देखें और दर्ज करें।",
        enSub: "Roads and Infrastructure: Report broken roads, potholes, bridges, and drainage works."
      },
      bho: {
        display: "सड़क आ बुनियादी ढांचा: टूटल सड़क, पुल आ पानी निकासी के समस्या।",
        spoken: "सड़क आ बुनियादी ढांचा। टूटल सड़क, पुल आ पानी निकासी के समस्या इहवाँ दर्ज करीं।",
        enSub: "Roads and Infrastructure in Bhojpuri."
      },
      or: {
        display: "ରାସ୍ତା ଏବଂ ଭିତ୍ତିଭୂମି: ଭଙ୍ଗା ରାସ୍ତା, ଖାଲ, ପୋଲ ଏବଂ ଜଳ ନିଷ୍କାସନ ସମସ୍ୟା।",
        spoken: "ରାସ୍ତା ଏବଂ ଭିତ୍ତିଭୂମି ବିଭାଗ। ଭଙ୍ଗା ରାସ୍ତା, ଖାଲ, ପୋଲ ଏବଂ ଜଳ ନିଷ୍କାସନ ସମସ୍ୟା ଦେଖନ୍ତୁ ଓ ଦାଖଲ କରନ୍ତୁ।",
        enSub: "Roads and Infrastructure in Odia."
      },
      bn: {
        display: "রাস্তা ও পরিকাঠামো: ভাঙা রাস্তা, গর্ত ও নিকাশী ব্যবস্থার অভিযোগ।",
        spoken: "রাস্তা ও পরিকাঠামো বিভাগ। ভাঙা রাস্তা, গর্ত ও নিকাশী ব্যবস্থার অভিযোগ এখানে জানান।",
        enSub: "Roads and Infrastructure in Bengali."
      },
      en: {
        display: "Roads & Infrastructure: PWD, PMGSY, and connectivity works.",
        spoken: "Roads and Infrastructure section. Report broken roads, potholes, bridges, and drainage works.",
        enSub: "Explore civil works and road maintenance."
      }
    },
    card_progress: {
      hi: {
        display: "प्रगति एवं जन समर्थन: चालू विकास कार्यों की स्थिति देखें और समर्थन दें।",
        spoken: "प्रगति एवं जन समर्थन अनुभाग। इलाके के चालू विकास कार्यों की स्थिति देखें और प्राथमिकताओं को वोट दें।",
        enSub: "Progress & Upvotes: Community priorities and live civic support."
      },
      bho: {
        display: "प्रगति आ जन समर्थन: चालू कामन के स्थिति देखीं आ समर्थन दिहीं।",
        spoken: "प्रगति आ जन समर्थन। चालू विकास कामन के स्थिति देखीं आ वोट दिहीं।",
        enSub: "Progress & Upvotes in Bhojpuri."
      },
      or: {
        display: "ପ୍ରଗତି ଏବଂ ଜନ ସମର୍ଥନ: ଚାଲୁଥିବା ବିକାଶ କାର୍ଯ୍ୟ ଦେଖନ୍ତୁ ଏବଂ ସମର୍ଥନ ଦିଅନ୍ତୁ।",
        spoken: "ପ୍ରଗତି ଏବଂ ଜନ ସମର୍ଥନ। ଚାଲୁଥିବା କାର୍ଯ୍ୟର ସ୍ଥିତି ଦେଖନ୍ତୁ ଏବଂ ସମର୍ଥନ ଦିଅନ୍ତୁ।",
        enSub: "Progress & Upvotes in Odia."
      },
      bn: {
        display: "অগ্রগতি ও জনসমর্থন: চলমান উন্নয়ন কাজের স্থিতি দেখুন এবং ভোট দিন।",
        spoken: "অগ্রগতি ও জনসমর্থন। চলমান উন্নয়ন কাজের স্থিতি দেখুন এবং অগ্রাধিকার দিন।",
        enSub: "Progress & Upvotes in Bengali."
      },
      en: {
        display: "Progress & Upvotes: Community priorities and live civic support.",
        spoken: "Progress and Public Support section. Track active projects and upvote community priorities.",
        enSub: "Citizen upvoting and priority tracking."
      }
    },
    card_gis: {
      hi: {
        display: "ग्राम जीआईएस हॉटस्पॉट: उपग्रह मानचित्र पर समस्याओं के जीपीएस पिन देखें।",
        spoken: "ग्राम जीआईएस हॉटस्पॉट मानचित्र। उपग्रह मानचित्र पर अपने इलाके की समस्याओं के जीपीएस लोकेशन पिन देखें।",
        enSub: "Village GIS Hotspot: View geospatial incident clusters on satellite maps."
      },
      bho: {
        display: "ग्राम जीआईएस हॉटस्पॉट: नक्शा पर इलाका के समस्या के पिन देखीं।",
        spoken: "ग्राम जीआईएस हॉटस्पॉट। नक्शा पर इलाका के समस्या के जीपीएस पिन देखीं।",
        enSub: "GIS Hotspot in Bhojpuri."
      },
      or: {
        display: "ଗ୍ରାମ ଜିଆଇଏସ୍ ହଟସ୍ପଟ୍: ମ୍ୟାପ୍ ରେ ଆପଣଙ୍କ ଅଞ୍ଚଳର ସମସ୍ୟାଗୁଡ଼ିକ ଦେଖନ୍ତୁ।",
        spoken: "ଗ୍ରାମ ଜିଆଇଏସ୍ ହଟସ୍ପଟ୍ ମ୍ୟାପ୍। ମାନଚିତ୍ରରେ ଆପଣଙ୍କ ଅଞ୍ଚଳର ସମସ୍ୟାଗୁଡ଼ିକର ଜିପିଏସ୍ ପିନ୍ ଦେଖନ୍ତୁ।",
        enSub: "GIS Hotspot in Odia."
      },
      bn: {
        display: "গ্রাম জিআইএস হটস্পট: স্যাটেলাইট মানচিত্রে সমস্যার অবস্থান দেখুন।",
        spoken: "গ্রাম জিআইএস হটস্পট মানচিত্র। স্যাটেলাইট মানচিত্রে সমস্যার জিপিএস অবস্থান দেখুন।",
        enSub: "GIS Hotspot in Bengali."
      },
      en: {
        display: "Village GIS Hotspot: Satellite map and verified evidence coordinates.",
        spoken: "Village GIS Hotspot map. View geospatial incident clusters and live telemetry on the map.",
        enSub: "Geographic incident clustering."
      }
    },
    card_profile: {
      hi: {
        display: "नागरिक सेवाएं व प्रोफ़ाइल: आधार ई-केवाईसी, डिजीलॉकर और पूर्व शिकायतों की स्थिति।",
        spoken: "नागरिक सेवाएं व प्रोफ़ाइल। अपना आधार ई-केवाईसी, डिजीलॉकर और अपनी पूर्व शिकायतों की स्थिति देखें।",
        enSub: "Citizen Services & Profile: Aadhaar e-KYC and past complaint tracking."
      },
      bho: {
        display: "नागरिक सेवा आ प्रोफाइल: आधार सत्यापन आ पुरान शिकायतन के स्थिति।",
        spoken: "नागरिक सेवा आ प्रोफाइल। आधार सत्यापन आ पुरान शिकायतन के स्थिति देखीं।",
        enSub: "Citizen Profile in Bhojpuri."
      },
      or: {
        display: "ନାଗରିକ ସେବା ଓ ପ୍ରୋଫାଇଲ୍: ଆଧାର ଇ-କେୱାଇସି ଏବଂ ପୂର୍ବ ଅଭିଯୋଗର ସ୍ଥିତି।",
        spoken: "ନାଗରିକ ସେବା ଓ ପ୍ରୋଫାଇଲ୍। ଆଧାର ଇ-କେୱାଇସି ଏବଂ ପୂର୍ବ ଅଭିଯୋଗର ସ୍ଥିତି ଦେଖନ୍ତୁ।",
        enSub: "Citizen Profile in Odia."
      },
      bn: {
        display: "নাগরিক পরিষেবা ও প্রোফাইল: আধার ই-কেওয়াইসি এবং পূর্বের অভিযোগের স্থিতি দেখুন।",
        spoken: "নাগরিক পরিষেবা ও প্রোফাইল। আধার ই-কেওয়াইসি এবং আপনার পূর্বের অভিযোগের স্থিতি দেখুন।",
        enSub: "Citizen Profile in Bengali."
      },
      en: {
        display: "Citizen Services & Profile: Aadhaar e-KYC and DigiLocker identity verification.",
        spoken: "Citizen Services and Profile. View your Aadhaar e-KYC, DigiLocker, and past grievance history.",
        enSub: "Profile, credentials, and ledger history."
      }
    },
    location_pill: {
      hi: {
        display: "लाइव स्थान: वर्तमान सत्यापित जीपीएस क्षेत्र।",
        spoken: "लाइव स्थान। यह आपका वर्तमान जीपीएस क्षेत्र प्रदर्शित कर रहा है।",
        enSub: "Live Location: Displays your verified GPS detected location."
      },
      en: {
        display: "Live Location: Displays your verified GPS detected location.",
        spoken: "Live Location. Displays your verified GPS detected location.",
        enSub: "Verified telemetry zone."
      }
    },
    refresh_gps: {
      hi: {
        display: "जीपीएस रिफ्रेश: उपग्रह जीपीएस निर्देशांक पुनः प्राप्त किए जा रहे हैं।",
        spoken: "जीपीएस रिफ्रेश बटन। वर्तमान उपग्रह जीपीएस निर्देशांक पुनः प्राप्त करने के लिए क्लिक किया गया।",
        enSub: "Refreshing live GPS satellite telemetry."
      },
      en: {
        display: "Refresh GPS: Updating live satellite coordinates.",
        spoken: "Refresh GPS button. Updating your live coordinates and area name.",
        enSub: "GPS telemetry refresh."
      }
    },
    change_location: {
      hi: {
        display: "स्थान बदलें: अपनी ग्राम पंचायत, वार्ड या जिला मैन्युअल रूप से चुनें।",
        spoken: "स्थान बदलने का विकल्प। अपनी ग्राम पंचायत, वार्ड या जिला मैन्युअल रूप से चुनने के लिए क्लिक करें।",
        enSub: "Change Location: Select your Gram Panchayat or Ward manually."
      },
      en: {
        display: "Change Location: Select your Gram Panchayat, Ward, or District.",
        spoken: "Change Location. Select your Gram Panchayat, Ward, or District manually.",
        enSub: "Manual administrative zone selector."
      }
    },
    lang_selector: {
      hi: {
        display: "भाषा चयन: अपनी पसंदीदा भाषा हिन्दी, ओडिया, भोजपुरी, बांग्ला या अंग्रेजी चुनें।",
        spoken: "भाषा बदलने का मेनू। हिन्दी, ओडिया, भोजपुरी, बांग्ला या अंग्रेजी का चयन करें।",
        enSub: "Language selector: Choose Hindi, Odia, Bhojpuri, Bengali, or English."
      },
      en: {
        display: "Language Selector: Choose Hindi, Odia, Bhojpuri, Bengali, or English.",
        spoken: "Language selector. Choose your preferred language.",
        enSub: "Select portal interface language."
      }
    },
    theme_toggle: {
      hi: {
        display: "थीम बटन: डार्क मोड या लाइट मोड पर स्विच करें।",
        spoken: "थीम बदलने का बटन। डार्क मोड या लाइट मोड पर स्विच करें।",
        enSub: "Theme toggle: Switch between dark mode and light mode."
      },
      en: {
        display: "Theme Toggle: Switch between dark mode and light mode.",
        spoken: "Theme toggle. Switch between dark mode and light mode.",
        enSub: "Color appearance mode switch."
      }
    },
    notifications: {
      hi: {
        display: "सूचनाएं: आपकी शिकायतों पर हुई प्रशासनिक कार्रवाई की ताज़ा सूचनाएं।",
        spoken: "सूचनाएं। आपकी शिकायतों पर हुई ताज़ा प्रशासनिक कार्रवाई की सूचनाएं यहाँ देखें।",
        enSub: "Notifications: Real-time action alerts on your complaints."
      },
      en: {
        display: "Notifications: Real-time action alerts on your complaints.",
        spoken: "Notifications. Check status updates and actions on your grievances.",
        enSub: "Official status alerts."
      }
    },
    profile_nav: {
      hi: {
        display: "नागरिक प्रोफ़ाइल: आपकी व्यक्तिगत जानकारी और डिजीलॉकर खाता।",
        spoken: "नागरिक प्रोफ़ाइल। आपकी व्यक्तिगत जानकारी और डिजीलॉकर सत्यापन रिकॉर्ड।",
        enSub: "Citizen Profile: Account credentials and DigiLocker credentials."
      },
      en: {
        display: "Citizen Profile: Account credentials and DigiLocker credentials.",
        spoken: "Citizen Profile. Access your personal account and DigiLocker records.",
        enSub: "View profile details."
      }
    },
    helpline: {
      hi: {
        display: "हेल्पलाइन: राष्ट्रीय सेवा 1947 या जिला सेवा पर सीधे संपर्क करें।",
        spoken: "सरकारी आपातकालीन हेल्पलाइन नंबर। राष्ट्रीय सेवा 1947 या जिला सेवा पर सीधे संपर्क करें।",
        enSub: "Official emergency helplines: National 1947 & District support."
      },
      en: {
        display: "Official Helplines: National 1947 and district support.",
        spoken: "Official emergency helplines. National helpline 1947 and district support.",
        enSub: "Direct emergency assistance."
      }
    },
    font_zoom: {
      hi: {
        display: "फ़ॉन्ट आकार: स्क्रीन के अक्षरों को बड़ा या छोटा करें।",
        spoken: "फ़ॉन्ट आकार विकल्प। स्क्रीन के अक्षरों को बड़ा या छोटा करें।",
        enSub: "Font size adjustment for comfortable reading."
      },
      en: {
        display: "Font Size: Adjust text size for comfortable reading.",
        spoken: "Font size controls. Adjust text size for comfortable reading.",
        enSub: "Accessibility zoom controls."
      }
    },
    radar_filter: {
      hi: {
        display: "दूरी दायरा: अपने आस-पास के 2 किमी, 5 किमी या 10 किमी की समस्याएं देखें।",
        spoken: "दूरी दायरा। अपने आस-पास के चुने हुए दायरे की समस्याएं देखें।",
        enSub: "Distance radar filter: View issues within your selected radius."
      },
      en: {
        display: "Distance Radar: Filter complaints by geographic radius.",
        spoken: "Distance radar filter. View issues within your selected radius.",
        enSub: "Spatial distance scope."
      }
    },
    data_fusion: {
      hi: {
        display: "डेटा संलयन: उपग्रह चित्रों और जमीनी साक्ष्यों का एआई मिलान।",
        spoken: "डेटा संलयन विश्लेषण। उपग्रह चित्रों और जमीनी साक्ष्यों का एआई मिलान।",
        enSub: "Multi-Source Ground Truth Data Fusion Suite."
      },
      en: {
        display: "Data Fusion: Multi-sensor satellite and drone verification.",
        spoken: "Data Fusion analysis. AI verification across satellite, field, and citizen data.",
        enSub: "Multimodal truth engine."
      }
    },
    page_guide: {
      hi: {
        display: "लोक स्वर गाइड: बोलकर या लिखकर शिकायत दर्ज करें, नक्शा देखें और जन प्राथमिकताओं को समर्थन दें।",
        spoken: "लोक स्वर मुख्य पृष्ठ पर आपका स्वागत है। यहाँ आप अपनी समस्या बोलकर या लिखकर दर्ज कर सकते हैं, वास्तविक समय में अनुवाद प्राप्त कर सकते हैं, अपने क्षेत्र के नक्शे पर समस्याएं देख सकते हैं और चल रहे कार्यों को समर्थन दे सकते हैं।",
        enSub: "Lok Swar Portal Tour: Voice or text grievance intake, GIS maps, and community progress."
      },
      bho: {
        display: "लोक स्वर गाइड: बोल के भा लिख के शिकायत दर्ज करीं, नक्शा देखीं आ समर्थन दिहीं।",
        spoken: "लोक स्वर मुख्य पृष्ठ पर स्वागत बा। इहवाँ रउआ आपन समस्या बोल के चाहे लिख के दर्ज कर सकत बानी। नक्शा पर आपन क्षेत्र देखीं।",
        enSub: "Portal tour in Bhojpuri."
      },
      or: {
        display: "ଲୋକ ସ୍ୱର ଗାଇଡ୍: ସମସ୍ୟା କହି କିମ୍ବା ଲେଖି ଦାଖଲ କରନ୍ତୁ, ମ୍ୟାପ୍ ଦେଖନ୍ତୁ ଓ ସମର୍ଥନ ଦିଅନ୍ତୁ।",
        spoken: "ଲୋକ ସ୍ୱର ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ସ୍ୱାଗତ। ଏଠାରେ ଆପଣ ସମସ୍ୟା କହି କିମ୍ବା ଲେଖି ଦାଖଲ କରିପାରିବେ ଏବଂ ମ୍ୟାପ୍ ରେ ଦେଖିପାରିବେ।",
        enSub: "Portal tour in Odia."
      },
      bn: {
        display: "লোক স্বর গাইড: সমস্যা বলে বা লিখে নথিভুক্ত করুন, মানচিত্র দেখুন ও ভোট দিন।",
        spoken: "লোক স্বর প্রধান পৃষ্ঠায় স্বাগতম। এখানে আপনি समस्या বলে বা লিখে নথিভুক্ত করতে পারেন மற்றும் মানচিত্রে দেখতে পারেন।",
        enSub: "Portal tour in Bengali."
      },
      en: {
        display: "Lok Swar Tour: Voice or text complaints, GIS maps, and community progress.",
        spoken: "Welcome to the Lok Swar main portal. Here you can voice or write your civic issues with instant translation, view geographic hotspots, and track community progress.",
        enSub: "Audio guided tour of portal capabilities."
      }
    },
    voice_toggle_on: {
      hi: {
        display: "आवाज सहायक चालू है। स्क्रीन पर कहीं भी क्लिक करें, मैं आपको बोलकर मार्गदर्शन दूंगा।",
        spoken: "आवाज सहायक चालू है। अब आप स्क्रीन पर जहाँ भी क्लिक करेंगे, मैं आपको बोलकर मार्गदर्शन दूंगा।",
        enSub: "Voice Assistant active. Spoken guidance enabled on every click."
      },
      bho: {
        display: "आवाज सहायक चालू बा। स्क्रीन पर कहीं भी क्लिक करब, हम बोल के बताएम।",
        spoken: "आवाज सहायक चालू बा। अब स्क्रीन पर जहाँ भी क्लिक करब, हम बोल के बताएम।",
        enSub: "Voice Assistant active in Bhojpuri."
      },
      or: {
        display: "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ ସକ୍ରିୟ ଅଛି। ଆପଣ ସ୍କ୍ରିନରେ ଯେଉଁଠି ବି କ୍ଲିକ୍ କରିବେ, ମୁଁ କହିକି ସାହାଯ୍ୟ କରିବି।",
        spoken: "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ ସକ୍ରିୟ ଅଛି। ଆପଣ ସ୍କ୍ରିନରେ ଯେଉଁଠି ବି କ୍ଲିକ୍ କରିବେ, ମୁଁ କହିକି ସାହାଯ୍ୟ କରିବି।",
        enSub: "Voice Assistant active in Odia."
      },
      bn: {
        display: "ভয়েস অ্যাসিস্ট্যান্ট সক্রিয় হয়েছে। আপনি স্ক্রিনে যেখানেই ক্লিক করবেন, আমি বলে পথ দেখাব।",
        spoken: "ভয়েস অ্যাসিস্ট্যান্ট সক্রিয় হয়েছে। আপনি স্ক্রিনে যেখানেই ক্লিক করবেন, আমি বলে পথ দেখাব।",
        enSub: "Voice Assistant active in Bengali."
      },
      en: {
        display: "Voice Assistant is active. Wherever you click on the page, I will guide you through speech.",
        spoken: "Voice Assistant is active. Wherever you click on the page, I will guide you through speech.",
        enSub: "Spoken guidance active on every click."
      }
    },
    voice_toggle_off: {
      hi: {
        display: "आवाज सहायक म्यूट कर दिया गया है।",
        spoken: "आवाज सहायक म्यूट कर दिया गया है। पुनः चालू करने के लिए आवाज गाइड पर क्लिक करें।",
        enSub: "Voice Assistant muted."
      },
      bho: {
        display: "आवाज सहायक म्यूट कइल गइल बा।",
        spoken: "आवाज सहायक म्यूट कइल गइल बा।",
        enSub: "Voice Assistant muted in Bhojpuri."
      },
      or: {
        display: "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ ମ୍ୟୁଟ୍ ହୋଇଛି।",
        spoken: "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ ମ୍ୟୁଟ୍ ହୋଇଛି।",
        enSub: "Voice Assistant muted in Odia."
      },
      bn: {
        display: "ভয়েস অ্যাসিস্ট্যান্ট মিউট করা হয়েছে।",
        spoken: "ভয়েস অ্যাসিস্ট্যান্ট মিউট করা হয়েছে।",
        enSub: "Voice Assistant muted in Bengali."
      },
      en: {
        display: "Voice Assistant is now muted.",
        spoken: "Voice Assistant is now muted. Click Voice Guide to turn back on.",
        enSub: "Voice guidance muted."
      }
    },
    empty_submit: {
      hi: {
        display: "कृपया अपनी समस्या रिकॉर्ड करने के लिए माइक बटन दबाएं, या सर्च बार में लिखें।",
        spoken: "कृपया अपनी समस्या रिकॉर्ड करने के लिए माइक बटन दबाएं, या सर्च बार में लिखें।",
        enSub: "Please tap the microphone button to record your issue, or type in the search bar."
      },
      en: {
        display: "Please tap the microphone button to record your issue, or type in the search bar.",
        spoken: "Please tap the microphone button to record your issue, or type in the search bar.",
        enSub: "Voice or text input is required before submitting."
      }
    }
  };

// Instant Native Browser Speech Synthesis Engine
  const fallbackBrowserSpeech = (spokenText, currentLang) => {
    if (!('speechSynthesis' in window)) {
      setTimeout(() => {
        setIsSpeaking(false);
        setTtsPopupMessage(null);
      }, 3500);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 0.96;
      utterance.pitch = 1.0;
      if (currentLang === 'hi' || currentLang === 'bho') utterance.lang = 'hi-IN';
      else if (currentLang === 'or') utterance.lang = 'or-IN';
      else if (currentLang === 'bn') utterance.lang = 'bn-IN';
      else utterance.lang = 'en-IN';

      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(currentLang) || (currentLang === 'bho' && v.lang.startsWith('hi')) || (currentLang === 'or' && v.lang.startsWith('hi')));
      if (matchedVoice) utterance.voice = matchedVoice;

      utterance.onend = () => {
        setIsSpeaking(false);
        setTimeout(() => setTtsPopupMessage(null), 2500);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setTimeout(() => setTtsPopupMessage(null), 2500);
      };
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setIsSpeaking(false);
      setTimeout(() => setTtsPopupMessage(null), 2500);
    }
  };

// Intelligent Context Identifier: Infers guidance meaning for ANY clicked element on the main page
  const getVoiceGuideForElement = target => {
    if (!target) return null;

    // Explicit data attribute
    const explicit = target.closest('[data-voice-guide]');
    if (explicit) return { key: explicit.getAttribute('data-voice-guide') };

    // Ignore clicks inside the speech popup, mute toggles, and typing inputs/textareas
    if (target.closest('.tts-mute-toggle-btn, .tts-dismiss-btn, .voice-guide-toggle-btn')) return null;
    if (target.closest('textarea, input, select, [contenteditable="true"]')) return null;
    // Mic button
    if (target.closest('button[title*="record"], button[title*="माइक"], button[title*="रिकॉर्ड"], button[title*="Recording"]') || target.closest('.mic-btn')) {
      return { key: 'mic_button' };
    }
    // Submit button
    if (target.closest('button[type="submit"]') || target.closest('button[title*="जमा"], button[title*="Submit"]')) {
      return { key: 'submit_button' };
    }
    // Camera button
    if (target.closest('button[title*="Photo"], button[title*="कैमरा"], button[title*="Camera"], button[title*="Evidence"]')) {
      return { key: 'camera_button' };
    }
    // Translation button
    if (target.closest('button[title*="translate"], button[title*="English"], button[title*="अनुवाद"]')) {
      return { key: 'translate_chip' };
    }
    // Undo button
    if (target.closest('button') && (target.innerText?.includes('Undo') || target.innerText?.includes('वापस') || target.innerText?.includes('ପୂର୍ବବତ୍'))) {
      return { key: 'undo_button' };
    }
    // Location Pill / Refresh GPS / Change Location
    if (target.closest('button[title*="Refresh Live GPS"], button[title*="Refresh GPS"]') || target.innerText?.includes('Refresh GPS')) {
      return { key: 'refresh_gps' };
    }
    if (target.closest('button') && (target.innerText?.includes('Change Location') || target.innerText?.includes('स्थान बदलें'))) {
      return { key: 'change_location' };
    }
    if (target.closest('[data-location-header-pill], .location-header-pill, .hero-location-card')) {
      return { key: 'location_pill' };
    }
    // The 4 Category Cards
    const card = target.closest('.group, .p-6.rounded-3xl');
    if (card) {
      const text = card.innerText || '';
      if (text.includes('बुनियादी') || text.includes('Roads') || text.includes('ରାସ୍ତା') || text.includes('রাস্তা')) return { key: 'card_roads' };
      if (text.includes('प्रगति') || text.includes('Progress') || text.includes('ପ୍ରଗତି') || text.includes('অগ্রগতি')) return { key: 'card_progress' };
      if (text.includes('हॉटस्पॉट') || text.includes('GIS') || text.includes('ହଟସ୍ପଟ୍') || text.includes('হটস্পট')) return { key: 'card_gis' };
      if (text.includes('प्रोफ़ाइल') || text.includes('Profile') || text.includes('ପ୍ରୋଫାଇଲ୍') || text.includes('প্রোফাইল')) return { key: 'card_profile' };
    }
    // Language dropdown
    if (target.closest('select')) {
      return { key: 'lang_selector' };
    }
    // Theme toggle
    if (target.closest('button[title*="Mode"], button[title*="Light"], button[title*="Dark"]')) {
      return { key: 'theme_toggle' };
    }
    // Notifications
    if (target.closest('button[title*="Notification"], button[title*="सूचनाएं"]')) {
      return { key: 'notifications' };
    }
    // Citizen Profile
    if (target.closest('a[href*="profile.html"], button[title*="Profile"]')) {
      return { key: 'profile_nav' };
    }
    // Helplines in top bar
    if (target.closest('a[href*="tel:1947"], a[href*="tel:1800"], .helpline-link')) {
      return { key: 'helpline' };
    }
    // Font zoom
    if (target.closest('.font-zoom-btn, button[title*="Zoom"], button[title*="Font"]') || target.closest('.font-zoom-group')) {
      return { key: 'font_zoom' };
    }
    // Distance radar filter
    if (target.closest('button') && /\b(2|5|10|50)\s*km\b/i.test(target.innerText || '')) {
      return { key: 'radar_filter' };
    }
    // Navigation links
    if (target.closest('a[href*="index.html"]')) return { key: 'nav_gateway' };
    if (target.closest('a[href*="admin.html"]')) return { key: 'nav_admin' };
    if (target.closest('button') && target.innerText?.includes('Data Fusion')) return { key: 'data_fusion' };

    // Generic interactive button, link, or clickable element
    const interactive = target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
    if (interactive) {
      const label = (interactive.innerText || interactive.getAttribute('aria-label') || interactive.title || '').trim().replace(/[\n\r]+/g, ' ');
      if (label && label.length >= 2 && label.length <= 45 && !/^[✕×\-\+✓]$/.test(label)) {
        return { customTitle: label };
      }
    }

    return null;
  };

  window.GUIDANCE_DICTIONARY = GUIDANCE_DICTIONARY;
  window.fallbackBrowserSpeech = fallbackBrowserSpeech;
  window.getVoiceGuideForElement = getVoiceGuideForElement;
})();
