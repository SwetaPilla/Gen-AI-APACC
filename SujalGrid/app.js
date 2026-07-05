// Nirnay AI (निर्णय AI) - Platform Engine & Localized Decision Core

// Active State Registry
let currentUser = null;
let currentLanguage = 'en';
let activeMainView = 'dashboard';
let currentWizardStep = 'wiz_step1';
let activeSlideIndex = 1;
const totalSlides = 10;

// Mock database registries
let registeredUsers = JSON.parse(localStorage.getItem('pravaha_users') || '{}');

// Multilingual Translations (11 Languages)
const translations = {
    en: {
        lbl_sanskrit: "निर्णय AI",
        nav_dashboard: "Decision Chat",
        nav_benchmark: "GPU Benchmark",
        nav_slides: "Pitch Slides",
        lbl_subbadge: "Vertex AI Decision Core",
        lbl_status: "Status: Active",
        lbl_hardware: "NVIDIA H100 GPU: Active",
        wiz_badge: "HELPING WIZARD (मददगार विजार्ड)",
        wiz_step1: "Welcome to Nirnay AI! <strong>Step 1:</strong> Select a popular question (Left) or type your query below to get an instant decision scorecard.",
        wiz_step2: "<strong>Step 2:</strong> Ingesting spatial logs. GPU acceleration is cleaning datasets in memory...",
        wiz_step3: "<strong>Step 3:</strong> Decision generated! <strong>Step 4:</strong> Check the Decision Scorecard on the right and click 'Listen to Advisory' to play audio.",
        lbl_helper_desk: "Popular Questions",
        lbl_history: "Recent Chats",
        lbl_assistant: "Nirnay AI Copilot",
        lbl_official: "Personal Decision Assistant",
        lbl_chat_welcome: "🙏 Welcome to Nirnay AI. We analyze soil profiles, metro expansion grids, AQI streams, and logistics delays to answer daily decisions. Ask a question below or upload files:",
        pipeline_title: "NVIDIA H100 Accelerated Ingest Pipeline",
        pipe_ingest: "Ingest",
        pipe_cudf: "cuDF Clean",
        pipe_spark: "GPU Spark",
        pipe_gemini: "Gemini RAG",
        sim_header: "Step 5: Policy Simulator (पॉलिसी सिम्युलेटर)",
        slide_pumping: "🌾 Tube-well Draw limit",
        slide_traffic: "🚦 Traffic Auto-Tune",
        slide_coldchain: "🍅 Cold-Chain Subsidy",
        slide_geopol: "🚢 Geopolitical Bypass",
        common_problems_header: "Step 5: Common Help Desk (मददगार डेस्क)",
        prob_water_title: "🚰 Find Subsidized Drinking Water",
        prob_water_desc: "Request water tanker support near you.",
        prob_traffic_title: "🚗 Avoid Road Floodings & Jams",
        prob_traffic_desc: "Get detour routes in Bengaluru & Mumbai.",
        prob_grocery_title: "🍅 Buy Subsidized Vegetables",
        prob_grocery_desc: "Find nearby Govt-partnered stores.",
        prob_weather_title: "⛈️ Subway Flood Level Status",
        prob_weather_desc: "Check subway closures and warnings.",
        route_detour_header: "Step 5: Gati Route Detours (मार्ग विचलन)",
        detail_header: "Decision Scorecard (निर्णय कार्ड)",
        panel_placeholder: "Submit a query or select a popular question on the left to generate the decision scorecard.",
        radial_label: "DECISION SCORE",
        gauge_safety: "Safety Index",
        gauge_cost: "Cost Score",
        gauge_future: "Future Growth",
        gauge_env: "Pollution Rating",
        panel_reason_title: "Reason & Evidence",
        btn_speak: "Listen to Advisory",
        panel_actions_title: "Alternatives & Mitigation",
        btn_autodemo: "Run Auto-Demo"
    },
    hi: {
        lbl_sanskrit: "निर्णय AI",
        nav_dashboard: "निर्णय चैट",
        nav_benchmark: "जीपीयू बेंचमार्क",
        nav_slides: "पिच स्लाइड्स",
        lbl_subbadge: "वर्टेक्स एआई निर्णय कोर",
        lbl_status: "स्थिति: सक्रिय",
        lbl_hardware: "एनवीडिया H100: सक्रिय",
        wiz_badge: "मददगार विजार्ड",
        wiz_step1: "निर्णय AI में आपका स्वागत है! <strong>चरण 1:</strong> एक लोकप्रिय प्रश्न चुनें या नीचे अपना प्रश्न टाइप करें।",
        wiz_step2: "<strong>चरण 2:</strong> डेटा साफ किया जा रहा है। जीपीयू मेमोरी में काम चल रहा है...",
        wiz_step3: "<strong>चरण 3:</strong> निर्णय तैयार! <strong>चरण 4:</strong> दाईं ओर निर्णय कार्ड देखें और ऑडियो सुनने के लिए 'सलाह सुनें' पर क्लिक करें।",
        lbl_helper_desk: "लोकप्रिय प्रश्न",
        lbl_history: "हाल की चैट",
        lbl_assistant: "निर्णय एआई कोपायलट",
        lbl_official: "व्यक्तिगत निर्णय सहायक",
        lbl_chat_welcome: "🙏 निर्णय एआई में आपका स्वागत है। हम फसलों, मेट्रो मार्गों, प्रदूषण और ट्रैफिक का विश्लेषण कर निर्णय देते हैं। नीचे पूछें:",
        pipeline_title: "एनवीडिया H100 त्वरित पाइपलाइन",
        pipe_ingest: "डेटा इनपुट",
        pipe_cudf: "cuDF क्लीनिंग",
        pipe_spark: "जीपीयू स्पार्क",
        pipe_gemini: "जेमिनी RAG",
        sim_header: "चरण 5: नीति सिम्युलेटर",
        slide_pumping: "🌾 नलकूप सीमा",
        slide_traffic: "🚦 ट्रैफिक ऑटो-ट्यून",
        slide_coldchain: "🍅 कोल्ड-चेन सब्सिडी",
        slide_geopol: "🚢 भू-राजनीतिक बाईपास",
        common_problems_header: "चरण 5: मददगार डेस्क",
        prob_water_title: "🚰 पानी का टैंकर खोजें",
        prob_water_desc: "अपने पास सब्सिडी वाले पानी के टैंकर का अनुरोध करें।",
        prob_traffic_title: "🚗 बाढ़ और जाम से बचें",
        prob_traffic_desc: "बेंगलुरु और मुंबई में वैकल्पिक मार्ग खोजें।",
        prob_grocery_title: "🍅 सस्ती सब्जियां खरीदें",
        prob_grocery_desc: "सरकारी भागीदारी वाली नजदीकी दुकानों का पता लगाएं।",
        prob_weather_title: "⛈️ सबवे जलभराव की स्थिति",
        prob_weather_desc: "सबवे बंद होने और चेतावनी की जांच करें।",
        route_detour_header: "चरण 5: गति मार्ग विचलन",
        detail_header: "निर्णय कार्ड (Scorecard)",
        panel_placeholder: "निर्णय कार्ड जनरेट करने के लिए बाईं ओर से कोई प्रश्न चुनें या नीचे पूछें।",
        radial_label: "निर्णय स्कोर",
        gauge_safety: "सुरक्षा सूचकांक",
        gauge_cost: "लागत स्कोर",
        gauge_future: "भविष्य की वृद्धि",
        gauge_env: "प्रदूषण रेटिंग",
        panel_reason_title: "कारण और साक्ष्य",
        btn_speak: "सलाह सुनें",
        panel_actions_title: "विकल्प और समाधान",
        btn_autodemo: "ऑटो-डेमो चलाएं"
    },
    kn: {
        lbl_sanskrit: "ನಿಣ೯ಯ್ AI",
        nav_dashboard: "ನಿರ್ಧಾರ ಚಾಟ್",
        nav_benchmark: "GPU ಬೆಂಚ್‌ಮಾರ್ಕ್",
        nav_slides: "ಪಿಚ್ ಸ್ಲೈಡ್‌ಗಳು",
        lbl_subbadge: "ವರ್ಟೆಕ್ಸ್ AI ನಿರ್ಧಾರ ಕೋರ್",
        lbl_status: "ಸ್ಥಿತಿ: ಸಕ್ರಿಯ",
        lbl_hardware: "NVIDIA H100: ಸಕ್ರಿಯ",
        wiz_badge: "ಸಹಾಯಕ ವಿಝಾರ್ಡ್",
        wiz_step1: "ನಿರ್ಣಯ್ AI ಗೆ ಸುಸ್ವಾಗತ! <strong>ಹಂತ 1:</strong> ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಯನ್ನು ಆರಿಸಿ ಅಥವಾ ಕೆಳಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ.",
        wiz_step2: "<strong>ಹಂತ 2:</strong> ಡೇಟಾವನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಲಾಗುತ್ತಿದೆ. ಜಿಪಿಯು ಮೆಮೊರಿಯಲ್ಲಿ ಕೆಲಸ ನಡೆಯುತ್ತಿದೆ...",
        wiz_step3: "<strong>ಹಂತ 3:</strong> ನಿರ್ಧಾರ ಸಿದ್ಧವಾಗಿದೆ! <strong>ಹಂತ 4:</strong> ಬಲಭಾಗದಲ್ಲಿರುವ ನಿರ್ಧಾರ ಕಾರ್ಡ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಆಡಿಯೊವನ್ನು ಕೇಳಲು 'ಸಲಹೆ ಆಲಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
        lbl_helper_desk: "ಜನಪ್ರಿಯ ಪ್ರಶ್ನೆಗಳು",
        lbl_history: "ಇತ್ತೀಚಿನ ಚಾಟ್‌ಗಳು",
        lbl_assistant: "ನಿರ್ಣಯ್ AI ಸಹಾಯಕ",
        lbl_official: "ವೈಯಕ್ತಿಕ ನಿರ್ಧಾರ ಸಹಾಯಕ",
        lbl_chat_welcome: "🙏 ನಿರ್ಣಯ್ AI ಗೆ ಸುಸ್ವಾಗತ. ನಾವು ಬೆಳೆಗಳು, ಮೆಟ್ರೋ ಮಾರ್ಗಗಳು, ಮಾಲಿನ್ಯ ಮತ್ತು ಸಂಚಾರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ನಿರ್ಧಾರಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ಕೆಳಗೆ ಕೇಳಿ:",
        pipeline_title: "NVIDIA H100 ವೇಗವರ್ಧಿತ ಪೈಪ್‌ಲೈನ್",
        pipe_ingest: "ಇಂಜೆಸ್ಟ್",
        pipe_cudf: "cuDF ಕ್ಲೀನ್",
        pipe_spark: "GPU ಸ್ಪಾರ್ಕ್",
        pipe_gemini: "ಜೆಮಿನಿ RAG",
        sim_header: "ಹಂತ 5: ನೀತಿ ಸಿಮ್ಯುಲೇಟರ್",
        slide_pumping: "🌾 ಕೊಳವೆ ಬಾವಿ ಡ್ರಾ ಮಿತಿ",
        slide_traffic: "🚦 ಟ್ರಾಫಿಕ್ ಆಟೋ-ಟ್ಯೂನ್",
        slide_coldchain: "🍅 ಕೋಲ್ಡ್-ಚೈನ್ ಸಬ್ಸಿಡಿ",
        slide_geopol: "🚢 ಭೌಗೋಳಿಕ ರಾಜಕೀಯ ಬೈಪಾಸ್",
        common_problems_header: "ಹಂತ 5: ಸಹಾಯ ಕೇಂದ್ರ",
        prob_water_title: "🚰 ಕುಡಿಯುವ ನೀರು ಹುಡುಕಿ",
        prob_water_desc: "ನಿಮ್ಮ ಹತ್ತಿರ ಸಬ್ಸಿಡಿ ನೀರಿನ ಟ್ಯಾಂಕರ್ ವಿನಂತಿಸಿ.",
        prob_traffic_title: "🚗 ರಸ್ತೆ ಪ್ರವಾಹ ಮತ್ತು ಜಾಮ್ ತಪ್ಪಿಸಿ",
        prob_traffic_desc: "ಬೆಂಗಳೂರು ಮತ್ತು ಮುಂಬೈನಲ್ಲಿ ಪರ್ಯಾಯ ಮಾರ್ಗಗಳನ್ನು ಪಡೆಯಿರಿ.",
        prob_grocery_title: "🍅 ಸಬ್ಸಿಡಿ ತರಕಾರಿಗಳನ್ನು ಖರೀದಿಸಿ",
        prob_grocery_desc: "ಹತ್ತಿರದ ಸರ್ಕಾರಿ ಪಾಲುದಾರ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ.",
        prob_weather_title: "⛈️ ಸಬ್‌ವೇ ಪ್ರವಾಹ ಮಟ್ಟದ ಸ್ಥಿತಿ",
        prob_weather_desc: "ಸಬ್‌ವೇ ಮುಚ್ಚುವಿಕೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
        route_detour_header: "ಹಂತ 5: ಗತಿ ಮಾರ್ಗ ಪಲ್ಲಟ",
        detail_header: "ನಿರ್ಧಾರ ಕಾರ್ಡ್ (Scorecard)",
        panel_placeholder: "ನಿರ್ಧಾರ ಕಾರ್ಡ್ ರಚಿಸಲು ಬಲಭಾಗದಲ್ಲಿ ಒಂದು ಪ್ರಶ್ನೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಕೆಳಗೆ ಕೇಳಿ.",
        radial_label: "ನಿರ್ಧಾರ ಸ್ಕೋರ್",
        gauge_safety: "ಸುರಕ್ಷತಾ ಸೂಚ್ಯಂಕ",
        gauge_cost: "ವೆಚ್ಚದ ಸ್ಕೋರ್",
        gauge_future: "ಭವಿಷ್ಯದ ಬೆಳವಣಿಗೆ",
        gauge_env: "ಮಾಲಿನ್ಯ ರೇಟಿಂಗ್",
        panel_reason_title: "ಕಾರಣ ಮತ್ತು ಪುರಾವೆ",
        btn_speak: "ಸಲಹೆ ಆಲಿಸಿ",
        panel_actions_title: "ಪರ್ಯಾಯಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು",
        btn_autodemo: "ಆಟೋ-ಡೆಮೊ ರನ್ ಮಾಡಿ"
    }
};

// Populate translation fallbacks for rest of the 11 languages (matching English)
const remainingLangs = ['ta', 'te', 'ml', 'gu', 'pa', 'bn', 'mr', 'ur'];
remainingLangs.forEach(lang => {
    translations[lang] = { ...translations.en };
});

// Customized translated titles for Urdu, Tamil, Telugu, etc.
translations.ta.lbl_sanskrit = "நிர்ணய் AI";
translations.te.lbl_sanskrit = "निर्णय AI";
translations.ml.lbl_sanskrit = "നിർണയ് AI";
translations.gu.lbl_sanskrit = "નિર્ણય AI";
translations.bn.lbl_sanskrit = "নির্ণয় AI";
translations.mr.lbl_sanskrit = "निर्णय AI";
translations.ur.lbl_sanskrit = "نرنے AI";

// 20 Detailed Indian Use Cases Database
const useCasesDatabase = {
    // 1. Healthcare
    hospital: {
        tag: "Healthcare",
        query: "Which hospital nearby has the shortest waiting time?",
        title: "Hospital Bed & Wait-Time Advisor",
        overallScore: 88,
        safety: 95,
        cost: 65,
        future: 90,
        pollution: 85,
        recommendation: "Proceed to municipal hospital Ward 4 immediately.",
        rationale: "NVIDIA GPU spatial sorting processed 85 local clinic logs in 14ms. Ward 4 reports 4 vacant ICU beds with an average emergency wait time of 15 minutes, whereas public General Hospital wait times currently exceed 3.5 hours.",
        alternatives: [
            "Divert to partnered private clinic B under Govt health card scheme.",
            "Schedule an online tele-consultation if emergency levels are low."
        ],
        voiceText: "Proceed to municipal hospital Ward 4 immediately. It has 4 vacant beds and the shortest waiting time of 15 minutes."
    },
    // 2. Agriculture
    crop: {
        tag: "Agriculture",
        query: "Which crop should I grow in Kolar this monsoon?",
        title: "Monsoon Crop Selection (Kolar)",
        overallScore: 78,
        safety: 70,
        cost: 85,
        future: 75,
        pollution: 92,
        recommendation: "Cultivate Ragi (Finger Millet) instead of water-intensive Paddy.",
        rationale: "Kolar spatial interpolation indicates a 42% groundwater table depletion risk. Ragi requires 60% less water draw and has stable government minimum support prices (MSP).",
        alternatives: [
            "Install drip lines for groundnut cultivation.",
            "Apply for direct borewell recharge tank subsidy."
        ],
        voiceText: "cultivate ragi instead of paddy. Kolar groundwater levels are low and ragi requires sixty percent less water draw."
    },
    // 3. Education
    college: {
        tag: "Education",
        query: "Which college suits my marks (85% merit)?",
        title: "Merit College Admission Classifier",
        overallScore: 82,
        safety: 90,
        cost: 75,
        future: 88,
        pollution: 80,
        recommendation: "Apply for Tech Institute A under State quota admission.",
        rationale: "RAG matching scanned 120 historic counseling cut-offs. Your 85% score lies safely in the upper percentile for admission to Tech Institute A mechanical branch.",
        alternatives: [
            "Apply to institute B as second option (safety margin +5%).",
            "Check government scholarship criteria for fee wave-off."
        ],
        voiceText: "Apply for Tech Institute A under State quota admission. Your marks are within the historic upper percentile range."
    },
    // 4. Women Safety
    safepath: {
        tag: "Women Safety",
        query: "Is walking home from Metro station safe at 10 PM?",
        title: "Urban Transit Safety Advisor",
        overallScore: 92,
        safety: 94,
        cost: 95,
        future: 80,
        pollution: 75,
        recommendation: "Use Ring Road Route B; street light intensity is high.",
        rationale: "GPU accelerated routing checked 12,000 spatial light density lines. Route B is fully illuminated and reports active police patrol beats.",
        alternatives: [
            "Request shared auto transit from terminal gate 2.",
            "Avoid dark shortcut C near the underpass."
        ],
        voiceText: "Use Ring Road Route B. Street light intensity is high and police patrols are active."
    },
    // 5. Tourism
    tourism: {
        tag: "Tourism",
        query: "Is tomorrow a good day to travel to Lonavala/Goa?",
        title: "Monsoon Travel Safety Index",
        overallScore: 45,
        safety: 30,
        cost: 80,
        future: 50,
        pollution: 90,
        recommendation: "Postpone travel plans; heavy flash flood risk active.",
        rationale: "IMD weather forecast models process extreme precipitation bands. Expressway reports localized mudslide risks near Khandala stretch.",
        alternatives: [
            "Reschedule travel to next weekend.",
            "Opt for inner rail transit instead of private car."
        ],
        voiceText: "Postpone travel plans. Heavy flash flood risk is active on the expressway."
    },
    // 6. Transportation
    floodroute: {
        tag: "Transportation",
        query: "How to avoid road floodings in Mumbai/Bengaluru?",
        title: "Flash Flood Gati Routing",
        overallScore: 65,
        safety: 88,
        cost: 70,
        future: 60,
        pollution: 50,
        recommendation: "Take Flyover route; avoid low-lying subways.",
        rationale: "Milan Subway reports 2.4 feet of rain waterlogging. Outer Ring road detour routes save 35 minutes of engine idling times.",
        alternatives: [
            "Use metro rail service line 1 which is running unaffected.",
            "Park commercial trucks at warehouse yard until rain stops."
        ],
        voiceText: "Take the Flyover route. Low lying subways are closed due to rain waterlogging."
    },
    // 7. Govt Schemes
    scheme: {
        tag: "Govt Schemes",
        query: "Which scheme eligibility applies to marginal farmers?",
        title: "Direct Benefit Scheme Eligibility",
        overallScore: 95,
        safety: 95,
        cost: 98,
        future: 90,
        pollution: 95,
        recommendation: "Apply for PM-KISAN direct fertilizer and crop support.",
        rationale: "RAG lookup checked scheme criteria. Your registered Kolar land holding under 2 hectares satisfies marginal farmer categories.",
        alternatives: [
            "Apply for subsidized solar pump sets under KUSUM program.",
            "Join regional Farmer Producer Organization (FPO) for seed discounts."
        ],
        voiceText: "Apply for PM-KISAN support. Your land holding qualifies you for direct subsidies."
    },
    // 8. Smart Cities
    aqi: {
        tag: "Smart Cities",
        query: "Is air quality safe for my child's outdoor play today?",
        title: "Children AQI Safety Planner",
        overallScore: 50,
        safety: 40,
        cost: 95,
        future: 60,
        pollution: 28,
        recommendation: "Keep children indoors; PM2.5 levels exceed 280.",
        rationale: "Delhi spatial sensors indicate stubble burn wind sweeps. Safe outdoor hours are predicted only after 4 PM when wind dispersion increases.",
        alternatives: [
            "Utilize indoor school sports club options.",
            "Equip with N95 masks if essential travel is needed."
        ],
        voiceText: "Keep children indoors. Air quality index exceeds 280, posing respiratory risks."
    },
    // 9. Climate
    heatwave: {
        tag: "Climate",
        query: "Will heatwave levels spike next week?",
        title: "Extreme Weather Forecaster",
        overallScore: 35,
        safety: 25,
        cost: 85,
        future: 40,
        pollution: 30,
        recommendation: "Restrict outdoor tasks between 11 AM and 3 PM.",
        rationale: "XGBoost thermal analysis models predict heatwave warnings exceeding 44 degrees across North India. Grid loads will rise by 25%.",
        alternatives: [
            "Use community hydration booths located near metro junctions.",
            "Switch commercial warehouse hours to night shifts."
        ],
        voiceText: "Restrict outdoor tasks between 11 AM and 3 PM due to heatwave warning."
    },
    // 10. Energy
    solar: {
        tag: "Energy",
        query: "Should I install solar panels in Bangalore today?",
        title: "Rooftop Solar Investment Analyzer",
        overallScore: 90,
        safety: 95,
        cost: 80,
        future: 95,
        pollution: 98,
        recommendation: "Install 3kW solar setup; payback period is 3.8 years.",
        rationale: "BESCOM solar policies and net-metering schemes offset grid bills by 72% monthly. Radiation grids processed 320 sunny days annually.",
        alternatives: [
            "Avail government direct 40% capital subsidy program.",
            "Choose solar water heating if power bills are under ₹1500."
        ],
        voiceText: "Install 3 kilowatt solar setup. Payback period is under 4 years with active grid subsidies."
    },
    // 11. Water
    borewell: {
        tag: "Water",
        query: "Should I drill my borewell deeper?",
        title: "Borewell Yield & Compaction Forecast",
        overallScore: 40,
        safety: 30,
        cost: 50,
        future: 45,
        pollution: 85,
        recommendation: "Do not drill deeper; compaction risk is extreme.",
        rationale: "Aquifer models indicate drilling past 900 feet risks permanent well dry-outs. Ground level soil compaction indices have reached red zones.",
        alternatives: [
            "Construct rainwater harvest storage trenches.",
            "Purchase municipal water tanker access passes."
        ],
        voiceText: "Do not drill deeper. Aquifer levels are depleted and soil compaction risk is high."
    },
    // 12. Waste
    recycling: {
        tag: "Waste",
        query: "Where is the nearest zero-waste recycling center?",
        title: "Zero-Waste Smart Locator",
        overallScore: 85,
        safety: 90,
        cost: 95,
        future: 80,
        pollution: 95,
        recommendation: "Recycle dry packaging at Smart Bin Hub 2.",
        rationale: "Hub 2 pays ₹12 per kg scrap value for clean cardboard. Offloaded route calculations locate hub at 1.4km distance.",
        alternatives: [
            "Schedule doorstep waste pickup service.",
            "Compost wet kitchen waste in backyard bins."
        ],
        voiceText: "Recycle packaging at Smart Bin Hub 2. It is 1.4 kilometers away and offers scrap payouts."
    },
    // 13. Jobs
    skills: {
        tag: "Jobs",
        query: "Which high-demand career skill should I learn?",
        title: "National Career Skills Advisor",
        overallScore: 88,
        safety: 85,
        cost: 95,
        future: 95,
        pollution: 95,
        recommendation: "Learn Data Engineering and GPU-Accelerated Analytics.",
        rationale: "Job listings indicate a 42% spike in demand for engineers skilled in Spark, RAPIDS, and cloud databases.",
        alternatives: [
            "Opt for Vertex AI Developer certification path.",
            "Learn Python and SQL basics via free government portals."
        ],
        voiceText: "Learn Data Engineering and GPU Accelerated Analytics. Market demand has spiked by 42%."
    },
    // 14. Investments
    flatpune: {
        tag: "Investments",
        query: "Should I buy a flat in Pune this year?",
        title: "Pune Property Investment Analyzer",
        overallScore: 85,
        safety: 90,
        cost: 72,
        future: 88,
        pollution: 54,
        recommendation: "Yes, purchase property in Kharadi/Hinjenwadi stretch.",
        rationale: "Future metro extension routes and corporate office corridors indicate a projected 15% property value growth index within 3 years.",
        alternatives: [
            "Rent for 1 more year if mortgage interest rates exceed 8.5%.",
            "Consider residential plots in upcoming smart zones."
        ],
        voiceText: "Yes, purchase property in Hinjenwadi or Kharadi. Metro line expansion will boost rates by 15%."
    },
    // 15. Retail
    mandi: {
        tag: "Retail",
        query: "Which mandi pays best for onion crops?",
        title: "Mandi Price Arbitrage Navigator",
        overallScore: 80,
        safety: 85,
        cost: 90,
        future: 70,
        pollution: 90,
        recommendation: "Sell onion crop at Mandi B; pricing is ₹3,200/quintal.",
        rationale: "Mandi B price exceeds local Mandi A rates by 22%. Transportation costs are calculated at ₹300 per quintal, yielding higher net profit.",
        alternatives: [
            "Store crops in cold storage to sell during festive weeks.",
            "Coordinate bulk transport with regional farmer cluster."
        ],
        voiceText: "Sell onion crop at Mandi B. Rates are 22% higher than local markets."
    },
    // 16. Insurance
    insurance: {
        tag: "Insurance",
        query: "Should I buy weather-index crop insurance?",
        title: "Crop Insurance Policy Selector",
        overallScore: 78,
        safety: 90,
        cost: 85,
        future: 80,
        pollution: 90,
        recommendation: "Yes, select index-based cover for drought protection.",
        rationale: "Weather-index plans pay claims automatically based on local rain deficiency records, skipping complex manual damage checks.",
        alternatives: [
            "Opt for standard yield-loss package (longer payouts).",
            "Participate in government subsidized PMFBY policies."
        ],
        voiceText: "Yes, select weather index based cover. Claims are settled automatically based on rainfall data."
    },
    // 17. Disaster Management
    disaster: {
        tag: "Disaster Management",
        query: "Mumbai cloudburst emergency: where to shelter?",
        title: "Emergency Flash Flood Core",
        overallScore: 95,
        safety: 98,
        cost: 95,
        future: 90,
        pollution: 95,
        recommendation: "Evacuate to Municipal High School shelter immediately.",
        rationale: "Subway level water sensors show red danger limits. Municipal school sits on elevated terrain with medical kits and clean drinking water.",
        alternatives: [
            "Avoid underpasses and low-lying ground floor lobbies.",
            "Stay on upper floors if immediate evacuation is blocked."
        ],
        voiceText: "Evacuate to Municipal High School shelter immediately. Elevated terrain prevents water log risks."
    },
    // 18. Traffic
    orrcongestion: {
        tag: "Traffic",
        query: "Bypass Outer Ring Road traffic congestion?",
        title: "Adaptive Congestion Optimizer",
        overallScore: 70,
        safety: 90,
        cost: 80,
        future: 65,
        pollution: 42,
        recommendation: "Bypass ORR via Tunnel Corridor 1; saves 28 minutes.",
        rationale: "H100 GPU processed 12,000 corridor speed logs. Tunnel route reports free flowing traffic speeds with green corridor passes active.",
        alternatives: [
            "Use metro transit rail lines running parallel.",
            "Adjust travel hour to after 8:30 PM."
        ],
        voiceText: "Bypass Outer Ring Road via Tunnel Corridor 1 to save 28 minutes of travel time."
    },
    // 19. Real Estate
    noidaflat: {
        tag: "Real Estate",
        query: "Should I buy a flat in Greater Noida?",
        title: "Noida Flat Investment Index",
        overallScore: 68,
        safety: 70,
        cost: 82,
        future: 72,
        pollution: 40,
        recommendation: "Neutral; price is fair but winter AQI values are poor.",
        rationale: "Price trends are stable due to airport proximity, but PM2.5 levels remain high during winter. Future growth depends on commercial zones.",
        alternatives: [
            "Compare with Gurgaon sector 82 projects.",
            "Select towers equipped with centralized air filtration."
        ],
        voiceText: "Investment is neutral. Price is fair, but winter air quality is poor."
    },
    // 20. Public Services
    garbagecomplaint: {
        tag: "Public Services",
        query: "Report open garbage dump on my block?",
        title: "Municipal Waste Ticket Router",
        overallScore: 90,
        safety: 92,
        cost: 95,
        future: 85,
        pollution: 95,
        recommendation: "Submit photo; sanitation truck 4 will pick up within 4 hours.",
        rationale: "Image classification identified plastic compost. GPS logs route truck 4 on its current path directly past your street block.",
        alternatives: [
            "Request community cleanup drive for open field blocks.",
            "Install local wet composting bin unit."
        ],
        voiceText: "Submit garbage photo. Sanitation truck 4 has been routed to pick up within 4 hours."
    }
};

// Map Query Keywords to Database Entries
function findBestUseCasesMatch(userText) {
    const text = userText.toLowerCase();
    
    if (text.includes("hospital") || text.includes("doctor") || text.includes("wait")) return 'hospital';
    if (text.includes("crop") || text.includes("grow") || text.includes("ragi") || text.includes("paddy")) return 'crop';
    if (text.includes("college") || text.includes("marks") || text.includes("admission") || text.includes("school")) return 'college';
    if (text.includes("safe") || text.includes("walk") || text.includes("metro") || text.includes("night")) return 'safepath';
    if (text.includes("goa") || text.includes("lonavala") || text.includes("travel") || text.includes("monsoon")) return 'tourism';
    if (text.includes("flood") || text.includes("subway") || text.includes("waterlog") || text.includes("milan")) return 'floodroute';
    if (text.includes("scheme") || text.includes("subsidy") || text.includes("marginal") || text.includes("pm-kisan")) return 'scheme';
    if (text.includes("air") || text.includes("aqi") || text.includes("pollution") || text.includes("smog")) return 'aqi';
    if (text.includes("heat") || text.includes("temperature") || text.includes("summer") || text.includes("hot")) return 'heatwave';
    if (text.includes("solar") || text.includes("panel") || text.includes("electricity") || text.includes("bill")) return 'solar';
    if (text.includes("borewell") || text.includes("drill") || text.includes("groundwater") || text.includes("well")) return 'borewell';
    if (text.includes("recycle") || text.includes("garbage") || text.includes("waste") || text.includes("scrap")) return 'recycling';
    if (text.includes("career") || text.includes("skill") || text.includes("job") || text.includes("learn")) return 'skills';
    if (text.includes("pune") || text.includes("flat") || text.includes("buy a house") || text.includes("property")) return 'flatpune';
    if (text.includes("mandi") || text.includes("onion") || text.includes("tomato") || text.includes("price")) return 'mandi';
    if (text.includes("insurance") || text.includes("crop insurance") || text.includes("pmfby")) return 'insurance';
    if (text.includes("evacuate") || text.includes("shelter") || text.includes("cloudburst")) return 'disaster';
    if (text.includes("traffic") || text.includes("congestion") || text.includes("outer ring") || text.includes("orr")) return 'orrcongestion';
    if (text.includes("noida") || text.includes("greater noida")) return 'noidaflat';
    if (text.includes("garbage dump") || text.includes("dump") || text.includes("municipal ticket")) return 'garbagecomplaint';
    
    // Default fallback
    return 'flatpune';
}

// Onload Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check local storage session
    checkUserSession();
    
    // Render Popular Questions Chips
    populatePopularQuestions();
    
    // Start Live Clock
    startLiveClock();
});

function startLiveClock() {
    setInterval(() => {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const clockEl = document.getElementById('live-time');
        if (clockEl) {
            clockEl.textContent = `${dateString} | ${timeString}`;
        }
    }, 1000);
}

// Render Popular Questions chips (20 categories)
function populatePopularQuestions() {
    const listEl = document.getElementById('popular-questions-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    Object.keys(useCasesDatabase).forEach(key => {
        const uc = useCasesDatabase[key];
        const chip = document.createElement('button');
        chip.className = "question-chip";
        chip.onclick = () => selectPopularQuestion(key);
        chip.innerHTML = `
            <span class="chip-tag">${uc.tag}</span>
            <span class="chip-text">${uc.query}</span>
        `;
        listEl.appendChild(chip);
    });
}

function selectPopularQuestion(key) {
    const uc = useCasesDatabase[key];
    const inputEl = document.getElementById('chat-input-text');
    if (inputEl) {
        inputEl.value = uc.query;
    }
    
    // Trigger submit user query
    submitUserQuery(key);
}

// User Authentication overlays
function checkUserSession() {
    const savedUser = localStorage.getItem('pravaha_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserProfile(currentUser);
    } else {
        const authModal = document.getElementById('auth-modal');
        if (authModal) authModal.style.display = 'flex';
    }
}

function switchAuthTab(tab) {
    const tabSignup = document.getElementById('tab-signup');
    const tabLogin = document.getElementById('tab-login');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (tab === 'signup') {
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    } else {
        tabSignup.classList.remove('active');
        tabLogin.classList.add('active');
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    }
}

function handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const role = document.getElementById('signup-role').value;
    const state = document.getElementById('signup-state').value;
    const lang = document.getElementById('signup-lang').value;
    
    const user = { name, phone, role, state, lang };
    registeredUsers[phone] = user;
    localStorage.setItem('pravaha_users', JSON.stringify(registeredUsers));
    localStorage.setItem('pravaha_current_user', JSON.stringify(user));
    currentUser = user;
    
    loadUserProfile(user);
}

function handleLogIn(e) {
    e.preventDefault();
    const phone = document.getElementById('login-phone').value.trim();
    const errorMsg = document.getElementById('login-error-msg');
    
    if (registeredUsers[phone]) {
        const user = registeredUsers[phone];
        localStorage.setItem('pravaha_current_user', JSON.stringify(user));
        currentUser = user;
        if (errorMsg) errorMsg.style.display = 'none';
        loadUserProfile(user);
    } else {
        if (errorMsg) {
            errorMsg.textContent = "Error: Phone number not registered. Please sign up first.";
            errorMsg.style.display = 'block';
        }
    }
}

function loginAsGuest() {
    const guestUser = {
        name: "Guest User",
        phone: "0000000000",
        role: "commissioner",
        state: "Delhi",
        lang: "en"
    };
    currentUser = guestUser;
    loadUserProfile(guestUser);
}

function loadUserProfile(user) {
    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'none';
    
    const badge = document.getElementById('user-profile-badge');
    const divider = document.getElementById('user-divider');
    const nameSpan = document.getElementById('user-display-name');
    
    if (badge && divider && nameSpan) {
        badge.style.display = 'flex';
        divider.style.display = 'block';
        
        let roleIcon = '👤';
        if (user.role === 'farmer') roleIcon = '🌾';
        else if (user.role === 'logistics') roleIcon = '🚛';
        else if (user.role === 'commissioner') roleIcon = '🏢';
        
        nameSpan.textContent = `${roleIcon} ${user.name} (${user.state})`;
    }
    
    // Auto-set Mode based on Role
    if (user.role === 'farmer') {
        setUserMode('citizen');
    } else if (user.role === 'logistics') {
        setUserMode('driver');
    } else {
        setUserMode('officer');
    }
    
    // Set Language
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = user.lang;
        changeLanguage();
    }
}

function showAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'flex';
}

function logoutUser(e) {
    if (e) e.stopPropagation();
    localStorage.removeItem('pravaha_current_user');
    currentUser = null;
    
    const badge = document.getElementById('user-profile-badge');
    const divider = document.getElementById('user-divider');
    if (badge) badge.style.display = 'none';
    if (divider) divider.style.display = 'none';
    
    const chatBody = document.getElementById('chat-body');
    if (chatBody) {
        chatBody.innerHTML = `
            <div class="wa-message system">
                <p id="lbl-chat-welcome" data-i18n="lbl_chat_welcome">🙏 Welcome to Nirnay AI. We analyze soil profiles, metro expansion grids, AQI streams, and logistics delays to answer daily decisions. Ask a question below or upload files:</p>
            </div>
        `;
    }
    showAuthModal();
}

// User Mode Configurations
function setUserMode(mode) {
    currentUserMode = mode;
    
    // Toggle header tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.getElementById(`mode-tab-${mode}`);
    if (activeTab) activeTab.classList.add('active');
    
    const commonProblemsCard = document.getElementById('common-problems-card');
    const routeDetourCard = document.getElementById('route-detour-card');
    const simulatorCardBox = document.getElementById('simulator-card-box');
    
    // Toggle workspace cards
    if (mode === 'citizen') {
        if (commonProblemsCard) commonProblemsCard.style.display = 'flex';
        if (routeDetourCard) routeDetourCard.style.display = 'none';
        if (simulatorCardBox) simulatorCardBox.style.display = 'none';
        
        // Hide Admin pages
        const benchBtn = document.getElementById('btn-view-benchmark');
        const slidesBtn = document.getElementById('btn-view-slides');
        if (benchBtn) benchBtn.style.display = 'none';
        if (slidesBtn) slidesBtn.style.display = 'none';
        
        if (activeMainView !== 'dashboard') {
            switchMainView('dashboard');
        }
    } 
    else if (mode === 'driver') {
        if (commonProblemsCard) commonProblemsCard.style.display = 'none';
        if (routeDetourCard) routeDetourCard.style.display = 'flex';
        if (simulatorCardBox) simulatorCardBox.style.display = 'none';
        
        const benchBtn = document.getElementById('btn-view-benchmark');
        const slidesBtn = document.getElementById('btn-view-slides');
        if (benchBtn) benchBtn.style.display = 'none';
        if (slidesBtn) slidesBtn.style.display = 'none';
        
        if (activeMainView !== 'dashboard') {
            switchMainView('dashboard');
        }
    } 
    else if (mode === 'officer') {
        if (commonProblemsCard) commonProblemsCard.style.display = 'none';
        if (routeDetourCard) routeDetourCard.style.display = 'none';
        if (simulatorCardBox) simulatorCardBox.style.display = 'flex';
        
        const benchBtn = document.getElementById('btn-view-benchmark');
        const slidesBtn = document.getElementById('btn-view-slides');
        if (benchBtn) benchBtn.style.display = 'flex';
        if (slidesBtn) slidesBtn.style.display = 'flex';
    }
}

// Multilingual Translation engine
function changeLanguage() {
    const selector = document.getElementById('lang-selector');
    if (!selector) return;
    currentLanguage = selector.value;
    
    // Update DOM texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.innerHTML = translations[currentLanguage][key];
        }
    });
}

function adjustTextSize(size) {
    document.body.classList.remove('text-small', 'text-normal', 'text-large');
    if (size === 'small') document.body.classList.add('text-small');
    else if (size === 'normal') document.body.classList.add('text-normal');
    else if (size === 'large') document.body.classList.add('text-large');
}

// Switch Sidebar main views
function switchMainView(view) {
    activeMainView = view;
    
    // Update Nav buttons active states
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    const targetBtn = document.getElementById(`btn-view-${view}`);
    if (targetBtn) targetBtn.classList.add('active');
    
    // Toggle panels
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    const targetPanel = document.getElementById(`view-${view}`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// Conversational Chat triggers
function handleInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitUserQuery();
    }
}

let activeSpeechKey = 'flatpune';

function submitUserQuery(presetKey) {
    const inputEl = document.getElementById('chat-input-text');
    if (!inputEl) return;
    
    let queryText = inputEl.value.trim();
    if (!queryText && !presetKey) return;
    
    // Determine use case key
    const matchKey = presetKey || findBestUseCasesMatch(queryText);
    const uc = useCasesDatabase[matchKey];
    
    if (!queryText) {
        queryText = uc.query;
    }
    
    // Append User message to Chat stream
    appendChatMessage('user', queryText);
    inputEl.value = '';
    
    // Animate GPU pipeline visualizer steps
    triggerPipelineAnimation(() => {
        // Append Assistant response to Chat stream
        const responseText = `💡 **${uc.title}**: ${uc.recommendation}\n\n*Safety*: ${uc.safety}% | *Cost Score*: ${uc.cost}% | *Growth*: ${uc.future}%\n\n${uc.rationale}`;
        appendChatMessage('assistant', responseText);
        
        // Populate Decision Scorecard in Right Panel
        populateDecisionScorecard(matchKey);
        
        // Update Wizard Steps
        setWizardStep('wiz_step3');
    });
}

function appendChatMessage(sender, text) {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `wa-message ${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, "<br>");
    
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// GPU Ingest Pipeline animation
function triggerPipelineAnimation(callback) {
    setWizardStep('wiz_step2');
    
    const steps = ['ingest', 'cudf', 'spark', 'gemini'];
    let idx = 0;
    
    // Set all steps to loading
    steps.forEach(s => {
        document.getElementById(`step-${s}`).classList.remove('active');
        document.getElementById(`${s}-val`).textContent = 'Pending';
    });
    
    function animateNext() {
        if (idx < steps.length) {
            const stepName = steps[idx];
            const el = document.getElementById(`step-${stepName}`);
            el.classList.add('active');
            
            let val = 'Running';
            if (stepName === 'ingest') val = 'GPS Ingest';
            else if (stepName === 'cudf') val = 'cuDF 71ms';
            else if (stepName === 'spark') val = 'RAPIDS H100';
            else if (stepName === 'gemini') val = 'Grounded RAG';
            
            document.getElementById(`${stepName}-val`).textContent = val;
            idx++;
            setTimeout(animateNext, 500);
        } else {
            // Finished
            steps.forEach(s => {
                const el = document.getElementById(`step-${s}`);
                el.classList.remove('active');
            });
            if (callback) callback();
        }
    }
    animateNext();
}

function setWizardStep(stepKey) {
    currentWizardStep = stepKey;
    const textEl = document.getElementById('wizard-text');
    if (textEl && translations[currentLanguage] && translations[currentLanguage][stepKey]) {
        textEl.innerHTML = translations[currentLanguage][stepKey];
    }
}

// Populate Decision Scorecard Details
function populateDecisionScorecard(key) {
    activeSpeechKey = key;
    const uc = useCasesDatabase[key];
    
    // Hide placeholder, reveal panel data
    document.getElementById('panel-placeholder-info').style.display = 'none';
    document.getElementById('panel-data').style.display = 'flex';
    
    // Populate scores
    document.getElementById('scorecard-overall-val').textContent = uc.overallScore;
    document.getElementById('scorecard-title').textContent = uc.title;
    document.getElementById('gauge-val-safety').textContent = `${uc.safety}%`;
    document.getElementById('gauge-val-cost').textContent = `${uc.cost}%`;
    document.getElementById('gauge-val-future').textContent = `${uc.future}%`;
    document.getElementById('gauge-val-pollution').textContent = `${uc.pollution}%`;
    
    // Re-style radial ring border based on score strength
    const ring = document.querySelector('.decision-radial-ring');
    if (uc.overallScore >= 80) {
        ring.style.borderColor = 'var(--color-success)';
    } else if (uc.overallScore < 50) {
        ring.style.borderColor = 'var(--color-danger)';
    } else {
        ring.style.borderColor = 'var(--color-warning)';
    }
    
    document.getElementById('scorecard-recommendation').textContent = uc.recommendation;
    document.getElementById('scorecard-rationale').textContent = uc.rationale;
    
    // Populate alternatives bullets
    const altsList = document.getElementById('scorecard-alternatives');
    altsList.innerHTML = '';
    uc.alternatives.forEach(alt => {
        const li = document.createElement('li');
        li.textContent = alt;
        altsList.appendChild(li);
    });
    
    // Auto-read aloud advisory when scorecard loads
    speakAdvisory();
}

// Multilingual TTS Speech synthesis
function speakAdvisory() {
    const uc = useCasesDatabase[activeSpeechKey];
    if (!uc || !window.speechSynthesis) return;
    
    // Cancel active speakers
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(uc.voiceText);
    
    // Resolve matching local voice locales based on selected lang
    if (currentLanguage === 'hi') utterance.lang = 'hi-IN';
    else if (currentLanguage === 'kn') utterance.lang = 'kn-IN';
    else if (currentLanguage === 'ta') utterance.lang = 'ta-IN';
    else if (currentLanguage === 'te') utterance.lang = 'te-IN';
    else if (currentLanguage === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-IN';
    
    window.speechSynthesis.speak(utterance);
}

// Multimodal simulators (Voice / Location / Camera)
let locationActive = false;
function toggleLocation() {
    const btn = document.getElementById('btn-location-gps');
    locationActive = !locationActive;
    
    const toast = document.getElementById('chat-status-toast');
    if (locationActive) {
        btn.classList.add('active');
        toast.textContent = "📍 Current GPS Location attached (Delhi Smart City Division).";
        toast.style.display = 'block';
    } else {
        btn.classList.remove('active');
        toast.style.display = 'none';
    }
}

let isRecordingVoice = false;
function toggleVoiceRecording() {
    const btn = document.getElementById('btn-mic-toggle');
    isRecordingVoice = !isRecordingVoice;
    
    const toast = document.getElementById('chat-status-toast');
    if (isRecordingVoice) {
        btn.classList.add('recording');
        toast.textContent = "🎤 Voice recording started... Speak in Hindi, Kannada or English.";
        toast.style.display = 'block';
        
        // Simulates voice note duration finish
        setTimeout(() => {
            if (isRecordingVoice) {
                toggleVoiceRecording();
                // Set query input box to simulated voice transcript
                const inputEl = document.getElementById('chat-input-text');
                inputEl.value = "Should I buy a flat in Pune Hinjenwadi corridor?";
                submitUserQuery('flatpune');
            }
        }, 3000);
    } else {
        btn.classList.remove('recording');
        toast.style.display = 'none';
    }
}

function triggerFileUpload() {
    document.getElementById('image-upload-input').click();
}

function handleFileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const toast = document.getElementById('chat-status-toast');
    toast.textContent = `📷 Uploaded Multimodal PDF/Image: ${file.name}. Analyzing via Vertex AI OCR...`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
        // Simulate real estate PDF scan match
        const inputEl = document.getElementById('chat-input-text');
        inputEl.value = `Analyzing property invoice: ${file.name}`;
        submitUserQuery('flatpune');
    }, 2000);
}

// Common Problems Help Desk Click Router
function solveCommonProblem(problemKey) {
    if (problemKey === 'water') {
        selectPopularQuestion('borewell');
    } else if (problemKey === 'traffic') {
        selectPopularQuestion('orrcongestion');
    } else if (problemKey === 'grocery') {
        selectPopularQuestion('mandi');
    } else if (problemKey === 'weather') {
        selectPopularQuestion('floodroute');
    }
}

// What-If policy sliders (Admin Mode)
function runSimulation() {
    const pumpingVal = document.getElementById('slide-pumping').value;
    const trafficVal = document.getElementById('slide-traffic').value;
    const coldchainVal = document.getElementById('slide-coldchain').value;
    const geopolVal = document.getElementById('slide-geopol').value;
    
    // Update inline labels
    document.getElementById('val-pumping').textContent = `${pumpingVal}% Draw`;
    document.getElementById('val-traffic').textContent = `${trafficVal}% Auto`;
    document.getElementById('val-coldchain').textContent = `₹${parseInt(coldchainVal).toLocaleString('en-IN')} /Ton`;
    document.getElementById('val-geopol').textContent = `${geopolVal}% Divert`;
    
    // Dynamically calculate gauges
    let safetyIdx = Math.round(95 - (pumpingVal - 40) * 0.4);
    let costIdx = Math.round(72 + (coldchainVal - 3000) * 0.003);
    let growthIdx = Math.round(88 + (geopolVal - 20) * 0.2);
    let pollutionIdx = Math.round(54 - (trafficVal - 40) * 0.1);
    
    document.getElementById('gauge-val-safety').textContent = `${safetyIdx}%`;
    document.getElementById('gauge-val-cost').textContent = `${costIdx}%`;
    document.getElementById('gauge-val-future').textContent = `${growthIdx}%`;
    document.getElementById('gauge-val-pollution').textContent = `${pollutionIdx}%`;
    
    const advisory = document.getElementById('sim-advisory');
    if (safetyIdx > 80 && growthIdx > 80) {
        advisory.textContent = `🟢 Policy Optimizer Confirmed. Drip irrigation limits aquifer depletion. Traffic auto-tuning (${trafficVal}%) keeps transport latency low. Cold-chain storage preserves vegetable inventory.`;
    } else {
        advisory.textContent = `🟡 Warning: Extreme tubewell draw (${pumpingVal}%) combined with low cold-chain subsidies increases supply chain rot and lowers regional water table sustainability score.`;
    }
}

// CPU vs GPU RAPIDS Benchmark Model
function runBenchmark(mode) {
    const progressBox = document.getElementById('bench-progress-box');
    const progressBar = document.getElementById('progress-bar');
    const label = document.getElementById('bench-progress-label');
    
    if (progressBox && progressBar && label) {
        progressBox.style.display = 'block';
        progressBar.style.width = '0%';
        
        let targetTime = (mode === 'cpu') ? 12800 : 71;
        let start = null;
        
        if (mode === 'cpu') {
            label.textContent = "Executing Spatial-Temporal Kriging on CPU Cluster (16 vCPUs)...";
            document.getElementById('btn-run-cpu').disabled = true;
            
            function stepCpu(timestamp) {
                if (!start) start = timestamp;
                let progress = timestamp - start;
                let pct = Math.min((progress / 3000) * 100, 100); // speed up anim to 3s for user convenience
                progressBar.style.width = `${pct}%`;
                
                if (pct < 100) {
                    window.requestAnimationFrame(stepCpu);
                } else {
                    document.getElementById('btn-run-cpu').disabled = false;
                    document.getElementById('cpu-time-val').textContent = "12.8s";
                    compareBenchmarks();
                }
            }
            window.requestAnimationFrame(stepCpu);
        } else {
            label.textContent = "Offloading spatial matrices to NVIDIA H100 GPU Spark RAPIDS...";
            document.getElementById('btn-run-gpu').disabled = true;
            
            setTimeout(() => {
                progressBar.style.width = '100%';
                document.getElementById('btn-run-gpu').disabled = false;
                document.getElementById('gpu-time-val').textContent = "71ms";
                compareBenchmarks();
            }, 300);
        }
    }
}

function compareBenchmarks() {
    const cpu = document.getElementById('cpu-time-val').textContent;
    const gpu = document.getElementById('gpu-time-val').textContent;
    
    if (cpu !== '--' && gpu !== '--') {
        document.getElementById('gpu-speedup-multiplier').textContent = "180x Faster";
    }
}

// Slide Deck Carousel controls
function showSlide(index) {
    if (index < 1 || index > totalSlides) return;
    activeSlideIndex = index;
    document.getElementById('slide-number').textContent = `Slide ${activeSlideIndex} of ${totalSlides}`;
    
    const slides = document.querySelectorAll('.slide-card');
    slides.forEach((slide, idx) => {
        slide.classList.remove('active', 'exit');
        if (idx + 1 === activeSlideIndex) {
            slide.classList.add('active');
        } else if (idx + 1 < activeSlideIndex) {
            slide.classList.add('exit');
        }
    });
}
function prevSlide() { if (activeSlideIndex > 1) showSlide(activeSlideIndex - 1); }
function nextSlide() { if (activeSlideIndex < totalSlides) showSlide(activeSlideIndex + 1); }

// Auto-Demo Script
function startAutoDemo() {
    const demoBtn = document.getElementById('btn-autodemo');
    if (!demoBtn) return;
    
    demoBtn.disabled = true;
    demoBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Demo running...`;
    
    // Clear chat
    document.getElementById('chat-body').innerHTML = '';
    switchMainView('dashboard');
    setUserMode('citizen');
    
    setTimeout(() => {
        // Step 1: Simulate water tanker inquiry
        appendChatMessage('user', "My crops need water. Recommends borewell drill yield in Kolar?");
        triggerPipelineAnimation(() => {
            appendChatMessage('assistant', "💡 **Monsoon Crop Selection**: Cultivate Ragi instead of Paddy. Kolar groundwater levels indicate high compaction risks.");
            populateDecisionScorecard('borewell');
        });
    }, 1000);
    
    setTimeout(() => {
        // Step 2: Switch to Officer Mode, demonstrate policy slide shifts
        setUserMode('officer');
        setWizardStep('wiz_step3');
        document.getElementById('slide-pumping').value = 70;
        runSimulation();
    }, 7000);

    setTimeout(() => {
        // Step 3: Open GPU Benchmarks, run H100 simulation
        switchMainView('benchmark');
        runBenchmark('gpu');
    }, 12000);
    
    setTimeout(() => {
        // Step 4: Run CPU benchmark comparison
        runBenchmark('cpu');
    }, 14000);

    setTimeout(() => {
        // Step 5: Switch to Pitch slides
        switchMainView('slides');
        showSlide(1);
    }, 18000);
    
    setTimeout(() => {
        showSlide(2);
    }, 21000);

    setTimeout(() => {
        showSlide(4); // Speedup slide
    }, 24000);

    setTimeout(() => {
        // Restore default
        switchMainView('dashboard');
        setUserMode('citizen');
        demoBtn.disabled = false;
        demoBtn.innerHTML = `<i class="fa-solid fa-play"></i> Run Auto-Demo`;
    }, 28000);
}
