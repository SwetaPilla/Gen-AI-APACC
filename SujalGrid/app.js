// Pravaha (प्रवाह) - Core Application, Multilingual, Accessibility & Auth Session Logic

// Global State
let activeMainView = 'dashboard';
let activeSlideIndex = 1;
const totalSlides = 10;
let activeAlert = 'kolar';
let currentMapLayer = 'water';
let simulatedWorkflows = {};
let currentLanguage = 'en';
let currentWizardStep = 'wiz_step1';

// Global Active User Profile State
let currentUser = null;
let registeredUsers = JSON.parse(localStorage.getItem('pravaha_users') || '{}');

// Multilingual Translation Database
const translations = {
    en: {
        nav_dashboard: "Control Board",
        nav_benchmark: "GPU Benchmark",
        nav_slides: "Pitch Slides",
        lbl_subbadge: "Global Grid Intelligence Core",
        lbl_status: "Core Status: Active",
        lbl_hardware: "NVIDIA H100: Active",
        btn_autodemo: "Run Auto-Demo",
        chat_header: "Step 1: Voice Complaint",
        lbl_assistant: "Pravaha Assistant",
        lbl_official: "Govt of India Official",
        lbl_chat_welcome: "🙏 Welcome to Pravaha. We coordinate Water, Traffic, Grocery, Weather, and Geopolitical routes. Select a profile below to run a simulation:",
        prof_harish: "Harish (Water - Tube-well Dry-out)",
        prof_deepak: "Deepak (Traffic - ORR Road Gridlock)",
        prof_srinivas: "Srinivas (Grocery - Rotting Tomato Supply)",
        prof_sunita: "Sunita (Weather - Cloudburst Alert)",
        prof_rajesh: "Rajesh (Geopolitical - Red Sea Choke Route)",
        pipeline_title: "NVIDIA GPU Processing Pipeline",
        pipe_ingest: "Ingest",
        pipe_cudf: "cuDF Clean",
        pipe_spark: "GPU Spark",
        pipe_gemini: "Gemini RAG",
        alerts_header: "Step 3: Active Alerts",
        alert_kolar_title: "Aquifer Depletion: Kolar Karnataka",
        alert_kolar_desc: "Water table fell by 4.2m. Critical dry-out warning inside crops zone.",
        bench_header: "NVIDIA GPU Accelerator Benchmark Panel",
        cpu_title: "Traditional CPU Processing",
        gpu_title: "NVIDIA GPU Spark RAPIDS",
        bench_why_title: "Why is this acceleration crucial for real-world deployment?",
        bench_why_desc: "Mapping groundwater tables, traffic jams, and perishable transport logistics requires calculations on massive spatial matrices. CPUs take hours to run, leading to delayed, reactive decisions. Running cuDF and Spark RAPIDS on NVIDIA H100 GPUs reduces processing times to milliseconds, enabling proactive, automated responses.",
        detail_header: "Step 4: AI Reason & Resolve",
        panel_placeholder: "Select an active operational alert to inspect explainable AI reasoning and trigger closed-loop automation workflows.",
        panel_lbl_sla: "SLA Time",
        panel_lbl_risk: "Impact Severity",
        panel_reason_title: "Explainable AI Rationale (RAG Grounded)",
        panel_actions_title: "Recommended Actions",
        btn_speak: "Listen to Advisory",
        btn_dispatch: "Approve & Execute Actions",
        sim_header: 'Step 5: Policy Simulator',
        slide_pumping: "🌾 Tube-well Draw limit",
        slide_traffic: "🚦 Traffic Auto-Tune",
        slide_coldchain: "🍅 Cold-Chain Subsidy",
        slide_geopol: "🚢 Geopolitical Bypass",
        gauge_eff: "Flow Efficiency",
        gauge_risk: "Mitigated Risk",
        gauge_cost: "Transit Energy",
        gauge_rot: "Supply Chain Rot",
        wiz_badge: "HELPING WIZARD",
        wiz_step1: "Welcome to Pravaha! <strong>Step 1:</strong> Select a citizen profile in Column 1 (WhatsApp, Left) to simulate a voice complaint about a real crisis (Water, Traffic, or Shipping).",
        wiz_step2: "<strong>Step 2:</strong> Ingestion completed! The pipeline is cleaning datasets using NVIDIA cuDF and running spatial predictions on GPU-Spark. Please wait...",
        wiz_step3: "<strong>Step 3:</strong> Alert detected on map! Select the alert in Column 2 (Center, Bottom), then click <strong>'Approve & Execute'</strong> in Column 3 (Right, Step 4) to dispatch immediate resolution.",
        wiz_step4: "<strong>Step 4:</strong> Crisis resolved successfully! Try adjusting the policy sliders in Column 3 (Right, Step 5) to optimize regional efficiency and watch risk values drop in real-time."
    },
    hi: {
        nav_dashboard: "नियंत्रण बोर्ड",
        nav_benchmark: "GPU बेंचमार्क",
        nav_slides: "प्रस्तुति स्लाइड",
        lbl_subbadge: "ग्लोबल ग्रिड इंटेलिजेंस कोर",
        lbl_status: "कोर स्थिति: सक्रिय",
        lbl_hardware: "NVIDIA H100: सक्रिय",
        btn_autodemo: "ऑटो-डेमो चलाएं",
        chat_header: "चरण १: व्हाट्सएप आवाज शिकायत",
        lbl_assistant: "प्रवाह सहायक",
        lbl_official: "भारत सरकार के अधिकारी",
        lbl_chat_welcome: "🙏 प्रवाह में आपका स्वागत है। हम जल, यातायात, रसद, मौसम और भू-राजनीतिक मार्गों का समन्वय करते हैं। सिमुलेशन शुरू करने के लिए नीचे एक प्रोफाइल चुनें:",
        prof_harish: "हरीश (जल - नलकूप सूखा)",
        prof_deepak: "दीपक (यातायात - ओआरआर ग्रिडलॉक)",
        prof_srinivas: "श्रीनिवास (रसद - टमाटर सड़ने का जोखिम)",
        prof_sunita: "सुनीता (मौसम - मेघगर्जन अलर्ट)",
        prof_rajesh: "राजेश (भू-राजनीति - लाल सागर मार्ग अवरोध)",
        pipeline_title: "NVIDIA GPU प्रसंस्करण पाइपलाइन",
        pipe_ingest: "डेटा इनपुट",
        pipe_cudf: "cuDF सफाई",
        pipe_spark: "GPU स्पार्क",
        pipe_gemini: "जेमिनी RAG",
        alerts_header: "चरण ३: सक्रिय अलर्ट",
        alert_kolar_title: "जलभृत रिक्तीकरण: कोलार कर्नाटक",
        alert_kolar_desc: "जल स्तर 4.2 मीटर नीचे गिरा। फसल क्षेत्र में गंभीर सूखे की चेतावनी।",
        bench_header: "NVIDIA GPU त्वरक बेंचमार्क पैनल",
        cpu_title: "पारंपरिक CPU प्रसंस्करण",
        gpu_title: "NVIDIA GPU स्पार्क RAPIDS",
        bench_why_title: "वास्तविक परिनियोजन के लिए यह त्वरण क्यों आवश्यक है?",
        bench_why_desc: "भूजल स्तर, यातायात जाम और खराब होने वाली रसद मार्गों की मैपिंग के लिए बड़े स्थानिक मैट्रिक्स पर गणना की आवश्यकता होती है। सीपीयू को चलाने में घंटों लगते हैं, जिससे प्रतिक्रिया में देरी होती है। एनवीडिया एच१०० पर cuDF और स्पार्क रैपिड्स चलाने से प्रसंस्करण समय मिलीसेकंड तक कम हो जाता है, जिससे सक्रिय प्रतिक्रियाएं सक्षम होती हैं।",
        detail_header: "चरण ४: एआई समाधान",
        panel_placeholder: "एआई तर्क का निरीक्षण करने और बंद-लूप स्वचालन को ट्रिगर करने के लिए एक सक्रिय अलर्ट चुनें।",
        panel_lbl_sla: "अवधि समय",
        panel_lbl_risk: "प्रभाव तीव्रता",
        panel_reason_title: "व्याख्यात्मक एआई स्पष्टीकरण (RAG आधारित)",
        panel_actions_title: "अनुशंसित कार्रवाइयां",
        btn_speak: "परामर्श सुनें",
        btn_dispatch: "कार्रवाई स्वीकृत और निष्पादित करें",
        sim_header: 'चरण ५: पॉलिसी सिम्युलेटर',
        slide_pumping: "🌾 नलकूप निष्कर्षण सीमा",
        slide_traffic: "🚦 ट्रैफिक ऑटो-ट्यून",
        slide_coldchain: "🍅 कोल्ड-चेन सब्सिडी",
        slide_geopol: "🚢 भू-राजनीतिक बाईपास",
        gauge_eff: "प्रवाह दक्षता",
        gauge_risk: "कम किया गया जोखिम",
        gauge_cost: "परिवहन ऊर्जा",
        gauge_rot: "सप्लाई चेन सड़न",
        wiz_badge: "मददगार विजार्ड",
        wiz_step1: "प्रवाह में आपका स्वागत है! <strong>चरण १:</strong> वास्तविक संकट (पानी, यातायात, या नौवहन) के बारे में शिकायत दर्ज करने के लिए कॉलम १ (व्हाट्सएप, बाएं) में कोई प्रोफाइल चुनें।",
        wiz_step2: "<strong>चरण २:</strong> डेटा प्राप्त हो गया है! पाइपलाइन एनवीडिया cuDF का उपयोग करके फाइलों को साफ कर रही है और जीपीयू पर स्थानिक गणना कर रही है। कृपया प्रतीक्षा करें...",
        wiz_step3: "<strong>चरण ३:</strong> नक्शे पर अलर्ट आ गया है! कॉलम २ (बीच, नीचे) में अलर्ट चुनें, फिर समाधान लागू करने के लिए कॉलम ३ (दाएं, चरण ४) में <strong>'Approve & Execute'</strong> पर क्लिक करें।",
        wiz_step4: "<strong>चरण ४:</strong> संकट सफलतापूर्वक हल हो गया है! दक्षता बढ़ाने के लिए कॉलम ३ (दाएं, चरण ५) में पॉलिसी स्लाइडर्स को एडजस्ट करें और वास्तविक समय में जोखिम घटते हुए देखें।"
    },
    kn: {
        nav_dashboard: "ನಿಯಂತ್ರಣ ಫಲಕ",
        nav_benchmark: "GPU ಮಾನದಂಡ",
        nav_slides: "ಸ್ಲೈಡ್‌ಗಳು",
        lbl_subbadge: "ಜಾಗತಿಕ ಗ್ರಿಡ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಕೋರ್",
        lbl_status: "ಸ್ಥಿತಿ: ಸಕ್ರಿಯ",
        lbl_hardware: "NVIDIA H100: ಸಕ್ರಿಯ",
        btn_autodemo: "ಸ್ವಯಂ ಪ್ರದರ್ಶನ",
        chat_header: "ಹಂತ ೧: ವಾಟ್ಸಾಪ್ ದೂರು",
        lbl_assistant: "ಪ್ರವಾಹ ಸಹಾಯಕ",
        lbl_official: "ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕಾರಿ",
        lbl_chat_welcome: "🙏 ಪ್ರವಾಹಕ್ಕೆ ಸುಸ್ವಾಗತ. ನಾವು ನೀರು, ಸಂಚಾರ, ತರಕಾರಿ ಲಾಜಿಸ್ಟಿಕ್ಸ್, ಹವಾಮಾನ ಮತ್ತು ಭೂರಾಜಕೀಯ ಮಾರ್ಗಗಳನ್ನು ಸಂಯೋಜಿಸುತ್ತೇವೆ. ಸಿಮ್ಯುಲೇಶನ್ ರನ್ ಮಾಡಲು ಕೆಳಗಿನ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ:",
        prof_harish: "ಹರೀಶ್ (ನೀರು - ಕೊಳವೆ ಬಾವಿ ಒಣಗಿದೆ)",
        prof_deepak: "ದೀಪಕ್ (ಸಂಚಾರ - ರಸ್ತೆ ತಡೆ)",
        prof_srinivas: "ಶ್ರೀನಿವಾಸ್ (ತರಕಾರಿ - ಕೊಳೆಯುವ ಟೊಮೆಟೊ)",
        prof_sunita: "ಸುನಿತಾ (ಹವಾಮಾನ - ಮೇಘಸ್ಫೋಟ ಎಚ್ಚರಿಕೆ)",
        prof_rajesh: "ರಾಜೇಶ್ (ಭೂರಾಜಕೀಯ - ರೆಡ್ ಸೀ ಬ್ಲಾಕ್)",
        pipeline_title: "NVIDIA GPU ಪ್ರೊಸೆಸಿಂಗ್ ಪೈಪ್‌ಲೈನ್",
        pipe_ingest: "ಇಂಗೆಸ್ಟ್",
        pipe_cudf: "cuDF ಕ್ಲೀನ್",
        pipe_spark: "GPU ಪ್ರೊಸೆಸಿಂಗ್",
        pipe_gemini: "ಜೆಮಿನಿ RAG",
        alerts_header: "ಹಂತ ೩: ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
        alert_kolar_title: "ಕೊಳವೆ ಬಾವಿ ಒಣಗುವಿಕೆ: ಕೋಲಾರ ಕರ್ನಾಟಕ",
        alert_kolar_desc: "ನೀರಿನ ಮಟ್ಟ 4.2 ಮೀಟರ್ ಕುಸಿದಿದೆ. ಬೆಳೆ ವಲಯದಲ್ಲಿ ತೀವ್ರ ನೀರಿನ ಕೊರತೆ.",
        bench_header: "NVIDIA GPU ವೇಗೋತ್ಕರ್ಷದ ಮಾನದಂಡ",
        cpu_title: "ಸಾಂಪ್ರದಾಯಿಕ CPU ಪ್ರೊಸೆಸಿಂಗ್",
        gpu_title: "NVIDIA GPU ಸ್ಪಾರ್ಕ್ RAPIDS",
        bench_why_title: "ವೇಗೋತ್ಕರ್ಷ ಏಕೆ ಮುಖ್ಯ?",
        bench_why_desc: "ನೀರಿನ ಮಟ್ಟಗಳು, ಸಂಚಾರ ದಟ್ಟಣೆ ಮತ್ತು ಹಾಳಾಗುವ ತರಕಾರಿ ಸರಬರಾಜು ಮಾರ್ಗಗಳನ್ನು ಮ್ಯಾಪ್ ಮಾಡಲು ಬೃಹತ್ ಡೇಟಾ ಅಗತ್ಯವಿರುತ್ತದೆ. ಸಿಪಿಯುಗಳು ಗಂಟೆಗಟ್ಟಲೆ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತವೆ. ಎನ್ವಿಡಿಯಾ H100 ಜಿಪಿಯುನಲ್ಲಿ cuDF ಚಾಲನೆ ಮಾಡುವುದರಿಂದ ಡೇಟಾ ಲೆಕ್ಕಾಚಾರವು ಮಿಲಿಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ ಮುಕ್ತಾಯಗೊಂಡು ತ್ವರಿತ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
        detail_header: "ಹಂತ ೪: ನಿರ್ಧಾರ ಫಲಕ",
        panel_placeholder: "ಎಚ್ಚರಿಕೆಯ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ ಕ್ರಮಗಳನ್ನು ಕೈಗೊಳ್ಳಲು ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಯನ್ನು ಆರಿಸಿ.",
        panel_lbl_sla: "ಸಮಯ ಮಿತಿ",
        panel_lbl_risk: "ಪ್ರಭಾವದ ತೀವ್ರತೆ",
        panel_reason_title: "ವಿವರಣಾತ್ಮಕ AI ತಾರ್ಕಿಕತೆ (RAG ಆಧಾರಿತ)",
        panel_actions_title: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳು",
        btn_speak: "ಶಿಫಾರಸನ್ನು ಆಲಿಸಿ",
        btn_dispatch: "ಕ್ರಮಗಳನ್ನು ಅನುಮೋದಿಸಿ ಮತ್ತು ಜಾರಿಗೊಳಿಸಿ",
        sim_header: 'ಹಂತ ೫: ಫ್ಲೋ ನಿಯಂತ್ರಕ',
        slide_pumping: "🌾 ಕೊಳವೆಬಾವಿ ಬಳಕೆ ಮಿತಿ",
        slide_traffic: "🚦 ಸಂಚಾರ ಸ್ವಯಂ-ಟ್ಯೂನ್",
        slide_coldchain: "🍅 ಕೋಲ್ಡ್-ಚೈನ್ ಸಬ್ಸಿಡಿ",
        slide_geopol: "🚢 ಭೂರಾಜಕೀಯ ಬೈಪಾಸ್",
        gauge_eff: "ಹರಿವಿನ ದಕ್ಷತೆ",
        gauge_risk: "ಕಡಿಮೆಗೊಳಿಸಿದ ಅಪಾಯ",
        gauge_cost: "ಸಾರಿಗೆ ಇಂಧನ ವೆಚ್ಚ",
        gauge_rot: "ಬೆಳೆ ಕೊಳೆಯುವಿಕೆ",
        wiz_badge: "ಸಹಾಯ ವಿಝಾರ್ಡ್",
        wiz_step1: "ಪ್ರವಾಹಕ್ಕೆ ಸುಸ್ವಾಗತ! <strong>ಹಂತ ೧:</strong> ಅಂತರ್ಜಲ, ಸಂಚಾರ ದಟ್ಟಣೆ ಅಥವಾ ಹಡಗು ಮಾರ್ಗ ತಡೆ ಬಗ್ಗೆ ದೂರು ನೀಡಲು ಎಡಭಾಗದಲ್ಲಿರುವ ವಾಟ್ಸಾಪ್ ಪ್ರೊಫೈಲ್ ಆರಿಸಿ.",
        wiz_step2: "<strong>ಹಂತ ೨:</strong> ಡೇಟಾ ಸಂಸ್ಕರಣೆ ನಡೆಯುತ್ತಿದೆ! ಎನ್ವಿಡಿಯಾ cuDF ಕ್ಲೀನ್ ಆಗ್ತಾ ಇದೆ ಮತ್ತು ಜಿಪಿಯು-ಸ್ಪಾರ್ಕ್ ಮೂಲಕ ಅಂತರ್ಜಲ ಲೆಕ್ಕಾಚಾರ ನಡೀತಿದೆ. ದಯವಿಟ್ಟು ಕಾಯಿರಿ...",
        wiz_step3: "<strong>ಹಂತ ೩:</strong> ಅಂತರ್ಜಲ ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ! ನಕ್ಷೆಯ ಕೆಳಗಿರುವ ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಯನ್ನು ಆರಿಸಿ, ನಂತರ ಬಲಭಾಗದಲ್ಲಿರುವ <strong>'Approve & Execute'</strong> ಬಟನ್ ಒತ್ತಿ.",
        wiz_step4: "<strong>ಹಂತ ೪:</strong> ಸಮಸ್ಯೆ ಯಶಸ್ವಿಯಾಗಿ ಬಗೆಹರಿದಿದೆ! ನೀರಿನ ದಕ್ಷತೆ ಹೆಚ್ಚಿಸಲು ಬಲಗಡೆಯ ಕೆಳಗಿರುವ <strong>ಫ್ಲೋ ಸಿಮ್ಯುಲೇಟರ್</strong> ಸ್ಲೈಡರ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ ಪ್ರಗತಿ ವೀಕ್ಷಿಸಿ."
    },
    mr: {
        nav_dashboard: "नियंत्रण बोर्ड",
        nav_benchmark: "GPU बेंचमार्क",
        nav_slides: "सादरीकरण",
        lbl_subbadge: "ग्लोबल ग्रिड इंटेलिजेंस कोर",
        lbl_status: "कोर स्थिती: सक्रिय",
        lbl_hardware: "NVIDIA H100: सक्रिय",
        btn_autodemo: "ऑतो-डेमो चालवा",
        chat_header: "पायरी १: व्हॉट्सॲप तक्रार",
        lbl_assistant: "प्रवाह सहाय्यक",
        lbl_official: "भारत सरकारचे अधिकारी",
        lbl_chat_welcome: "🙏 प्रवाह मध्ये आपले स्वागत आहे. आम्ही पाणी, वाहतूक, भाजीपाला रसद, हवामान आणि भू-राजकीय मार्ग यांचे समन्वय करतो. सिमुलेशनसाठी खालील प्रोफाइल निवडा:",
        prof_harish: "हरीश (पाणी - कूपनलिका कोरडी)",
        prof_deepak: "दीपक (वाहतूक - ओआरआर रस्ता कोंडी)",
        prof_srinivas: "श्रीनिवास (भाजीपाला - टोमॅटो नुकसान)",
        prof_sunita: "सुनीता (हवामान - ढगफुटी इशारा)",
        prof_rajesh: "राजेश (भू-राजकीय - लाल समुद्र मार्ग कोंडी)",
        pipeline_title: "NVIDIA GPU प्रक्रिया पाइपलाइन",
        pipe_ingest: "डेटा इनपुट",
        pipe_cudf: "cuDF स्वच्छता",
        pipe_spark: "GPU स्पार्क",
        pipe_gemini: "जेमिनी RAG",
        alerts_header: "पायरी ३: सक्रिय अलर्ट",
        alert_kolar_title: "जलभृत घट: कोलार कर्नाटक",
        alert_kolar_desc: "पाण्याची पातळी ४.२ मीटर खाली गेली. शेती क्षेत्रात पाणी टंचाईचा इशारा.",
        bench_header: "NVIDIA GPU प्रवेगक बेंचमार्क",
        cpu_title: "पारंपारिक CPU प्रक्रिया",
        gpu_title: "NVIDIA GPU स्पार्क RAPIDS",
        bench_why_title: "प्रवेग का महत्वाचा आहे?",
        bench_why_desc: "भूजल पातळी, वाहतूक कोंडी आणि भाजीपाला रसद मार्गांचे मॅपिंग करण्यासाठी मोठ्या स्थानिक डेटावर प्रक्रिया करावी लागते. सीपीयूला तासनतास लागतात, ज्यामुळे निर्णयात उशीर होतो. एनव्हिडिया एच१०० वर cuDF आणि स्पार्क रॅपिड्स चालवल्याने प्रक्रिया वेळ मिलिसेकंदांपर्यंत कमी होतो, ज्यामुळे जलद निर्णय शक्य होतात.",
        detail_header: "पायरी ४: एआई निराकरण",
        panel_placeholder: "तपशील तपासण्यासाठी आणि स्वयंचलित क्रिया सक्रिय करण्यासाठी सक्रिय अलर्ट निवडा.",
        panel_lbl_sla: "कालावधी",
        panel_lbl_risk: "प्रभाव तीव्रता",
        panel_reason_title: "स्पष्टीकरणात्मक एआय तर्क (RAG वर आधारित)",
        panel_actions_title: "शिफारस केलेल्या कृती",
        btn_speak: "परामर्श ऐका",
        btn_dispatch: "कृती मंजूर आणि अंमलात आणा",
        sim_header: 'पायरी ५: पॉलिसी सिम्युलेटर',
        slide_pumping: "🌾 कूपनलिका उपसा मर्यादा",
        slide_traffic: "🚦 वाहतूक ऑटो-ट्यून",
        slide_coldchain: "🍅 कोल्ड-चेन सबसिडी",
        slide_geopol: "🚢 भू-राजकीय बायपास",
        gauge_eff: "प्रवाह कार्यक्षमता",
        gauge_risk: "कमी झालेला धोका",
        gauge_cost: "वाहतूक ऊर्जा खर्च",
        gauge_rot: "पीक सडण्याचे प्रमाण",
        wiz_badge: "मददगार विजार्ड",
        wiz_step1: "प्रवाह मध्ये आपले स्वागत आहे! <strong>पायरी १:</strong> संकट (पाणी, वाहतूक, किंवा जलमार्ग कोंडी) बद्दल तक्रार सिम्युलेट करण्यासाठी कॉलम १ (व्हॉट्सॲप, डावीकडे) मध्ये एक प्रोफाइल निवडा.",
        wiz_step2: "<strong>पायरी २:</strong> डेटा प्राप्त झाला आहे! पाइपलाइन एनव्हिडिया cuDF वापरून फाइल्स साफ करत आहे आणि जीपीयू वर स्थानिक गणना करत आहे. कृपया वाट पहा...",
        wiz_step3: "<strong>पायरी ३:</strong> नकाशावर अलर्ट आला आहे! कॉलम २ (मधे, खाली) मधील अलर्ट निवडा, नंतर निराकरण करण्यासाठी कॉलम ३ (उजवीकडे, पायरी ४) मधील <strong>'Approve & Execute'</strong> वर क्लिक करा.",
        wiz_step4: "<strong>पायरी ४:</strong> संकट यशस्वीरित्या मिटले आहे! कार्यक्षमता वाढवण्यासाठी कॉलम ३ (उजवीकडे, पायरी ५) मधील पॉलिसी स्लाइडर्स ॲडजस्ट करा आणि जोखीम कमी होताना पहा."
    }
};

// Simulated profiles translated advisories
const alertsDataLocalized = {
    en: {
        kolar: {
            title: "Aquifer Depletion: Kolar Karnataka",
            impact: "8,500 Farmers",
            sla: "48 Hours",
            rationale: "Groundwater levels in Kolar have depleted below critical clay threshold (28m). Model forecasts 85% probability of permanent aquifer compaction and soil collapse unless draw-off is restricted. Pumping energy has spiked by 42%.",
            actions: [
                "Initiate artificial rainwater recharge wells to replenish groundwater.",
                "Enforce a 20% agricultural tube-well draw-off limit during daytime peak solar hours.",
                "Broadcast localized Kannada voice recommendations to 1,200 farmers on WhatsApp."
            ]
        },
        traffic: {
            title: "Traffic Jam: Bengaluru Outer Ring Road",
            impact: "18,000 Commuters",
            sla: "2 Hours",
            rationale: "Waterlogging at Silk Board junction has reduced road capacity by 70%. Traffic queue length extends to 4.2km. Delivery delays are impacting grocery logistics.",
            actions: [
                "Auto-optimize regional traffic signals by 40% adaptive timing shifts.",
                "Trigger Gati detour routing recommendations to all logistics trucks in transit.",
                "Broadcast alternate routes to commuters via local WhatsApp alerts."
            ]
        },
        grocery: {
            title: "Tomato Logistics Spoilage: APMC Corridor",
            impact: "₹18L Perishable Inventory",
            sla: "12 Hours",
            rationale: "Onion/Tomato trucks delayed at state border checkpoints in 38°C heat. Spoilage risk index has spiked to 82% due to lack of cold-chain protection.",
            actions: [
                "Activate emergency transit clearances for agricultural cargo trucks.",
                "Redirect highly vulnerable inventory to the nearest municipal cold storage hub.",
                "Disburse automated micro-subsidies to farmers via Direct Benefit Transfer (DBT)."
            ]
        },
        weather: {
            title: "Flash Flood Warning: Mumbai Ward 3",
            impact: "1.2 Lakh Citizens",
            sla: "30 Mins",
            rationale: "Doppler radar forecasts high-intensity storm cell (120mm/hr precipitation) hovering over Ward 3. Milan Subway water sensor has crossed warning threshold.",
            actions: [
                "Dispatch mobile storm drain pumping crews to Milan Subway immediately.",
                "Activate local ward sirens and trigger emergency WhatsApp broadcasts in Marathi.",
                "Divert incoming suburban trains and buses away from low-lying flooding spots."
            ]
        },
        geopolitical: {
            title: "Maritime Shipping Lane Blockade: Red Sea",
            impact: "42 Indian Grain Cargo Ships",
            sla: "96 Hours",
            rationale: "Bab-el-Mandeb shipping corridor blockaded. Re-routing cargo around Cape of Good Hope adds 12 days to transit and spikes fuel costs by 28%, driving wheat inflation.",
            actions: [
                "Divert state-sponsored grain vessels to the Cape of Good Hope bypass route.",
                "Initiate strategic grain buffer releases in APMC stores to stabilize retail prices.",
                "Enable dynamic shipping fuel subsidies via sovereign logistics credit lines."
            ]
        }
    },
    hi: {
        kolar: {
            title: "जलभृत रिक्तीकरण: कोलार कर्नाटक",
            impact: "८,५०० किसान",
            sla: "४८ घंटे",
            rationale: "कोलार में भूजल स्तर क्रिटिकल क्ले सीमा (२८ मीटर) से नीचे चला गया है। जब तक पंपिंग को सीमित नहीं किया जाता, तब तक स्थायी जलभृत संघनन और मिट्टी के धंसने की ८५% संभावना है। ऊर्जा खपत ४२% बढ़ गई है।",
            actions: [
                "भूजल को फिर से भरने के लिए कृत्रिम वर्षा जल पुनर्भरण कुएं शुरू करें।",
                "कृषि नलकूपों पर दिन के समय २०% पंपिंग निकासी सीमा लागू करें।",
                "व्हाट्सएप पर १,२०० किसानों को स्थानीय कन्नड़ भाषा में आवाज परामर्श भेजें।"
            ]
        },
        traffic: {
            title: "यातायात जाम: बेंगलोर आउटर रिंग रोड",
            impact: "१८,००० यात्री",
            sla: "२ घंटे",
            rationale: "सिल्क बोर्ड जंक्शन पर जलभराव के कारण सड़क क्षमता ७०% कम हो गई है। ट्रैफिक कतार की लंबाई ४.२ किमी तक बढ़ गई है। डिलीवरी में देरी से खाद्य रसद प्रभावित हो रही है।",
            actions: [
                "क्षेत्रीय यातायात सिग्नलों को ४०% अनुकूली समय बदलावों द्वारा स्वचालित रूप से अनुकूलित करें।",
                "पारगमन में सभी रसद ट्रकों के लिए गति मार्ग विचलन की सिफारिश करें।",
                "स्थानीय व्हाट्सएप अलर्ट के माध्यम से यात्रियों को वैकल्पिक मार्गों का प्रसारण करें।"
            ]
        },
        grocery: {
            title: "टमाटर रसद सड़न: एपीएमसी कॉरिडोर",
            impact: "₹१८ लाख खराब होने वाली उपज",
            sla: "१२ घंटे",
            rationale: "३८ डिग्री सेल्सियस गर्मी में राज्य सीमा चौकियों पर प्याज/टमाटर के ट्रक ८ घंटे से विलंबित हैं। कोल्ड-चेन सुरक्षा की कमी के कारण सड़ने का जोखिम सूचकांक ८२% तक बढ़ गया है।",
            actions: [
                "कृषि कार्गो ट्रकों के लिए आपातकालीन पारगमन मंजूरी सक्रिय करें।",
                "अति संवेदनशील टमाटर उपज को नजदीकी नगर निगम कोल्ड स्टोरेज हब में पुनर्निर्देशित करें।",
                "डायरेक्ट बेनिफिट ट्रांसफर (DBT) के माध्यम से किसानों को सब्सिडी वितरित करें।"
            ]
        },
        weather: {
            title: "आकस्मिक बाढ़ की चेतावनी: मुंबई वार्ड ३",
            impact: "१.२ लाख नागरिक",
            sla: "३० मिनट",
            rationale: "डॉप्लर रडार ने वार्ड ३ के ऊपर उच्च तीव्रता वाले तूफान सेल (१२० मिमी/घंटा बारिश) का अनुमान लगाया है। मिलान सबवे सेंसर ने चेतावनी स्तर पार कर लिया है।",
            actions: [
                "मिलान सबवे में तुरंत मोबाइल स्टॉर्म ड्रेन पंपिंग क्रू भेजें।",
                "स्थानीय वार्ड साइरन सक्रिय करें और मराठी में आपातकालीन व्हाट्सएप संदेश भेजें।",
                "निचले जलभराव वाले स्थानों से उपनगरीय ट्रेनों और बसों को डाइवर्ट करें।"
            ]
        },
        geopolitical: {
            title: "नौवहन मार्ग अवरोध: लाल सागर",
            impact: "४२ भारतीय अनाज जहाज",
            sla: "९६ घंटे",
            rationale: "बाब-अल-मंडेब नौवहन गलियारा अवरुद्ध। केप ऑफ गुड होप के आसपास माल भेजने से पारगमन में १२ दिन जुड़ते हैं और ईंधन लागत २८% बढ़ जाती है, जिससे गेहूं की मुद्रास्फीति बढ़ रही है।",
            actions: [
                "राज्य प्रायोजित अनाज जहाजों को केप ऑफ गुड होप बाईपास मार्ग पर डाइवर्ट करें।",
                "खुदरा कीमतों को स्थिर करने के लिए एपीएमसी दुकानों में अनाज भंडार जारी करें।",
                "संप्रभु रसद क्रेडिट लाइनों के माध्यम से नौवहन ईंधन सब्सिडी सक्षम करें।"
            ]
        }
    },
    kn: {
        kolar: {
            title: "ಕೊಳವೆ ಬಾವಿ ಒಣಗುವಿಕೆ: ಕೋಲಾರ ಕರ್ನಾಟಕ",
            impact: "೮, ೫೦೦ ರೈತರು",
            sla: "೪೮ ಗಂಟೆಗಳು",
            rationale: "ಕೋಲಾರದಲ್ಲಿ ಅಂತರ್ಜಲ ಮಟ್ಟವು ತೀವ್ರವಾಗಿ ಕುಸಿದಿದ್ದು (೨೮ ಮೀಟರ್), ಮಣ್ಣಿನ ಕುಸಿತದ ಅಪಾಯವು ೮೫% ಹೆಚ್ಚಾಗಿದೆ. ಪಂಪ್‌ ಮಾಡಲು ಬಳಸುವ ವಿದ್ಯುತ್ ವೆಚ್ಚ ೪೨% ಹೆಚ್ಚಾಗಿದೆ.",
            actions: [
                "ಅಂತರ್ಜಲ ಮರುಪೂರಣಕ್ಕಾಗಿ ಮಳೆನೀರು ಕೊಯ್ಲು ಬಾವಿಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",
                "ದಿನದ ಗರಿಷ್ಠ ಬಿಸಿಲಿನ ಸಮಯದಲ್ಲಿ ಕೊಳವೆಬಾವಿಗಳ ಬಳಕೆಯನ್ನು ೨೦% ರಷ್ಟು ಮಿತಿಗೊಳಿಸಿ.",
                "ಕನ್ನಡ ಭಾಷೆಯಲ್ಲಿ ಅಂತರ್ಜಲ ಸ್ಥಿತಿಯ ಧ್ವನಿ ಎಚ್ಚರಿಕೆಯನ್ನು ರೈತರಿಗೆ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಿ."
            ]
        },
        traffic: {
            title: "ಸಂಚಾರ ದಟ್ಟಣೆ: ಬೆಂಗಳೂರು ಹೊರವರ್ತುಲ ರಸ್ತೆ",
            impact: "೧೮, ೦೦೦ ಪ್ರಯಾಣಿಕರು",
            sla: "೨ ಗಂಟೆಗಳು",
            rationale: "ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಜಂಕ್ಷನ್‌ನಲ್ಲಿ ಮಳೆನೀರು ನಿಂತಿದ್ದರಿಂದ ರಸ್ತೆ ಸಾಮರ್ಥ್ಯ ೭೦% ನಷ್ಟು ಕಡಿಮೆಯಾಗಿದೆ. ಟ್ರಾಫಿಕ್ ಕ್ಯೂ ಉದ್ದ ೪.೨ ಕಿಲೋಮೀಟರ್ ತಲುಪಿದೆ.",
            actions: [
                "ಸಂಚಾರ ಸಿಗ್ನಲ್‌ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ೪೦% ಸಮಯ ಹೊಂದಾಣಿಕೆಯೊಂದಿಗೆ ಆಪ್ಟಿಮೈಸ್ ಮಾಡಿ.",
                "ಸರಕು ಸಾಗಣೆ ವಾಹನಗಳಿಗೆ ಬದಲಿ ಮಾರ್ಗಗಳ ಶಿಫಾರಸನ್ನು ತಕ್ಷಣ ರವಾನಿಸಿ.",
                "ಸ್ಥಳೀಯ ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳ ಮೂಲಕ ಪ್ರಯಾಣಿಕರಿಗೆ ಬದಲಿ ಮಾರ್ಗಗಳ ಮಾಹಿತಿ ನೀಡಿ."
            ]
        },
        grocery: {
            title: "ಟೊಮೆಟೊ ಕೊಳೆಯುವಿಕೆ: ಎಪಿಎಂಸಿ ಕಾರಿಡಾರ್",
            impact: "₹೧೮ ಲಕ್ಷ ಬೆಳೆ ನಷ್ಟ",
            sla: "೧೨ ಗಂಟೆಗಳು",
            rationale: "ರಾಜ್ಯ ಗಡಿ ತಪಾಸಣಾ ಕೇಂದ್ರದಲ್ಲಿ ಟೊಮೆಟೊ ಲಾರಿಗಳು ೩೮ ಡಿಗ್ರಿ ತಾಪಮಾನದಲ್ಲಿ ೮ ಗಂಟೆಗಳಿಂದ ಸಿಲುಕಿಕೊಂಡಿದ್ದು, ಬೆಳೆ ಕೊಳೆಯುವ ಸಾಧ್ಯತೆ ೮೨% ಹೆಚ್ಚಾಗಿದೆ.",
            actions: [
                "ಕೃಷಿ ಸರಕು ಸಾಗಣೆ ವಾಹನಗಳಿಗೆ ತಡೆರಹಿತ ಗಡಿ ದಾಟಲು ಹಸಿರು ಪಾಸ್ ನೀಡಿ.",
                "ಹಾಳಾಗುವ ತರಕಾರಿಗಳನ್ನು ಸಮೀಪದ ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್‌ಗೆ ರವಾನಿಸಿ.",
                "ರೈತರಿಗೆ ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT) ಮೂಲಕ ಬೆಳೆ ಪರಿಹಾರ ಹಣವನ್ನು ಜಮೆ ಮಾಡಿ."
            ]
        },
        weather: {
            title: "ಮೇಘಸ್ಫೋಟದ ಮುನ್ನೆಚ್ಚರಿಕೆ: ಮುಂಬೈ ವಾರ್ಡ್ ೩",
            impact: "೧.೨ ಲಕ್ಷ ಜನಸಂಖ್ಯೆ",
            sla: "೩೦ ನಿಮಿಷ",
            rationale: "ಡಾಪ್ಲರ್ ರಾಡಾರ್ ತೀವ್ರ ಮಳೆ ಮೋಡವನ್ನು (ಗಂಟೆಗೆ ೧೨೦ಮಿಮೀ ಮಳೆ) ವಾರ್ಡ್ ೩ ಮೇಲೆ ಪತ್ತೆ ಮಾಡಿದೆ. ಮಿಲನ್ ಸಬ್ವೇ ನೀರಿನ ಸಂವೇದಕ ಅಪಾಯಕಾರಿ ಮಟ್ಟ ಮೀರಿದೆ.",
            actions: [
                "ಮಿಲನ್ ಸಬ್‌ವೇಗೆ ಮೊಬೈಲ್ ಮಳೆನೀರು ಪಂಪಿಂಗ್ ತಂಡಗಳನ್ನು ತಕ್ಷಣ ಕಳುಹಿಸಿ.",
                "ಸ್ಥಳೀಯ ಎಚ್ಚರಿಕೆ ಸೈರನ್ ಸಕ್ರಿಯಗೊಳಿಸಿ ಮತ್ತು ಮರಾಠಿ ಭಾಷೆಯಲ್ಲಿ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಕಳುಹಿಸಿ.",
                "ತಗ್ಗು ಪ್ರದೇಶಗಳಿಂದ ಬಸ್ ಹಾಗೂ ರೈಲು ಸಂಚಾರವನ್ನು ಬೇರೆಡೆಗೆ ಬದಲಾಯಿಸಿ."
            ]
        },
        geopolitical: {
            title: "ಸರಕು ಸಾಗಣೆ ಮಾರ್ಗ ತಡೆ: ಕೆಂಪು ಸಮುದ್ರ",
            impact: "೪೨ ಭಾರತೀಯ ಹಡಗುಗಳು",
            sla: "೯೬ ಗಂಟೆಗಳು",
            rationale: "ಬಾಬ್-ಎಲ್-ಮಂಡೇಬ್ ಹಡಗು ಮಾರ್ಗ ಬಂದ್ ಆಗಿದ್ದು, ಆಫ್ರಿಕಾದ ಕೇಪ್ ಆಫ್ ಗುಡ್ ಹೋಪ್ ಮೂಲಕ ಹಡಗುಗಳನ್ನು ತಿರುಗಿಸುವುದರಿಂದ ಇಂಧನ ವೆಚ್ಚ ೨৮% ಹೆಚ್ಚಾಗಿದೆ.",
            actions: [
                "ಅನ್ನ ಧಾನ್ಯದ ಹಡಗುಗಳನ್ನು ಕೇಪ್ ಆಫ್ ಗುಡ್ ಹೋಪ್ ಬದಲಿ ಮಾರ್ಗಕ್ಕೆ ತಿರುಗಿಸಿ.",
                "ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಬೆಲೆ ಏರಿಕೆ ತಡೆಯಲು ಎಪಿಎಂಸಿಯಿಂದ ದಾಸ್ತಾನು ಧಾನ್ಯ ಬಿಡುಗಡೆ ಮಾಡಿ.",
                "ಹಡಗು ಇಂಧನ ವೆಚ್ಚದ ಮೇಲೆ ೨೮% ಸಬ್ಸಿಡಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ."
            ]
        }
    },
    mr: {
        kolar: {
            title: "जलभृत घट: कोलार कर्नाटक",
            impact: "८, ५०० शेतकरी",
            sla: "४८ तास",
            rationale: "कोलारमधील भूजल पातळी अत्यंत खालावली असून (२८ मीटर), जमीन खचण्याचा धोका ८५% वाढला आहे. कूपनलिकेतून पाणी उपसा करण्यासाठी विजेचा खर्च ४२% वाढला आहे.",
            actions: [
                "भूजल पुनर्भरण करण्यासाठी पावसाचे पाणी साठवण विहिरी सक्रिय करा.",
                "दिवसभरातील कूपनलिका वापराचा उपसा २०% रेषेवर मर्यादित करा.",
                "कन्नड भाषेमध्ये भूजल स्थितीची माहिती शेतकऱ्यांना व्हॉट्सॲप संदेशाद्वारे पाठवा."
            ]
        },
        traffic: {
            title: "वाहतूक कोंडी: बेंगळुरू आउटर रिंग रोड",
            impact: "१८, ००० प्रवासी",
            sla: "२ तास",
            rationale: "सिल्क बोर्ड जंक्शनवर पाणी साचल्यामुळे रस्ता क्षमता ७०% कमी झाली आहे. वाहतुकीची रांग ४.२ किलोमीटरवर गेली आहे. डिलिव्हरी वेळेत न झाल्याने नुकसान होत आहे.",
            actions: [
                "वाहतूक सिग्नल आपोआप ४०% वेळ नियंत्रणासह अनुकूलित करा.",
                "मालवाहू गाड्यांसाठी त्वरित पर्यायी मार्गांची शिफारस रवान करा.",
                "व्हॉट्सॲप संदेशाद्वारे प्रवाशांना पर्यायी मार्गांची माहिती द्या."
            ]
        },
        grocery: {
            title: "टोमॅटो नुकसान: एपीएमसी कॉरिडोर",
            impact: "₹१८ लाख माल सडण्याचा धोका",
            sla: "१२ तास",
            rationale: "३८ अंश सेल्सिअस तापमानात टोमॅटो ट्रक ८ तास सीमा नाक्यावर उभे राहिल्यामुळे टोमॅटो सडण्याचा धोका ८२% पर्यंत वाढला आहे.",
            actions: [
                "कृषी मालवाहू ट्रक्सना विनाथांबा सीमा ओलांडण्यासाठी ग्रीन पास द्या.",
                "भाजीपाला तात्काळ जवळील कोल्ड स्टोरेजमध्ये हलवा.",
                "थेट बँक खात्यात (DBT) शेतकऱ्यांना नुकसान भरपाई रक्कम जमा करा."
            ]
        },
        weather: {
            title: "ढगफुटीचा इशारा: मुंबई वॉर्ड ३",
            impact: "१.२ लाख नागरिक",
            sla: "३० मिनिटे",
            rationale: "डॉपलर रडारने वॉर्ड ३ वरती ढगफुटीचा (ताशी १२० मिमी पाऊस) अंदाज वर्तवला आहे. मिलान सबवे पाणी संवेदक पातळी ओलांडली आहे.",
            actions: [
                "मिलान सबवेकडे तात्काळ पाणी उपसा करणारी पथके रवाना करा.",
                "स्थानिक इशारा भोंगे सुरू करा आणि मराठी भाषेत व्हॉट्सॲप संदेश पाठवा.",
                "सखल भागातून बस व रेल्वे वाहतूक वळवा."
            ]
        },
        geopolitical: {
            title: "जलमार्ग कोंडी: लाल समुद्र",
            impact: "४२ भारतीय जहाजे",
            sla: "९६ तास",
            rationale: "बाॅब-एल-मंडेब जलमार्ग बंद झाल्यामुळे आफ्रिकेच्या केप ऑफ गुड होप मार्गाने जहाजे वळवल्यामुळे वाहतूक खर्च २८% वाढला असून गहू दरवाढीचा धोका आहे.",
            actions: [
                "धान्य जहाजे केप ऑफ गुड होप पर्यायी मार्गाकडे वळवा.",
                "बाजारपेठेतील दरवाढ रोखण्यासाठी राखीव धान्य बाजारात सोडा.",
                "जहाज इंधनाच्या खर्चावर २८% अनुदान सक्रिय करा."
            ]
        }
    }
};

// Initialize Clock
setInterval(updateClock, 1000);
updateClock();

function updateClock() {
    const timeSpan = document.getElementById('live-time');
    if (!timeSpan) return;
    const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZoneName: 'short' };
    timeSpan.textContent = new Date().toLocaleString('en-IN', options);
}

// Switch view panels inside the main column (seamless layout)
function switchMainView(viewId) {
    activeMainView = viewId;
    
    // Update nav button active classes
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-view-${viewId}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Hide all view panels and display the selected
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    if (viewId === 'dashboard') {
        document.getElementById('view-dashboard').classList.add('active');
        setMapLayer(currentMapLayer);
    } else if (viewId === 'benchmark') {
        document.getElementById('view-benchmark').classList.add('active');
    } else if (viewId === 'slides') {
        document.getElementById('view-slides').classList.add('active');
        showSlide(activeSlideIndex);
    }
}

// Adjust font scale size on body (senior citizen accessibility)
function adjustTextSize(size) {
    document.body.className = `cool-theme text-${size}`;
    
    // Highlight active control buttons if any
    document.querySelectorAll('.access-btn').forEach(btn => {
        btn.style.backgroundColor = 'rgba(255,255,255,0.03)';
        btn.style.color = 'var(--color-text-main)';
    });
}

// Multilingual language translation switcher
function changeLanguage() {
    const selector = document.getElementById('lang-selector');
    if (!selector) return;
    
    const lang = selector.value;
    currentLanguage = lang;
    
    // Translate all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    // Update Sanskrit tag text to matching language text if needed
    const sanskritTag = document.getElementById('lbl-sanskrit');
    if (sanskritTag) {
        sanskritTag.textContent = lang === 'en' ? "प्रवाह" : "प्रवाह";
    }
    
    // Update wizard banner text dynamically
    setWizardStep(currentWizardStep);
    
    // Update alert data UI if currently selected
    selectAlert(activeAlert);
    
    // Run allocator advisory translation
    runSimulation();
}

// Map layer selector
function setMapLayer(layerId) {
    currentMapLayer = layerId;
    
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-layer-${layerId}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    const titles = {
        water: "Step 2: Hydrology (Water) Layer",
        traffic: "Step 2: Urban Traffic (Gati) Layer",
        grocery: "Step 2: APMC Perishable Food Layer",
        weather: "Step 2: Meteorology (Weather) Layer",
        geopolitical: "Step 2: Sovereign Logistics Layer"
    };
    
    const currentTitle = document.getElementById('current-layer-title');
    if (currentTitle) {
        currentTitle.textContent = titles[layerId];
    }
    
    const layers = ['water', 'traffic', 'grocery', 'weather', 'geopolitical'];
    layers.forEach(l => {
        const layerElement = document.getElementById(`layer-${l}`);
        if (layerElement) {
            layerElement.style.display = (l === layerId) ? 'block' : 'none';
        }
    });
}

// Select Alert
function selectAlert(alertKey) {
    activeAlert = alertKey;
    
    document.querySelectorAll('.alert-item').forEach(item => {
        item.classList.remove('active-select');
    });
    const selectedItem = document.getElementById(`alert-${alertKey}-item`);
    if (selectedItem) selectedItem.classList.add('active-select');
    
    const placeholder = document.querySelector('.panel-placeholder');
    const panelData = document.getElementById('panel-data');
    
    if (placeholder && panelData) {
        placeholder.style.display = 'none';
        panelData.style.display = 'block';
        
        // Grab localized alert dictionary
        const data = alertsDataLocalized[currentLanguage][alertKey];
        document.getElementById('panel-title').textContent = data.title;
        document.getElementById('panel-sla').textContent = data.sla;
        
        const premiumSpan = document.getElementById('panel-premium');
        premiumSpan.textContent = data.impact;
        
        document.getElementById('panel-rationale').textContent = data.rationale;
        
        const actionsList = document.getElementById('panel-actions');
        actionsList.innerHTML = '';
        data.actions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            actionsList.appendChild(li);
        });
        
        // Dispatch buttons state
        const execBtn = document.querySelector('.dispatch-btn');
        if (simulatedWorkflows[alertKey]) {
            execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Resolved & Active`;
            execBtn.style.backgroundColor = '#10B981';
            execBtn.style.color = '#FFF';
            execBtn.disabled = true;
        } else {
            execBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Approve & Execute`;
            execBtn.style.backgroundColor = 'var(--color-primary)';
            execBtn.style.color = '#000';
            execBtn.disabled = false;
        }
    }
}

// Text to Speech Read Aloud (Accessibility)
function speakAdvisory() {
    const rationale = document.getElementById('panel-rationale').textContent;
    if (!rationale) return;
    
    // Stop previous speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(rationale);
    
    // Choose voice based on selected language
    if (currentLanguage === 'hi') {
        utterance.lang = 'hi-IN';
    } else if (currentLanguage === 'kn') {
        utterance.lang = 'kn-IN';
    } else if (currentLanguage === 'mr') {
        utterance.lang = 'mr-IN';
    } else {
        utterance.lang = 'en-IN';
    }
    
    window.speechSynthesis.speak(utterance);
}

// Dispatch workflow action
function dispatchWorkflow() {
    const alertKey = activeAlert;
    simulatedWorkflows[alertKey] = true;
    
    const execBtn = document.querySelector('.dispatch-btn');
    execBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching Grid Controls...`;
    execBtn.disabled = true;
    
    setTimeout(() => {
        execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Resolved & Active`;
        execBtn.style.backgroundColor = '#10B981';
        execBtn.style.color = '#FFF';
        
        // Update item in list
        const item = document.getElementById(`alert-${alertKey}-item`);
        if (item) {
            item.style.borderLeft = "4px solid #10B981";
            const h4 = item.querySelector('h4');
            if (h4 && !h4.textContent.includes('(DISPATCHED)')) {
                h4.textContent += " (DISPATCHED)";
            }
        }
        
        // Animate map shapes
        if (alertKey === 'kolar') {
            animateWaterTable(100);
        } else if (alertKey === 'traffic') {
            const detour = document.getElementById('traffic-detour');
            if (detour) detour.style.display = 'block';
        } else if (alertKey === 'geopolitical') {
            const detour = document.getElementById('geopol-detour');
            if (detour) detour.style.display = 'block';
        }
        
        updateAlertCount();
        pushWhatsAppNotification(alertKey);
        
        // Advance wizard to policy simulator instructions
        setWizardStep('wiz_step4');
    }, 1500);
}

function animateWaterTable(targetY) {
    const waterLine = document.getElementById('water-table-line');
    const textLabel = document.getElementById('text-watertable');
    
    if (waterLine && textLabel) {
        waterLine.setAttribute('d', `M0 ${targetY} Q250 ${targetY - 10} 500 ${targetY}`);
        const depth = Math.round(28 - ((130 - targetY) * 0.2));
        textLabel.textContent = `WATER TABLE LEVEL (${depth}m Depth)`;
        textLabel.setAttribute('y', targetY + 25);
    }
}

function updateAlertCount() {
    const activeAlerts = Object.keys(alertsDataLocalized[currentLanguage]).filter(k => {
        const item = document.getElementById(`alert-${k}-item`);
        return item && !simulatedWorkflows[k];
    });
    
    const activeCount = activeAlerts.length;
    const badge = document.getElementById('active-alert-count');
    if (badge) {
        badge.textContent = `${activeCount} Active Alert${activeCount !== 1 ? 's' : ''}`;
        if (activeCount === 0) {
            badge.className = "active-badge text-green";
            badge.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
        } else {
            badge.className = "active-badge";
            badge.style.backgroundColor = "rgba(239, 68, 68, 0.12)";
        }
    }
}

// WhatsApp Profiles Database
const profilesData = {
    harish: {
        inputs: [
            { text: "🌾 Harish (Water - Tube-well Dry-out)", type: "user" },
            { audio: true, duration: "0:11", transcript: "Namma kolave bhavi purtiiyagi ಒಣಗಿಹೋಗಿದೆ. Bele neli haakuvudakke neeru illa.", textTrans: "My tube-well has completely dried out. I have no water to irrigate crops. What should I do?", type: "audio" }
        ],
        pipeline: {
            ingest: "Ingested: Well level log | 12k records",
            cudf: "cuDF cleaned: 71ms on GPU",
            spark: "Spatial Kriging: complete in 71ms",
            gemini: "Reading Kolar Aquifer manual RAG"
        },
        responses: [
            "Namaste Harish. Our GPU-accelerated spatial forecast highlights that the water table in your block has dropped to 28.4m, which is below your pump's suction limit.",
            "Pravaha recommends routing rainwater harvesting recharge to Well R-12 located 150m west of your field. Pumping draw has been limited in your block for 48 hours to allow groundwater recovery."
        ]
    },
    deepak: {
        inputs: [
            { text: "🚦 Deepak (Traffic - ORR Road Gridlock)", type: "user" },
            { audio: true, duration: "0:14", transcript: "Bhau, Outer Ring Road var khup motha traffic jam ahe, gadi hulat nahi ahe. Tomato delivery late hoil.", textTrans: "Bro, there is a huge traffic jam on Outer Ring Road, the truck isn't moving. Tomato delivery will be delayed.", type: "audio" }
        ],
        pipeline: {
            ingest: "Ingested: GPS logs | 18k records",
            cudf: "cuDF cleaned: 42ms on GPU",
            spark: "Dynamic Routing: complete in 65ms",
            gemini: "Reading Bengaluru smart routing RAG"
        },
        responses: [
            "Namaste Deepak. We have detected a 4.2km congestion zone on Outer Ring Road Silk Board corridor due to local waterlogging.",
            "Pravaha has auto-tuned the signals by 40% adaptive shifts. We have pushed a green detour routing map to your terminal bypassing the corridor via Bypass 2."
        ]
    },
    srinivas: {
        inputs: [
            { text: "🍅 Srinivas (Grocery - Rotting Tomato Supply)", type: "user" },
            { text: "Hamara tomato truck state border crossing pe 8 ghante se khada hai extreme heat me. Sadne ka risk hai.", type: "text" }
        ],
        pipeline: {
            ingest: "Ingested: IoT temp logs | 42k records",
            cudf: "cuDF parsed temp: 28ms on GPU",
            spark: "Rot decay forecast: 48ms",
            gemini: "Matching crop decay RAG thresholds"
        },
        responses: [
            "Srinivas, temperature sensors inside your cargo show 38°C. Our model predicts tomato decay risk at 82% if delayed another 4 hours.",
            "We have issued a Pravaha green transit pass to skip the border toll line. If delay exceeds 2 hours, redirect cargo to the nearest APMC cold hub in Hosur."
        ]
    },
    sunita: {
        inputs: [
            { text: "⛈️ Sunita (Weather - Cloudburst Alert)", type: "user" },
            { audio: true, duration: "0:09", transcript: "Mumbai Milan Subway ke paas pani bharna shuru ho gaya hai. Pumping stations active hai kya?", textTrans: "Water has started logging near Milan Subway, Mumbai. Are the pumping stations active?", type: "audio" }
        ],
        pipeline: {
            ingest: "Ingested: Doppler weather grid | 185k cells",
            cudf: "cuDF grid clean: 95ms",
            spark: "Cloudburst modeling: complete in 80ms",
            gemini: "Matching Mumbai Disaster Action Plan"
        },
        responses: [
            "Sunita, Doppler radar shows 120mm/hr cloudburst cell heading toward Ward 3. Milan Subway water sensor has crossed critical levels.",
            "Pravaha has dispatched mobile storm pump crews to the subway and triggered automated public warnings in Marathi to divert local traffic."
        ]
    },
    rajesh: {
        inputs: [
            { text: "🚢 Rajesh (Geopolitical - Red Sea Choke Route)", type: "user" },
            { text: "Our grain shipping vessels are approaching the Red Sea. Current security alerts show high risks. Reroute required?", type: "text" }
        ],
        pipeline: {
            ingest: "Ingested: AIS shipping grids | 320k records",
            cudf: "cuDF shipping clean: 88ms",
            spark: "Logistics delay impact: 71ms",
            gemini: "Matching Global Maritime Security RAG"
        },
        responses: [
            "Rajesh, Red Sea shipping routes through Bab-el-Mandeb are under high blockade risk. Rerouting via Cape of Good Hope adds 12 days to transit.",
            "Pravaha recommends immediate detour. Government logistics credit lines have been activated to subsidize 28% of the spiked shipping fuel costs."
        ]
    }
};

function simulateProfile(profileKey) {
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML = '';
    
    // Set wizard banner to processing
    setWizardStep('wiz_step2');
    
    // Clear pipeline states
    document.getElementById('ingest-val').textContent = 'Idle';
    document.getElementById('cudf-val').textContent = 'Idle';
    document.getElementById('spark-val').textContent = 'Idle';
    document.getElementById('gemini-val').textContent = 'Idle';
    document.querySelectorAll('.step-card').forEach(c => c.className = 'step-card');
    
    const conversation = profilesData[profileKey];
    let delay = 300;
    
    conversation.inputs.forEach((input) => {
        setTimeout(() => {
            const msgDiv = document.createElement('div');
            msgDiv.className = "wa-message outgoing";
            if (input.audio) {
                msgDiv.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid fa-microphone" style="color:var(--color-primary);"></i>
                        <div>
                            <span>Audio Note (${input.duration})</span>
                            <span class="transcript" style="display:block; font-style:italic; font-size:8px; color:var(--color-text-muted);">${input.transcript}</span>
                        </div>
                    </div>
                    <span class="time">${getCurrentTimeString()}</span>
                `;
            } else {
                msgDiv.innerHTML = `
                    <p>${input.text}</p>
                    <span class="time">${getCurrentTimeString()}</span>
                `;
            }
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, delay);
        
        delay += 900;
    });

    // Trigger pipeline steps
    setTimeout(() => {
        const pipe = conversation.pipeline;
        const ingestCard = document.getElementById('step-ingest');
        ingestCard.className = "step-card active";
        document.getElementById('ingest-val').textContent = pipe.ingest;
        
        setTimeout(() => {
            ingestCard.className = "step-card success";
            const cudfCard = document.getElementById('step-cudf');
            cudfCard.className = "step-card active";
            document.getElementById('cudf-val').textContent = pipe.cudf;
            
            setTimeout(() => {
                cudfCard.className = "step-card success";
                const sparkCard = document.getElementById('step-spark');
                sparkCard.className = "step-card active";
                document.getElementById('spark-val').textContent = pipe.spark;
                
                setTimeout(() => {
                    sparkCard.className = "step-card success";
                    const geminiCard = document.getElementById('step-gemini');
                    geminiCard.className = "step-card active";
                    document.getElementById('gemini-val').textContent = pipe.gemini;
                    
                    renderAIReplies(conversation.responses);
                    triggerPravahaAlert(profileKey);
                    
                    // Advance wizard to Step 3 (Alert Resolution)
                    setWizardStep('wiz_step3');
                }, 800);
            }, 800);
        }, 800);
    }, delay + 400);
}

function renderAIReplies(responses) {
    const chatBody = document.getElementById('chat-body');
    let replyDelay = 600;
    
    responses.forEach(reply => {
        setTimeout(() => {
            const msgDiv = document.createElement('div');
            msgDiv.className = "wa-message incoming";
            msgDiv.innerHTML = `
                <p>${reply}</p>
                <span class="time">${getCurrentTimeString()}</span>
            `;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, replyDelay);
        
        replyDelay += 1200;
    });
    
    setTimeout(() => {
        document.getElementById('step-gemini').className = "step-card success";
    }, replyDelay);
}

function triggerPravahaAlert(profileKey) {
    const alertsList = document.getElementById('alerts-list');
    
    if (profileKey === 'harish') {
        switchMainView('dashboard');
        setMapLayer('water');
        selectAlert('kolar');
    } 
    else if (profileKey === 'deepak') {
        if (!document.getElementById('alert-traffic-item')) {
            const trafficAlert = document.createElement('div');
            trafficAlert.id = "alert-traffic-item";
            trafficAlert.className = "alert-item warning";
            trafficAlert.setAttribute('onclick', "selectAlert('traffic')");
            trafficAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-traffic-light text-orange"></i></div>
                <div class="alert-details">
                    <h4>Traffic Jam: Bengaluru Outer Ring Road</h4>
                    <p>Congestion corridor Silk Board has extended by 4.2km.</p>
                    <span class="alert-meta">Source: GPS telemetry | Confidence: 94%</span>
                </div>
            `;
            alertsList.appendChild(trafficAlert);
        }
        switchMainView('dashboard');
        setMapLayer('traffic');
        selectAlert('traffic');
        updateAlertCount();
    }
    else if (profileKey === 'srinivas') {
        if (!document.getElementById('alert-grocery-item')) {
            const groceryAlert = document.createElement('div');
            groceryAlert.id = "alert-grocery-item";
            groceryAlert.className = "alert-item warning";
            groceryAlert.setAttribute('onclick', "selectAlert('grocery')");
            groceryAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-basket-shopping text-orange"></i></div>
                <div class="alert-details">
                    <h4>Tomato Logistics Spoilage: APMC Corridor</h4>
                    <p>Tomato shipment rot risk stands at 82% under extreme heat.</p>
                    <span class="alert-meta">Source: IoT temp sensors | Confidence: 89%</span>
                </div>
            `;
            alertsList.appendChild(groceryAlert);
        }
        switchMainView('dashboard');
        setMapLayer('grocery');
        selectAlert('grocery');
        updateAlertCount();
    }
    else if (profileKey === 'sunita') {
        if (!document.getElementById('alert-weather-item')) {
            const weatherAlert = document.createElement('div');
            weatherAlert.id = "alert-weather-item";
            weatherAlert.className = "alert-item danger";
            weatherAlert.setAttribute('onclick', "selectAlert('weather')");
            weatherAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-cloud-showers-heavy text-red"></i></div>
                <div class="alert-details">
                    <h4>Flash Flood Warning: Mumbai Ward 3</h4>
                    <p>Doppler forecasts cloudburst cell (120mm/hr precipitation).</p>
                    <span class="alert-meta">Source: Radar + Water sensors | Confidence: 95%</span>
                </div>
            `;
            alertsList.appendChild(weatherAlert);
        }
        switchMainView('dashboard');
        setMapLayer('weather');
        selectAlert('weather');
        updateAlertCount();
    }
    else if (profileKey === 'rajesh') {
        if (!document.getElementById('alert-geopolitical-item')) {
            const geopolAlert = document.createElement('div');
            geopolAlert.id = "alert-geopolitical-item";
            geopolAlert.className = "alert-item warning";
            geopolAlert.setAttribute('onclick', "selectAlert('geopolitical')");
            geopolAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-ship text-orange"></i></div>
                <div class="alert-details">
                    <h4>Maritime Shipping Lane Blockade: Red Sea</h4>
                    <p>Bab-el-Mandeb Strait blockaded. Bypass route detour active.</p>
                    <span class="alert-meta">Source: AIS transponders | Confidence: 99%</span>
                </div>
            `;
            alertsList.appendChild(geopolAlert);
        }
        switchMainView('dashboard');
        setMapLayer('geopolitical');
        selectAlert('geopolitical');
        updateAlertCount();
    }
}

function pushWhatsAppNotification(alertKey) {
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = "wa-message system";
    
    if (alertKey === 'kolar') {
        msgDiv.innerHTML = `<p>📢 <strong>Pravaha Broadcast:</strong> Water recharge gates activated. Pumping limitations applied.</p>`;
    } else if (alertKey === 'traffic') {
        msgDiv.innerHTML = `<p>📢 <strong>Pravaha Broadcast:</strong> Traffic signals auto-tuned. Detour route pushed to logistics trucks.</p>`;
    } else if (alertKey === 'grocery') {
        msgDiv.innerHTML = `<p>📢 <strong>Pravaha Broadcast:</strong> Tomato trucks redirected to local cold hubs. DBT subsidies disbursed.</p>`;
    } else if (alertKey === 'weather') {
        msgDiv.innerHTML = `<p>📢 <strong>Pravaha Broadcast:</strong> Storm drain pumps deployed. Commuter warnings active.</p>`;
    } else if (alertKey === 'geopolitical') {
        msgDiv.innerHTML = `<p>📢 <strong>Pravaha Broadcast:</strong> Ships rerouted via Cape of Good Hope. Fuel subsidies active.</p>`;
    }
    
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// NVIDIA Benchmark Runner
function runBenchmark(device) {
    const progressBox = document.getElementById('bench-progress-box');
    const progressBar = document.getElementById('progress-bar');
    const progressLabel = document.getElementById('bench-progress-label');
    const cpuCard = document.getElementById('cpu-bench-card');
    const gpuCard = document.getElementById('gpu-bench-card');
    const cpuBtn = document.getElementById('btn-run-cpu');
    const gpuBtn = document.getElementById('btn-run-gpu');
    
    progressBox.style.display = 'block';
    progressBar.style.width = '0%';
    cpuBtn.disabled = true;
    gpuBtn.disabled = true;
    
    if (device === 'cpu') {
        progressLabel.textContent = "Executing multi-layer spatial Kriging and route optimization on 16 vCPUs...";
        cpuCard.style.borderColor = 'var(--color-primary)';
        gpuCard.style.borderColor = 'var(--border-color)';
        
        let percent = 0;
        const interval = setInterval(() => {
            percent += 4;
            progressBar.style.width = `${percent}%`;
            if (percent >= 100) {
                clearInterval(interval);
                document.getElementById('cpu-time-val').textContent = "12.8 Sec";
                document.getElementById('cpu-time-val').className = "bench-speed-value text-red";
                cpuBtn.disabled = false;
                gpuBtn.disabled = false;
                progressBox.style.display = 'none';
                calculateSpeedup();
            }
        }, 150);
    } 
    else if (device === 'gpu') {
        progressLabel.textContent = "Offloading multi-layer network matrices to NVIDIA H100 GPU (cuDF + Spark)...";
        gpuCard.style.borderColor = 'var(--color-success)';
        cpuCard.style.borderColor = 'var(--border-color)';
        
        let percent = 0;
        const interval = setInterval(() => {
            percent += 34;
            progressBar.style.width = `${percent}%`;
            if (percent >= 100) {
                clearInterval(interval);
                document.getElementById('gpu-time-val').textContent = "71 ms";
                document.getElementById('gpu-time-val').className = "bench-speed-value text-green";
                cpuBtn.disabled = false;
                gpuBtn.disabled = false;
                progressBox.style.display = 'none';
                calculateSpeedup();
            }
        }, 100);
    }
}

function calculateSpeedup() {
    const cpuText = document.getElementById('cpu-time-val').textContent;
    const gpuText = document.getElementById('gpu-time-val').textContent;
    if (cpuText !== '--' && gpuText !== '--') {
        document.getElementById('gpu-speedup-multiplier').textContent = "180x Faster";
    }
}

// "What-If" Water & Flow Allocator Simulation
function runSimulation() {
    const pumpingVal = parseInt(document.getElementById('slide-pumping').value);
    const trafficVal = parseInt(document.getElementById('slide-traffic').value);
    const coldchainVal = parseInt(document.getElementById('slide-coldchain').value);
    const geopolVal = parseInt(document.getElementById('slide-geopol').value);
    
    document.getElementById('val-pumping').textContent = `${pumpingVal}% Draw`;
    document.getElementById('val-traffic').textContent = `${trafficVal}% Auto`;
    document.getElementById('val-coldchain').textContent = `₹${coldchainVal.toLocaleString()}/T`;
    document.getElementById('val-geopol').textContent = `${geopolVal}% Divert`;
    
    const extractionEffect = (pumpingVal - 40) * 0.8;
    const targetY = Math.round(130 + extractionEffect);
    const finalY = Math.max(90, Math.min(170, targetY));
    animateWaterTable(finalY);
    
    let sustainability = 45 - (pumpingVal * 0.2) + (trafficVal * 0.3) + (coldchainVal * 0.003) + (geopolVal * 0.25);
    sustainability = Math.min(Math.round(sustainability), 96);
    
    let deficit = 55 + (pumpingVal * 0.2) - (trafficVal * 0.35) - (coldchainVal * 0.005) - (geopolVal * 0.3);
    deficit = Math.max(Math.round(deficit), 0);
    
    const baseEnergy = 8.4;
    const trafficSaves = (trafficVal - 40) * -0.05;
    const totalEnergyCost = (baseEnergy + trafficSaves).toFixed(1);
    
    let rotVal = 95 - (coldchainVal * 0.015);
    rotVal = Math.max(Math.round(rotVal), 5);
    
    document.getElementById('gauge-sustainability').textContent = `${sustainability}%`;
    document.getElementById('gauge-deficit').textContent = `${deficit}%`;
    document.getElementById('gauge-energy').textContent = `₹${totalEnergyCost}L`;
    document.getElementById('gauge-compaction').textContent = `${rotVal}%`;
    
    const advisoryBox = document.getElementById('sim-advisory');
    if (sustainability >= 80) {
        advisoryBox.textContent = `✅ High-Efficiency Grid Configured. Pumping draw matches aquifer recovery. AI traffic signal auto-tuning (${trafficVal}%) keeps transport latency low. Cold-chain storage preserves tomato inventory, lowering rot risk to ${rotVal}%.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else if (sustainability < 45) {
        advisoryBox.textContent = `🚨 High Flow Risk Warning. Extreme pumping draw (${pumpingVal}%) combined with low cold-chain subsidies under-allocates resources. Traffic auto-tuning is insufficient, raising supply chain rot risk to ${rotVal}%.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    } else {
        advisoryBox.textContent = `💡 Balanced Flow Scenario. System is stable. Increasing cold-chain subsidies to ₹4,500/Ton will lower vegetable rot index to under 20% and offset transit delays.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.15)';
    }
}

// Slide Deck Navigation
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

// Automated Demo Walkthrough Script (Pravaha Multi-Flow Auto-Demo)
function startAutoDemo() {
    const demoBtn = document.getElementById('btn-autodemo');
    if (!demoBtn) return;
    
    demoBtn.disabled = true;
    demoBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running Demo...`;
    
    simulatedWorkflows = {};
    updateAlertCount();
    
    switchMainView('dashboard');
    setMapLayer('water');
    
    ['alert-traffic-item', 'alert-grocery-item', 'alert-weather-item', 'alert-geopolitical-item'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    
    const td = document.getElementById('traffic-detour'); if (td) td.style.display = 'none';
    const gd = document.getElementById('geopol-detour'); if (gd) gd.style.display = 'none';
    
    setTimeout(() => { simulateProfile('harish'); }, 1000);
    
    setTimeout(() => {
        selectAlert('kolar');
        dispatchWorkflow();
    }, 5500);
    
    setTimeout(() => { simulateProfile('deepak'); }, 8500);
    
    setTimeout(() => {
        selectAlert('traffic');
        dispatchWorkflow();
    }, 13000);
    
    setTimeout(() => { simulateProfile('rajesh'); }, 16000);
    
    setTimeout(() => {
        selectAlert('geopolitical');
        dispatchWorkflow();
    }, 20500);
    
    setTimeout(() => { switchMainView('slides'); }, 23500);
    
    setTimeout(() => {
        switchMainView('dashboard');
        const slideTr = document.getElementById('slide-traffic');
        const slideCc = document.getElementById('slide-coldchain');
        if (slideTr) slideTr.value = 70;
        if (slideCc) slideCc.value = 4500;
        runSimulation();
    }, 26500);
    
    setTimeout(() => {
        alert("Pravaha Walkthrough Completed!\n\nYou've witnessed the multi-layered flow optimization:\n1. Decoded Kannada farmer's well dry-out.\n2. Diverted commuter routes around Outer Ring Road in Marathi.\n3. Rerouted grain shipments around Bab-el-Mandeb Strait in English.\n4. Simulated global flow and cold-chain subsidies.\n\nExplore other layers manually!");
        demoBtn.disabled = false;
        demoBtn.innerHTML = `<i class="fa-solid fa-play"></i> Run Auto-Demo`;
    }, 29500);
}

// getCurrentTimeString helper
function getCurrentTimeString() {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// setWizardStep helper
function setWizardStep(stepKey) {
    currentWizardStep = stepKey;
    const textEl = document.getElementById('wizard-text');
    if (textEl && translations[currentLanguage] && translations[currentLanguage][stepKey]) {
        textEl.innerHTML = translations[currentLanguage][stepKey];
    }
}

// ==========================================
// USER AUTHENTICATION & SESSION TRACKING
// ==========================================

// Initialize User Profile Session on Load
document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
});

function checkUserSession() {
    const savedUser = localStorage.getItem('pravaha_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserProfile(currentUser);
    } else {
        // Show auth modal overlay
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
    
    // Save to registered users registry (indexed by phone number)
    registeredUsers[phone] = user;
    localStorage.setItem('pravaha_users', JSON.stringify(registeredUsers));
    
    // Set as active user session
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
        state: "Karnataka",
        lang: "en"
    };
    currentUser = guestUser;
    loadUserProfile(guestUser);
}

function loadUserProfile(user) {
    // Hide auth modal overlay
    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'none';
    
    // Display profile badge
    const badge = document.getElementById('user-profile-badge');
    const divider = document.getElementById('user-divider');
    const nameSpan = document.getElementById('user-display-name');
    
    if (badge && divider && nameSpan) {
        badge.style.display = 'flex';
        divider.style.display = 'block';
        
        // Show role icon
        let roleIcon = '👤';
        if (user.role === 'farmer') roleIcon = '🌾';
        else if (user.role === 'logistics') roleIcon = '🚛';
        else if (user.role === 'commissioner') roleIcon = '🏢';
        
        nameSpan.textContent = `${roleIcon} ${user.name} (${user.state})`;
    }
    
    // Auto-apply preferred language
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = user.lang;
        changeLanguage();
    }
    
    // Welcome notification in WhatsApp
    pushUserWelcomeNotification(user);
}

function showAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) authModal.style.display = 'flex';
}

function logoutUser(e) {
    if (e) e.stopPropagation();
    
    localStorage.removeItem('pravaha_current_user');
    currentUser = null;
    
    // Hide profile badge
    const badge = document.getElementById('user-profile-badge');
    const divider = document.getElementById('user-divider');
    if (badge) badge.style.display = 'none';
    if (divider) divider.style.display = 'none';
    
    // Clear chat
    const chatBody = document.getElementById('chat-body');
    if (chatBody) {
        chatBody.innerHTML = `
            <div class="wa-message system">
                <p id="lbl-chat-welcome" data-i18n="lbl_chat_welcome">🙏 Welcome to Pravaha. We coordinate Water, Traffic, Grocery, Weather, and Geopolitical routes. Select a profile below to run a simulation:</p>
            </div>
        `;
    }
    
    // Show auth modal overlay
    showAuthModal();
}

function pushUserWelcomeNotification(user) {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = "wa-message system";
    
    let roleText = 'Farmer';
    if (user.role === 'logistics') roleText = 'Logistics Driver';
    if (user.role === 'commissioner') roleText = 'Commissioner';
    
    welcomeDiv.innerHTML = `
        <p>👤 <strong>Session Active:</strong> Welcome back, <strong>${user.name}</strong> (${roleText} from ${user.state}). Localized alerts configured.</p>
    `;
    
    chatBody.appendChild(welcomeDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}
