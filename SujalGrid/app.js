// Pravaha (प्रवाह) - Core Application, Simulation & Auto-Demo Logic

// Global State
let activeTab = 'control-room';
let activeSlideIndex = 1;
const totalSlides = 10;
let activeAlert = 'kolar';
let currentMapLayer = 'water';
let simulatedWorkflows = {};

// Alerts Database
const alertsData = {
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
        impact: "18,000 Commuters & Cargo",
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
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    // Start Live Clock
    setInterval(updateClock, 1000);
    updateClock();
    
    // Select initial alert
    selectAlert('kolar');
    
    // Run initial allocation simulation
    runSimulation();
});

// Tab Switcher
function switchTab(tabId) {
    activeTab = tabId;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
        btn.getAttribute('onclick').includes(tabId)
    );
    if (activeBtn) activeBtn.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Clock logic
function updateClock() {
    const timeSpan = document.getElementById('live-time');
    const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZoneName: 'short' };
    timeSpan.textContent = new Date().toLocaleString('en-IN', options);
}

// Slide Deck Navigation
function showSlide(index) {
    if (index < 1 || index > totalSlides) return;
    
    activeSlideIndex = index;
    document.getElementById('slide-number').textContent = `Slide ${activeSlideIndex} of ${totalSlides}`;
    
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

// Set Active Map Layer
function setMapLayer(layerId) {
    currentMapLayer = layerId;
    
    // Update Map Buttons
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-layer-${layerId}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Update Layer Title
    const titles = {
        water: "Hydrology (Water) Layer",
        traffic: "Urban Traffic (Gati) Layer",
        grocery: "APMC Perishable Food (Grocery) Layer",
        weather: "Meteorology (Weather) Layer",
        geopolitical: "Sovereign Logistics (Geopolitical) Layer"
    };
    document.getElementById('current-layer-title').textContent = titles[layerId];
    
    // Hide all layers inside SVG
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
        
        const data = alertsData[alertKey];
        document.getElementById('panel-title').textContent = data.title;
        document.getElementById('panel-sla').textContent = data.sla;
        
        const premiumSpan = document.getElementById('panel-premium');
        premiumSpan.textContent = data.impact;
        premiumSpan.className = "val text-red";
        
        document.getElementById('panel-rationale').textContent = data.rationale;
        
        const actionsList = document.getElementById('panel-actions');
        actionsList.innerHTML = '';
        data.actions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            actionsList.appendChild(li);
        });
        
        // Execute button states
        const execBtn = document.querySelector('.dispatch-btn');
        if (simulatedWorkflows[alertKey]) {
            execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Workflow Dispatched & Active`;
            execBtn.style.backgroundColor = '#10B981';
            execBtn.style.color = '#FFF';
            execBtn.disabled = true;
        } else {
            execBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Approve & Execute Actions`;
            execBtn.style.backgroundColor = '#00D2FF';
            execBtn.style.color = '#000';
            execBtn.disabled = false;
        }
    }
}

// Dispatch workflow
function dispatchWorkflow() {
    const alertKey = activeAlert;
    simulatedWorkflows[alertKey] = true;
    
    const execBtn = document.querySelector('.dispatch-btn');
    execBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching Grid Controls...`;
    execBtn.disabled = true;
    
    setTimeout(() => {
        execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Workflow Dispatched & Active`;
        execBtn.style.backgroundColor = '#10B981';
        execBtn.style.color = '#FFF';
        
        // Visual updates in list
        const item = document.getElementById(`alert-${alertKey}-item`);
        if (item) {
            item.style.borderLeft = "4px solid #10B981";
            const textHeader = item.querySelector('h4');
            if (textHeader && !textHeader.textContent.includes('(DISPATCHED)')) {
                textHeader.textContent += " (DISPATCHED)";
            }
        }
        
        // Dynamic map updates based on type
        if (alertKey === 'kolar') {
            animateWaterTable(150); // Move water table up
        } 
        else if (alertKey === 'traffic') {
            const detour = document.getElementById('traffic-detour');
            if (detour) detour.style.display = 'block';
            const bottleneck = document.getElementById('traffic-bottleneck');
            if (bottleneck) {
                bottleneck.setAttribute('fill', 'rgba(16, 185, 129, 0.15)');
                bottleneck.setAttribute('stroke', '#10B981');
            }
        } 
        else if (alertKey === 'geopolitical') {
            const detour = document.getElementById('geopol-detour');
            if (detour) detour.style.display = 'block';
            const redsea = document.getElementById('geopol-redsea');
            if (redsea) redsea.setAttribute('stroke', '#10B981');
        }
        
        updateAlertCount();
        pushWhatsAppNotification(alertKey);
    }, 1500);
}

function animateWaterTable(targetY) {
    const waterLine = document.getElementById('water-table-line');
    const textLabel = document.getElementById('text-watertable');
    
    if (waterLine && textLabel) {
        waterLine.setAttribute('d', `M0 ${targetY} Q250 ${targetY - 10} 500 ${targetY}`);
        const depth = Math.round(28 - ((180 - targetY) * 0.2));
        textLabel.textContent = `WATER TABLE LEVEL (${depth}m Depth)`;
        textLabel.setAttribute('y', targetY + 30);
    }
}

function updateAlertCount() {
    const activeAlerts = Object.keys(alertsData).filter(k => {
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

// WhatsApp Simulation Database
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
    
    // Clear pipeline states
    document.getElementById('ingest-val').textContent = 'Idle';
    document.getElementById('cudf-val').textContent = 'Idle';
    document.getElementById('spark-val').textContent = 'Idle';
    document.getElementById('gemini-val').textContent = 'Idle';
    document.querySelectorAll('.step-card').forEach(c => c.className = 'step-card');
    
    const conversation = profilesData[profileKey];
    let delay = 300;
    
    // Render inputs
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

function getCurrentTimeString() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            percent += 2.5;
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
        }, 250);
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
        const speedupSpan = document.getElementById('gpu-speedup-multiplier');
        speedupSpan.textContent = "180x Faster";
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
    
    // Dynamic aquifer cross-section height calculations (Water)
    const extractionEffect = (pumpingVal - 40) * 0.8;
    const targetY = Math.round(180 + extractionEffect);
    const finalY = Math.max(140, Math.min(220, targetY));
    animateWaterTable(finalY);
    
    // Flow Efficiency Index calculations
    let sustainability = 45 - (pumpingVal * 0.2) + (trafficVal * 0.3) + (coldchainVal * 0.003) + (geopolVal * 0.25);
    sustainability = Math.min(Math.round(sustainability), 96);
    
    // Mitigated Risk Index
    let deficit = 55 + (pumpingVal * 0.2) - (trafficVal * 0.35) - (coldchainVal * 0.005) - (geopolVal * 0.3);
    deficit = Math.max(Math.round(deficit), 0);
    
    // Pumping & Transit Energy Cost (₹ Lakhs)
    const baseEnergy = 8.4;
    const trafficSaves = (trafficVal - 40) * -0.05;
    const totalEnergyCost = (baseEnergy + trafficSaves).toFixed(1);
    
    // Supply Chain Rot Index
    let rotVal = 95 - (coldchainVal * 0.015);
    rotVal = Math.max(Math.round(rotVal), 5);
    let riskStr = "Moderate";
    let riskClass = "gauge-value text-orange";
    if (rotVal > 60) {
        riskStr = "Critical";
        riskClass = "gauge-value text-red";
    } else if (rotVal < 25) {
        riskStr = "Low";
        riskClass = "gauge-value text-green";
    }
    
    // Update Gauges
    const sustDiv = document.getElementById('gauge-sustainability');
    sustDiv.textContent = `${sustainability}%`;
    sustDiv.className = `gauge-value ${sustainability > 75 ? 'text-green' : sustainability > 50 ? 'text-orange' : 'text-red'}`;
    
    const defDiv = document.getElementById('gauge-deficit');
    defDiv.textContent = `${deficit}%`;
    defDiv.className = `gauge-value ${deficit > 15 ? 'text-red' : deficit > 5 ? 'text-orange' : 'text-green'}`;
    
    const energyDiv = document.getElementById('gauge-energy');
    energyDiv.textContent = `₹${totalEnergyCost}L`;
    energyDiv.className = `gauge-value ${totalEnergyCost > 11 ? 'text-red' : totalEnergyCost > 7 ? 'text-orange' : 'text-green'}`;
    
    const compDiv = document.getElementById('gauge-compaction');
    compDiv.textContent = `${rotVal}% (${riskStr})`;
    compDiv.className = riskClass;
    
    // Advisory updates
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

// Persona Selector (Onboarding)
function selectPersona(role) {
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
    
    if (role === 'farmer') {
        setTimeout(() => {
            simulateProfile('harish');
        }, 500);
    } else if (role === 'commissioner') {
        switchTab('control-room');
        selectAlert('kolar');
    }
}

// Automated Demo Walkthrough Script (प्रवाह Multi-Flow Auto-Demo)
function startAutoDemo() {
    const demoBtn = document.querySelector('.demo-play-btn');
    if (!demoBtn) return;
    
    demoBtn.disabled = true;
    demoBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running Demo...`;
    
    // Reset simulated states
    simulatedWorkflows = {};
    updateAlertCount();
    
    // Step 1: Switch to Control Room & select Hydrology
    switchTab('control-room');
    setMapLayer('water');
    
    // Remove temporary alerts if present
    ['alert-traffic-item', 'alert-grocery-item', 'alert-weather-item', 'alert-geopolitical-item'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
    
    // Reset detour lines inside SVG
    const td = document.getElementById('traffic-detour'); if (td) td.style.display = 'none';
    const gd = document.getElementById('geopol-detour'); if (gd) gd.style.display = 'none';
    
    // Step 2: Simulate Harish (Water Flow Ingress)
    setTimeout(() => {
        simulateProfile('harish');
    }, 1000);
    
    // Step 3: Approve Kolar recharge actions
    setTimeout(() => {
        selectAlert('kolar');
        dispatchWorkflow();
    }, 5500);
    
    // Step 4: Simulate Deepak (Traffic Corridor Gridlock Ingress)
    setTimeout(() => {
        simulateProfile('deepak');
    }, 8500);
    
    // Step 5: Approve traffic rerouting actions
    setTimeout(() => {
        selectAlert('traffic');
        dispatchWorkflow();
    }, 13000);
    
    // Step 6: Simulate Rajesh (Geopolitical Ship Lane Blockade)
    setTimeout(() => {
        simulateProfile('rajesh');
    }, 16000);
    
    // Step 7: Approve geopolitical route detour actions
    setTimeout(() => {
        selectAlert('geopolitical');
        dispatchWorkflow();
    }, 20500);
    
    // Step 8: Switch to Simulator Tab and slide optimization sliders
    setTimeout(() => {
        switchTab('simulator');
    }, 23500);
    
    setTimeout(() => {
        document.getElementById('slide-traffic').value = 70;
        document.getElementById('slide-coldchain').value = 4500;
        document.getElementById('slide-geopol').value = 60;
        runSimulation();
    }, 24500);
    
    // Step 9: Demo Complete
    setTimeout(() => {
        alert("Pravaha (प्रवाह) Walkthrough Completed!\n\nYou've witnessed the multi-layered flow optimization:\n1. Decoded Kannada farmer's well dry-out.\n2. Diverted commuter routes around Outer Ring Road in Marathi.\n3. Rerouted grain shipments around Bab-el-Mandeb Strait in English.\n4. Simulated global flow and cold-chain subsidies.\n\nExplore other layers manually!");
        
        demoBtn.disabled = false;
        demoBtn.innerHTML = `<i class="fa-solid fa-play"></i> Run Auto-Demo`;
    }, 28000);
}
