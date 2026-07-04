// Sujal-Grid - Core Application and Simulation Logic

// Global State
let activeTab = 'control-room';
let activeSlideIndex = 1;
const totalSlides = 10;
let activeAlert = 'kolar';
let simulatedWorkflows = {};
let currentWaterTableY = 180; // Represents 28m depth in SVG coords

// Alerts Database
const alertsData = {
    kolar: {
        title: "Aquifer Depletion: Kolar Karnataka",
        impact: "8,500 Farmers",
        sla: "48 Hours",
        rationale: "Groundwater levels in Kolar have depleted below critical clay threshold (28m). Model forecasts 85% probability of permanent aquifer compaction and soil collapse unless draw-off is immediately restricted by 20%. Pumping energy demands have spiked by 42%.",
        actions: [
            "Initiate artificial recharge wells using localized monsoon stormwater runoff.",
            "Enforce a 20% agricultural tube-well draw-off limit during daytime peak solar hours.",
            "Broadcast localized voice recommendations to 1,200 local farmers on WhatsApp."
        ],
        coordinates: { x: 150, y: 240 }
    },
    fresno: {
        title: "Groundwater Table Drop: Fresno California",
        impact: "220 Industrial Farms",
        sla: "72 Hours",
        rationale: "Satellite data highlights Central Valley sub-basin drop of 5.8m below seasonal average. Water salinity indexes have spiked by 14%, threatening almond crops.",
        actions: [
            "Implement cyclic groundwater pumping bans across Fresno West corridors.",
            "Redirect 2,500 acre-feet of state canal surplus to gravity-fed percolation basins.",
            "Alert district agricultural agents to enforce sub-basin draw limits."
        ],
        coordinates: { x: 380, y: 260 }
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
        document.getElementById('panel-impact').textContent = data.impact;
        document.getElementById('panel-sla').textContent = data.sla;
        
        const premiumSpan = document.getElementById('panel-premium');
        if (alertKey === 'kolar') {
            premiumSpan.textContent = "+42% Energy";
            premiumSpan.className = "val text-red";
        } else {
            premiumSpan.textContent = "+14% Salinity";
            premiumSpan.className = "val text-orange";
        }
        
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
            execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Workflow Active & Recharging`;
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
    execBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Initializing Aquifer Recharge...`;
    execBtn.disabled = true;
    
    setTimeout(() => {
        execBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Workflow Active & Recharging`;
        execBtn.style.backgroundColor = '#10B981';
        execBtn.style.color = '#FFF';
        
        // Visual updates in list
        const item = document.getElementById(`alert-${alertKey}-item`);
        if (item) {
            item.style.borderLeft = "4px solid #10B981";
            item.querySelector('h4').textContent += " (RECHARGING)";
        }
        
        // Animate water table level rising in SVG
        animateWaterTable(150); // Move water table up to 22m (Y = 150)
        
        updateAlertCount();
        pushWhatsAppNotification(alertKey);
    }, 1500);
}

function animateWaterTable(targetY) {
    const waterLine = document.getElementById('water-table-line');
    const textLabel = document.getElementById('text-watertable');
    
    if (waterLine && textLabel) {
        // Change the SVG path definition
        waterLine.setAttribute('d', `M0 ${targetY} Q250 ${targetY - 10} 500 ${targetY}`);
        
        // Calculate new depth representation (180 corresponds to 28m, 150 corresponds to 22m)
        const depth = Math.round(28 - ((180 - targetY) * 0.2));
        textLabel.textContent = `WATER TABLE LEVEL (${depth}m Depth)`;
        textLabel.setAttribute('y', targetY + 30);
    }
}

function updateAlertCount() {
    const activeCount = Object.keys(alertsData).length - Object.keys(simulatedWorkflows).length;
    const badge = document.getElementById('active-alert-count');
    if (badge) {
        badge.textContent = `${activeCount} Active Alert${activeCount !== 1 ? 's' : ''}`;
        if (activeCount === 0) {
            badge.className = "active-badge text-green";
            badge.style.backgroundColor = "rgba(16, 185, 129, 0.12)";
            badge.style.border = "1px solid rgba(16, 185, 129, 0.25)";
        }
    }
}

// WhatsApp Simulation
const conversations = {
    harish: {
        inputs: [
            { text: "🇮🇳 Harish (Karnataka - Tube-well Dry-out)", type: "user" },
            { audio: true, duration: "0:11", transcript: "Namma kolave bhavi purtiiyagi ಒಣಗಿಹೋಗಿದೆ. Bele neli haakuvudakke neeru illa. Enu madli?", textTrans: "My tube-well has completely dried out. I have no water to irrigate crops. What should I do?", type: "audio" }
        ],
        pipeline: {
            ingest: "Ingested: Well level log | 12k records",
            cudf: "cuDF cleaned: 71ms on GPU",
            spark: "Spatial Kriging: complete in 71ms",
            gemini: "Reading Kolar Aquifer manual RAG"
        },
        responses: [
            "Namaste Harish. Our GPU-accelerated spatial forecast highlights that the water table in your block has dropped to 28.4m, which is below your pump's suction limit.",
            "Sujal-Grid recommends routing rainwater harvesting recharge to Well R-12 located 150m west of your field. Pumping draw has been limited in your block for 48 hours to allow groundwater recovery."
        ]
    },
    john: {
        inputs: [
            { text: "🇺🇸 John (California - Aquifer Depletion)", type: "user" },
            { text: "My smart meter logs show aquifer drawdown rates increased by 25% this week in Fresno. Is there a salinity risk?", type: "text" }
        ],
        pipeline: {
            ingest: "Ingested: Smart well log | 82k records",
            cudf: "cuDF cleaned: 85ms on GPU",
            spark: "Spatial Interpolation: complete in 71ms",
            gemini: "Reading Central Valley Salinity thresholds"
        },
        responses: [
            "John, the GPU-Spark models indicate a localized drawdown zone forming in Fresno West. Salinity index is currently at 1.8 dS/m (14% above almond thresholds).",
            "Recommended: Restrict daily pumping to 4 hours between 10 PM and 2 AM. JanAI has requested state canal surplus diversion to your local aquifer recharge basin."
        ]
    },
    kavitha: {
        inputs: [
            { text: "💧 Kavitha (Chennai - Rainwater Harvesting)", type: "user" },
            { audio: true, duration: "0:09", transcript: "Ennoda rainwater harvesting structure-la recharge flow path block aayiduchu.", textTrans: "The recharge flow path inside my rainwater harvesting structure is blocked.", type: "audio" }
        ],
        pipeline: {
            ingest: "Ingested: Citizen image log",
            cudf: "cuDF parsed metadata: 25ms",
            spark: "Grid mapping: active",
            gemini: "Matching Chennai rainwater codes"
        },
        responses: [
            "Kavitha, we have registered your report. The system has automatically logged Ticket #RWH-482 and assigned it to the Ward 4 sanitation engineer.",
            "A cleaning crew has been scheduled to inspect and clear your rainwater recharge shaft within 24 hours to ensure monsoon catchment is preserved."
        ]
    }
};

function simulateFarmer(profileKey) {
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML = '';
    
    // Clear pipeline states
    document.getElementById('ingest-val').textContent = 'Idle';
    document.getElementById('cudf-val').textContent = 'Idle';
    document.getElementById('spark-val').textContent = 'Idle';
    document.getElementById('gemini-val').textContent = 'Idle';
    document.querySelectorAll('.step-card').forEach(c => c.className = 'step-card');
    
    const conversation = conversations[profileKey];
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
                    triggerHydrologicalAlert(profileKey);
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

function triggerHydrologicalAlert(profileKey) {
    const alertsList = document.getElementById('alerts-list');
    
    if (profileKey === 'harish') {
        switchTab('control-room');
        selectAlert('kolar');
    } 
    else if (profileKey === 'john') {
        if (!document.getElementById('alert-fresno-item')) {
            const fresnoAlert = document.createElement('div');
            fresnoAlert.id = "alert-fresno-item";
            fresnoAlert.className = "alert-item warning";
            fresnoAlert.setAttribute('onclick', "selectAlert('fresno')");
            fresnoAlert.innerHTML = `
                <div class="alert-icon"><i class="fa-solid fa-circle-exclamation text-orange"></i></div>
                <div class="alert-details">
                    <h4>Groundwater Table Drop: Fresno California</h4>
                    <p>Drawdown rates increased by 25%. Salinity risk to crops.</p>
                    <span class="alert-meta">Source: Smart Well meters | Confidence: 88%</span>
                </div>
            `;
            alertsList.appendChild(fresnoAlert);
            document.getElementById('well-fresno').style.display = 'block';
        }
        
        switchTab('control-room');
        selectAlert('fresno');
        updateAlertCount();
    }
}

function pushWhatsAppNotification(alertKey) {
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = "wa-message system";
    
    if (alertKey === 'kolar') {
        msgDiv.innerHTML = `<p>📢 <strong>Sujal-Grid Broadcast:</strong> Storm runoff redirected to Kolar Recharge Well. Tube-well pumping limits enabled.</p>`;
    } else if (alertKey === 'fresno') {
        msgDiv.innerHTML = `<p>📢 <strong>Sujal-Grid Broadcast:</strong> State canal surplus diverted to Fresno recharge basins. Pumping restrictions applied.</p>`;
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
        progressLabel.textContent = "Running Spatial Kriging on 16 vCPUs (CPU Model)...";
        cpuCard.style.borderColor = 'var(--color-primary)';
        gpuCard.style.borderColor = 'var(--border-color)';
        
        // Animate progress bar over 10 seconds (simulating CPU delay)
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
        progressLabel.textContent = "Offloading matrix math to NVIDIA H100 GPU (cuDF + Spark)...";
        gpuCard.style.borderColor = 'var(--color-success)';
        cpuCard.style.borderColor = 'var(--border-color)';
        
        // Fast animation for GPU (0.3 seconds)
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

// "What-If" Water Allocator Simulation
function runSimulation() {
    const pumpingVal = parseInt(document.getElementById('slide-pumping').value);
    const rechargeVal = parseInt(document.getElementById('slide-recharge').value);
    const recyclingVal = parseInt(document.getElementById('slide-recycling').value);
    
    document.getElementById('val-pumping').textContent = `${pumpingVal}% Draw`;
    document.getElementById('val-recharge').textContent = `${rechargeVal} L/s`;
    document.getElementById('val-recycling').textContent = `${recyclingVal}%`;
    
    // Dynamic aquifer cross-section height calculations (lower pumping + higher recharge = water table rises)
    // Map pumping (10% to 90%) and recharge (10 to 150) to Y-coordinates (Y=180 is baseline, Y=140 is high water, Y=220 is depleted)
    const extractionEffect = (pumpingVal - 40) * 0.8;
    const rechargeEffect = (rechargeVal - 30) * -0.4;
    const targetY = Math.round(180 + extractionEffect + rechargeEffect);
    
    // Restrict coordinates to boundaries (140 to 220)
    const finalY = Math.max(140, Math.min(220, targetY));
    animateWaterTable(finalY);
    
    // Sustainability Index calculations
    let sustainability = 45 - (pumpingVal * 0.4) + (rechargeVal * 0.3) + (recyclingVal * 0.4);
    sustainability = Math.min(Math.round(sustainability), 96);
    
    // Water Deficit Forecast
    let deficit = 25 + (pumpingVal * 0.3) - (rechargeVal * 0.15) - (recyclingVal * 0.2);
    deficit = Math.max(Math.round(deficit), 0);
    
    // Energy Cost (lower water tables require more pumping energy)
    // baseline is Y=180 (approx ₹8.4L), Y=220 is deeper (₹14.2L), Y=140 is shallower (₹4.2L)
    const baseEnergy = 8.4;
    const energyMultiplier = (finalY - 180) * 0.15;
    const totalEnergyCost = (baseEnergy + energyMultiplier).toFixed(1);
    
    // Compaction Risk
    let riskStr = "Moderate";
    let riskClass = "gauge-value text-orange";
    if (finalY > 200) {
        riskStr = "Critical";
        riskClass = "gauge-value text-red";
    } else if (finalY < 165) {
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
    compDiv.textContent = riskStr;
    compDiv.className = riskClass;
    
    // Advisory updates
    const advisoryBox = document.getElementById('sim-advisory');
    if (sustainability >= 80) {
        advisoryBox.textContent = `✅ High-Efficiency Grid Configured. Pumping draw matches natural aquifer recharge. Recharge well operations are operating at optimal peak capacity, ensuring a sustainable crops cycle while dropping compaction risk to ${riskStr.toLowerCase()}.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    } else if (sustainability < 45) {
        advisoryBox.textContent = `🚨 Aquifer Depletion Warning. High extraction limits (${pumpingVal}%) exceed recharge thresholds, causing rapid water table descent. Deep pumping requires ${totalEnergyCost}L in energy, threatening permanent compaction risk.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    } else {
        advisoryBox.textContent = `💡 Balanced Scenario. Sustainability is currently stable. Adjusting rainwater catchment recharge to higher levels will offset the agricultural deficit and save ₹1.5L in tube-well pumping energy costs.`;
        advisoryBox.parentElement.style.borderColor = 'rgba(16, 185, 129, 0.15)';
    }
}
