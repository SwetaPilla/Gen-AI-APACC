// JanAI - Application Logic and Interactive Simulation Engine

// Global State
let activeTab = 'control-room';
let activeSlideIndex = 1;
const totalSlides = 10;
let activeAlert = 'water';
let simulatedWorkflows = {};

// Alert Database
const alertsData = {
    water: {
        title: "Groundwater Stress: Nelamangala",
        impact: "12,000 Citizens",
        sla: "72 Hours",
        rationale: "Water demand in Nelamangala Ward 3 is forecasted to exceed supply capacity by 18% within 72 hours due to aquifer depletion of 4.2m below seasonal baseline. High density of local tube-wells detected.",
        actions: [
            "Deploy 10 municipal water tankers from Bengaluru central reserve.",
            "Reduce industrial water allocation in zone B by 12% temporarily.",
            "Alert local residential housing managers via automated WhatsApp notifications."
        ],
        coordinates: { x: 120, y: 100 }
    },
    flood: {
        title: "Flash Flood Warning: Mumbai Ward 3",
        impact: "45,000 Citizens",
        sla: "2 Hours",
        rationale: "Rainfall telemetry reports 95mm in past 90 minutes. High tide overlap at 12:15 PM will cause backflow. Drain blockage sensor in Ward 3 active (94% blockage).",
        actions: [
            "Open drainage bypass gates on East Road immediately.",
            "Activate emergency siren array in Low-lying Wards.",
            "Send target cell-broadcast evacuation alerts to 4,200 active devices in Zone C.",
            "Divert bus lines 44, 18, and 23 away from central underpasses."
        ],
        coordinates: { x: 280, y: 180 }
    },
    smoke: {
        title: "Stubble Smog Plume: Northern Corridor",
        impact: "1.2 Million Citizens",
        sla: "18 Hours",
        rationale: "Satellite detection logs 142 stubble burning fires in Punjab/Haryana border. Wind velocity moving 12km/h southeast. Expect Delhi AQI spike to 420+ by tomorrow morning.",
        actions: [
            "Dispatch 12 municipal dust-suppression mist sprayers.",
            "Initiate odd-even traffic restriction pre-alerts in Delhi-NCR.",
            "Issue advisories to municipal primary schools to move classes online.",
            "Authorize immediate direct transfer of ₹2,500 stubble residue disposal subsidies to validated farm owners."
        ],
        coordinates: { x: 360, y: 65 }
    }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    // Start Live Clock
    setInterval(updateClock, 1000);
    updateClock();
    
    // Select initial alert
    selectAlert('water');
    
    // Run initial simulator calculations
    runSimulation();
});

// Tab Switcher
function switchTab(tabId) {
    activeTab = tabId;
    
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
        btn.getAttribute('onclick').includes(tabId)
    );
    if (activeBtn) activeBtn.classList.add('active');
    
    // Update content blocks
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Clock logic
function updateClock() {
    const timeSpan = document.getElementById('live-time');
    const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZoneName: 'short' };
    const dateStr = new Date().toLocaleString('en-IN', options);
    timeSpan.textContent = dateStr;
}

// Slide Deck Navigation
function showSlide(index) {
    if (index < 1 || index > totalSlides) return;
    
    // Update slide index
    activeSlideIndex = index;
    document.getElementById('slide-number').textContent = `Slide ${activeSlideIndex} of ${totalSlides}`;
    
    // Animate active/exit classes
    const slides = document.querySelectorAll('.slide-card');
    slides.forEach((slide, idx) => {
        const slideNum = idx + 1;
        slide.classList.remove('active', 'exit');
        
        if (slideNum === activeSlideIndex) {
            slide.classList.add('active');
        } else if (slideNum < activeSlideIndex) {
            slide.classList.add('exit');
        }
    });
}

function prevSlide() {
    if (activeSlideIndex > 1) showSlide(activeSlideIndex - 1);
}

function nextSlide() {
    if (activeSlideIndex < totalSlides) showSlide(activeSlideIndex + 1);
}

// Select Operational Alert
function selectAlert(alertKey) {
    activeAlert = alertKey;
    
    // Highlight item
    document.querySelectorAll('.alert-item').forEach(item => {
        item.classList.remove('active-select');
    });
    const selectedItem = document.getElementById(`alert-${alertKey}-item`);
    if (selectedItem) selectedItem.classList.add('active-select');
    
    // Load detail panel
    const placeholder = document.querySelector('.panel-placeholder');
    const panelData = document.getElementById('panel-data');
    
    if (placeholder && panelData) {
        placeholder.style.display = 'none';
        panelData.style.display = 'block';
        
        const data = alertsData[alertKey];
        document.getElementById('panel-title').textContent = data.title;
        document.getElementById('panel-impact').textContent = data.impact;
        
        const slaSpan = document.querySelector('.sub-metric .text-orange');
        slaSpan.textContent = data.sla;
        if (data.sla === "2 Hours") {
            slaSpan.className = "val text-red";
        } else {
            slaSpan.className = "val text-orange";
        }
        
        document.getElementById('panel-rationale').textContent = data.rationale;
        
        const actionsList = document.getElementById('panel-actions');
        actionsList.innerHTML = '';
        data.actions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            actionsList.appendChild(li);
        });
        
        // Update execute button state
        const execBtn = document.querySelector('.dispatch-btn');
        if (simulatedWorkflows[alertKey]) {
            execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Executed & Completed`;
            execBtn.style.backgroundColor = '#10B981';
            execBtn.style.color = '#FFF';
            execBtn.disabled = true;
        } else {
            execBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Approve & Execute Actions`;
            execBtn.style.backgroundColor = '#00BFFF';
            execBtn.style.color = '#000';
            execBtn.disabled = false;
        }
    }
}

// Dispatch automated workflow
function dispatchWorkflow() {
    const alertKey = activeAlert;
    simulatedWorkflows[alertKey] = true;
    
    // Visual alert feedback
    const execBtn = document.querySelector('.dispatch-btn');
    execBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Triggering Cloud Workflows...`;
    execBtn.disabled = true;
    
    setTimeout(() => {
        execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Executed & Completed`;
        execBtn.style.backgroundColor = '#10B981';
        execBtn.style.color = '#FFF';
        
        // Remove item highlight or change styling in list
        const item = document.getElementById(`alert-${alertKey}-item`);
        if (item) {
            item.style.borderLeft = "4px solid #10B981";
            item.querySelector('h4').textContent += " (RESOLVED)";
        }
        
        // If flood, hide risk zone from map or change its color
        if (alertKey === 'flood') {
            const mapZone = document.getElementById('zone-flood');
            if (mapZone) {
                mapZone.setAttribute('fill', 'rgba(16, 185, 129, 0.15)');
                mapZone.setAttribute('stroke', '#10B981');
                mapZone.classList.remove('pulse-warning');
            }
        } else if (alertKey === 'water') {
            const mapZone = document.getElementById('zone-water');
            if (mapZone) {
                mapZone.setAttribute('fill', 'rgba(16, 185, 129, 0.15)');
                mapZone.setAttribute('stroke', '#10B981');
            }
        } else if (alertKey === 'smoke') {
            const mapZone = document.getElementById('zone-smoke');
            if (mapZone) {
                mapZone.setAttribute('fill', 'rgba(16, 185, 129, 0.1)');
                mapZone.setAttribute('stroke', '#10B981');
            }
        }
        
        // Update alert count
        updateAlertCount();
        
        // Push notification in WhatsApp simulator
        pushWhatsAppNotification(alertKey);
    }, 1500);
}

function updateAlertCount() {
    const totalCount = 3 - Object.keys(simulatedWorkflows).length;
    const countBadge = document.getElementById('active-alert-count');
    if (countBadge) {
        countBadge.textContent = `${totalCount} Active Alert${totalCount !== 1 ? 's' : ''}`;
        if (totalCount === 0) {
            countBadge.className = "active-badge text-green";
            countBadge.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
            countBadge.style.border = "1px solid rgba(16, 185, 129, 0.25)";
        }
    }
}

// WhatsApp Simulation Engine
const conversations = {
    ramesh: {
        inputs: [
            { text: "🌾 Ramesh (Bihar - Crop Blight)", type: "user" },
            { audio: true, duration: "0:12", transcript: "Humre dhaan ke patti me chota-chota peela kida lag gail ba. Pura patti sukh raha hai. Ka karein?", textTrans: "Yellow spots are appearing on my paddy leaves. The whole leaf is drying up. What should I do?", type: "audio" }
        ],
        pipeline: {
            stt: "Transcribed: Bhojupri (Mixed)",
            trans: "To English: 'Yellow spots on paddy leaves. Leaves drying. Action?'",
            rag: "Matching: 'Bihar Rice Pest Management Manual 2025'",
            gemini: "Bacterial Leaf Blight diagnostic model"
        },
        responses: [
            "Ramesh ji, aapke dhaan ki fasal me 'Bacterial Leaf Blight' (peela kida bimari) ke lakshan hain. Isse bachav ke liye, turant 25 gram Agrimycin aur 500 gram Copper Oxychloride ko 200 liter paani me mila kar chidkav karein.",
            "Your ticket #AGRI-8422 has been sent to District Agriculture Officer, Buxar. A technician has been dispatched."
        ]
    },
    priya: {
        inputs: [
            { text: "💧 Priya (Bengaluru - Muddy Water)", type: "user" },
            { audio: true, duration: "0:08", transcript: "Nelamangala Ward 3 nalli drinking water muddy bartha idhe. Tanker dispatch madi please.", textTrans: "Nelamangala Ward 3 drinking water is muddy. Please dispatch a water tanker.", type: "audio" }
        ],
        pipeline: {
            stt: "Transcribed: Kannada",
            trans: "To English: 'Nelamangala Ward 3 drinking water muddy. Send tanker.'",
            rag: "Matching: 'Bengaluru Water Supply Operations Manual Page 42'",
            gemini: "Triggering Tanker Logistics Pipeline API"
        },
        responses: [
            "Namaste Priya, your complaint about muddy water has been logged under Ticket #WAT-9482. An investigation shows road widening works damaged the main pipeline on NH-75.",
            "Water supply will be restored in 18 hours. JanAI is deploying 10 water tankers to Ward 3 immediately to supply clean drinking water."
        ]
    },
    sunil: {
        inputs: [
            { text: "🌧️ Sunil (Mumbai - Flood Route)", type: "user" },
            { text: "Low-lying underpass at Milan Subway is flooded. Can I take Route 3 to Bandra?", type: "text" }
        ],
        pipeline: {
            stt: "Plain Text: English",
            trans: "No Translation needed",
            rag: "Matching: 'Mumbai Traffic Diversion Matrix'",
            gemini: "Checking live underpass sensor feeds"
        },
        responses: [
            "Sunil, Milan Subway reports 1.4m water levels (DANGER). Route 3 (Bandra bypass) is clear but moving slow (12 km/h).",
            "Recommended alternative: Take Santacruz flyover corridor. Commute time: 14 mins. Real-time updates pushed to Google Maps."
        ]
    },
    harpreet: {
        inputs: [
            { text: "🚜 Harpreet (Punjab - Smog/Stubble)", type: "user" },
            { audio: true, duration: "0:15", transcript: "Assi khet di stubble nistaran layee subsidy da apply kita c, par aje tak aayi nahi.", textTrans: "We applied for stubble residue clearance subsidy but haven't received it yet.", type: "audio" }
        ],
        pipeline: {
            stt: "Transcribed: Punjabi",
            trans: "To English: 'Applied for stubble management subsidy, not received yet.'",
            rag: "Matching: 'Direct Benefit Transfer (DBT) Scheme, Punjab Agriculture Department'",
            gemini: "Validating Aadhaar & DBT record portal"
        },
        responses: [
            "Sat Sri Akal Harpreet ji. Your application for stubble residue management has been matched with Aadhaar KYC verified land registry.",
            "Your subsidy of ₹2,500 per acre (Total: ₹12,500) has been approved and cleared via Aadhaar-Enabled Payment System. Funds will reflect in your account within 4 hours."
        ]
    }
};

function simulateCitizen(profileKey) {
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML = ''; // Clear chat
    
    // Clear Pipeline Cards
    document.getElementById('stt-val').textContent = 'Idle';
    document.getElementById('trans-val').textContent = 'Idle';
    document.getElementById('rag-val').textContent = 'Idle';
    document.getElementById('gemini-val').textContent = 'Idle';
    document.querySelectorAll('.step-card').forEach(c => c.className = 'step-card');
    
    const conversation = conversations[profileKey];
    
    // Step 1: Render User Messages
    let delay = 300;
    conversation.inputs.forEach((input, index) => {
        setTimeout(() => {
            const msgDiv = document.createElement('div');
            msgDiv.className = "wa-message outgoing";
            
            if (input.audio) {
                msgDiv.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i class="fa-solid fa-microphone" style="color:var(--color-primary);"></i>
                        <div>
                            <span>Audio Note (${input.duration})</span>
                            <span class="transcript" style="display:block; font-style:italic; font-size:9px; color:var(--color-text-muted);">${input.transcript}</span>
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

    // Step 2: Trigger Pipeline Visualization & Response
    setTimeout(() => {
        const pipe = conversation.pipeline;
        
        // Chirp STT Activation
        const sttCard = document.getElementById('step-stt');
        sttCard.className = "step-card active";
        document.getElementById('stt-val').textContent = pipe.stt;
        
        setTimeout(() => {
            sttCard.className = "step-card success";
            const transCard = document.getElementById('step-trans');
            transCard.className = "step-card active";
            document.getElementById('trans-val').textContent = pipe.trans;
            
            setTimeout(() => {
                transCard.className = "step-card success";
                const ragCard = document.getElementById('step-rag');
                ragCard.className = "step-card active";
                document.getElementById('rag-val').textContent = pipe.rag;
                
                setTimeout(() => {
                    ragCard.className = "step-card success";
                    const geminiCard = document.getElementById('step-gemini');
                    geminiCard.className = "step-card active";
                    document.getElementById('gemini-val').textContent = pipe.gemini;
                    
                    // Render AI Responses
                    renderAIReplies(conversation.responses);
                    
                    // Trigger map changes/alert queue insertions dynamically based on profile
                    triggerCivicAlert(profileKey);
                    
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
    
    // Complete pipeline
    setTimeout(() => {
        document.getElementById('step-gemini').className = "step-card success";
    }, replyDelay);
}

function triggerCivicAlert(profileKey) {
    // Add alert to dashboard queues if they don't already exist
    const alertsList = document.getElementById('alerts-list');
    
    if (profileKey === 'priya') {
        // Highlight Nelamangala
        switchTab('control-room');
        selectAlert('water');
    } 
    else if (profileKey === 'sunil') {
        // Add flood warning
        if (!document.getElementById('alert-flood-item')) {
            const floodAlert = document.createElement('div');
            floodAlert.id = "alert-flood-item";
            floodAlert.className = "alert-item danger";
            floodAlert.setAttribute('onclick', "selectAlert('flood')");
            floodAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-cloud-showers-heavy"></i></div>
                <div class="alert-details">
                    <h4>Flash Flood Warning: Mumbai Ward 3</h4>
                    <p>Subway water levels at 1.4m. Severe underpass flooding.</p>
                    <span class="alert-meta">Source: Hydrology Sensor | Confidence: 91%</span>
                </div>
            `;
            alertsList.appendChild(floodAlert);
            
            // Show flood on SVG map
            document.getElementById('zone-flood').style.display = 'block';
            document.getElementById('sensor-flood').style.display = 'block';
            document.getElementById('text-flood').style.display = 'block';
        }
        
        switchTab('control-room');
        selectAlert('flood');
        updateAlertCount();
    }
    else if (profileKey === 'harpreet') {
        // Add smoke warning
        if (!document.getElementById('alert-smoke-item')) {
            const smokeAlert = document.createElement('div');
            smokeAlert.id = "alert-smoke-item";
            smokeAlert.className = "alert-item warning";
            smokeAlert.setAttribute('onclick', "selectAlert('smoke')");
            smokeAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-wind"></i></div>
                <div class="alert-details">
                    <h4>Stubble Smog Plume: Northern Corridor</h4>
                    <p>Plume moving southeast. Anticipating major AQI spike.</p>
                    <span class="alert-meta">Source: Sat Plume imagery | Confidence: 94%</span>
                </div>
            `;
            alertsList.appendChild(smokeAlert);
            
            // Show smoke on SVG map
            document.getElementById('zone-smoke').style.display = 'block';
            document.getElementById('sensor-smoke').style.display = 'block';
            document.getElementById('text-smoke').style.display = 'block';
        }
        
        switchTab('control-room');
        selectAlert('smoke');
        updateAlertCount();
    }
}

function pushWhatsAppNotification(alertKey) {
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = "wa-message system";
    
    if (alertKey === 'water') {
        msgDiv.innerHTML = `<p>📢 <strong>JanAI System Broadcast:</strong> Work order approved. 10 water tankers deployed to Nelamangala Ward 3. SMS alerts sent to residents.</p>`;
    } else if (alertKey === 'flood') {
        msgDiv.innerHTML = `<p>📢 <strong>JanAI System Broadcast:</strong> Emergency siren activated in Milan Subway, Mumbai. Traffic re-routing maps pushed to police dispatch.</p>`;
    } else if (alertKey === 'smoke') {
        msgDiv.innerHTML = `<p>📢 <strong>JanAI System Broadcast:</strong> Stubble burning subsidies cleared. ₹12,500 transferred to farmers. Mist sprinkler tankers dispatched.</p>`;
    }
    
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getCurrentTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// "What-If" Simulator Algorithms
function runSimulation() {
    // Read sliders
    const tankersVal = parseInt(document.getElementById('slide-tankers').value);
    const subsidyVal = parseInt(document.getElementById('slide-subsidy').value);
    const transitVal = parseInt(document.getElementById('slide-transit').value);
    const coolingVal = parseInt(document.getElementById('slide-cooling').value);
    
    // Update labels on screen
    document.getElementById('val-tankers').textContent = `${tankersVal} Tanks`;
    document.getElementById('val-subsidy').textContent = `₹${subsidyVal.toLocaleString('en-IN')}`;
    document.getElementById('val-transit').textContent = `${transitVal}%`;
    document.getElementById('val-cooling').textContent = `${coolingVal} Beds`;
    
    // MATHEMATICAL SIMULATOR
    
    // Sentiment calculation
    // Subsidies, tankers, cooling centers make citizens happy. Heavy transit restrictions can lower it slightly if too extreme.
    let sentiment = 55 + (tankersVal * 0.4) + ((subsidyVal - 1000) * 0.003) + (coolingVal * 0.015) - (transitVal * 0.1);
    sentiment = Math.min(Math.round(sentiment), 98);
    
    // Mitigated Risk %
    // Stubble burning subsidy, high tankers pool, cooling capacity, and traffic diversion mitigate corresponding risks.
    let riskMit = 30 + (tankersVal * 0.5) + ((subsidyVal - 1000) * 0.005) + (transitVal * 0.3) + (coolingVal * 0.02);
    riskMit = Math.min(Math.round(riskMit), 96);
    
    // Response Latency
    // More tankers, higher transit diversion = faster responses.
    let latency = 65 - (tankersVal * 0.4) - (transitVal * 0.25);
    latency = Math.max(Math.round(latency), 12);
    
    // Budget Impact
    // Calculates total cost in Lakhs
    const tankerCost = tankersVal * 0.25; // 0.25L per tanker
    const subsidyCost = (subsidyVal * 0.003) * 1.5; // Multiplier
    const coolingCost = coolingVal * 0.015; // 0.015L per bed
    const totalCost = (tankerCost + subsidyCost + coolingCost).toFixed(1);
    
    // Update dashboard gauges
    const sentDiv = document.getElementById('gauge-sentiment');
    sentDiv.textContent = `${sentiment}%`;
    sentDiv.className = `gauge-value ${sentiment > 80 ? 'text-green' : sentiment > 65 ? '' : 'text-red'}`;
    
    const riskDiv = document.getElementById('gauge-risk');
    riskDiv.textContent = `${riskMit}%`;
    riskDiv.className = `gauge-value ${riskMit > 75 ? 'text-green' : riskMit > 50 ? 'text-orange' : 'text-red'}`;
    
    const latencyDiv = document.getElementById('gauge-latency');
    latencyDiv.textContent = `${latency} Min`;
    latencyDiv.className = `gauge-value ${latency < 25 ? 'text-green' : latency < 45 ? '' : 'text-red'}`;
    
    const budgetDiv = document.getElementById('gauge-budget');
    budgetDiv.textContent = `₹${totalCost}L`;
    budgetDiv.className = `gauge-value ${totalCost > 25 ? 'text-red' : totalCost > 15 ? 'text-orange' : 'text-green'}`;
    
    // Causal AI Advisory Generator
    const advisoryBox = document.getElementById('sim-advisory');
    
    if (subsidyVal >= 4500 && tankersVal >= 25) {
        advisoryBox.textContent = `🚨 High-efficiency scenario. Stubble burning subsidies of ₹${subsidyVal.toLocaleString()} will drop Northern smog risk by 28%. Combined with ${tankersVal} tankers, Nelamangala is secured from dry-out. Budget impact is High (₹${totalCost}L), requiring allocation adjustments from smart-city administrative reserves.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else if (subsidyVal < 2000 && tankersVal < 10) {
        advisoryBox.textContent = `⚠️ Critical risk detected. Underfunded subsidies (₹${subsidyVal.toLocaleString()}) fail to deter stubble burning. Coupled with low tanker pools, aquifer depletion in Nelamangala is highly likely to cause severe local water stress. CSAT is dropping to ${sentiment}%.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    } else {
        advisoryBox.textContent = `💡 Balanced Scenario. Stubble subsidies are moderate. Decommissioning 5 water tankers will save ₹1.2L but will increase water delivery latency in outer rural wards by 8 minutes. Policy mitigation profile is currently stable at ${riskMit}%.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.15)';
    }
}

// Automated Demo Walkthrough Script
function startAutoDemo() {
    const demoBtn = document.querySelector('.demo-play-btn');
    if (!demoBtn) return;
    
    // Disable button and show running state
    demoBtn.disabled = true;
    demoBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running Demo...`;
    
    // Step 1: Switch to Control Room
    switchTab('control-room');
    
    // Reset alert resolution states
    simulatedWorkflows = {};
    updateAlertCount();
    
    // Remove previous flood alert if present
    const prevFlood = document.getElementById('alert-flood-item');
    if (prevFlood) prevFlood.remove();
    
    // Reset map flood element
    const mapZone = document.getElementById('zone-flood');
    if (mapZone) {
        mapZone.style.display = 'none';
        mapZone.setAttribute('fill', 'rgba(229, 62, 62, 0.25)');
        mapZone.setAttribute('stroke', '#E53E3E');
        mapZone.classList.add('pulse-warning');
    }
    
    // Step 2: Simulate Mumbai Commuter (Sunil) Voice Input
    setTimeout(() => {
        simulateCitizen('sunil');
    }, 1000);
    
    // Step 3: Select Mumbai Flood Alert (after STT/Translation/Gemini completes)
    setTimeout(() => {
        selectAlert('flood');
    }, 5500);
    
    // Step 4: Click Approve & Execute Actions
    setTimeout(() => {
        dispatchWorkflow();
    }, 8500);
    
    // Step 5: Switch to Simulator Tab
    setTimeout(() => {
        switchTab('simulator');
    }, 11500);
    
    // Step 6: Adjust Sliders to optimize transit and cooling capacity
    setTimeout(() => {
        document.getElementById('slide-transit').value = 60;
        document.getElementById('slide-cooling').value = 600;
        runSimulation();
    }, 12500);
    
    // Step 7: Completed popup
    setTimeout(() => {
        alert("JanAI Deployed Demo Walkthrough Completed!\n\nYou've witnessed the Mumbai Cloudburst scenario:\n1. Citizen voice query decoded from Marathi.\n2. Inundation alarm triggered in Ward 3.\n3. Dynamic traffic diversions approved and dispatched.\n4. Policy impact metrics re-calculated in real-time.\n\nFeel free to explore the features manually!");
        
        // Restore button state
        demoBtn.disabled = false;
        demoBtn.innerHTML = `<i class="fa-solid fa-play"></i> Run Auto-Demo`;
    }, 15000);
}
