# Pravaha (प्रवाह) - Global Flow & Grid Intelligence Platform
## Deployed Hackathon Prototype & Multi-Flow Demo

**Pravaha** (प्रवाह) is a decision-support platform designed to optimize dynamic resource flows globally—representing Hydrology, Urban Traffic, APMC Grocery logistics, Doppler Weather events, and Geopolitical shipping lanes. It showcases how combining **Google Cloud (Managed Spark, BigQuery)** and **NVIDIA GPU acceleration (cuDF / Spark RAPIDS)** optimizes spatial networks and routing by 180x.

---

## Directory Contents

*   **[index.html](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/index.html)**: Rebranded Pravaha frontend, containing map layers, WhatsApp chatbot simulator, and CPU vs. GPU benchmark dashboard.
*   **[index.css](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/index.css)**: Cyan and deep-blue styling for flows, traffic gridlocks, and Doppler clouds.
*   **[app.js](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/app.js)**: Flow control algorithms, the automated demo tour script, and map layers display toggles.
*   **[Pravaha_Proposal.md](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/Pravaha_Proposal.md)**: Full proposal specifications and judges' Q&A.

---

## How to Run Locally

1.  Locate `index.html` on your filesystem at `C:\Users\sweta\Documents\Promptwars1\MentalWellness\GEN AI APACC\SujalGrid\index.html`.
2.  Double-click `index.html` to open it in Chrome, Edge, or Safari.
3.  Alternatively, run a local web server:
    ```bash
    python -m http.server 8000
    ```
    Then open `http://localhost:8000/SujalGrid/` in your browser.

---

## Interactive Walkthrough Guide

1.  **Run Auto-Demo (Top Header)**: Click the **`Run Auto-Demo`** button in the header. Watch Pravaha automatically cycle through the Hydrology, Traffic, and Geopolitical map layers, simulate WhatsApp reports in Kannada and Marathi, and adjust the optimization sliders.
2.  **Farmer & Commuter Simulator (Left)**: Click on **`Harish (Water)`**, **`Deepak (Traffic)`**, **`Srinivas (Grocery)`**, **`Sunita (Weather)`**, or **`Rajesh (Geopolitical)`** to trigger specific flow queries and see the GPU-Spark pipeline activate.
3.  **Digital Twin Map (SVG)**: Toggle the layer icons on the top-right of the map to switch between Water, Traffic, Grocery, Weather, and Geopolitical layers.
4.  **NVIDIA GPU Accelerator Benchmark (Tab 2)**: Run the CPU vs. GPU models to witness the 180x speedup.
5.  **"What-If" Flow Allocator (Tab 3)**: Move the sliders (e.g., Traffic Signal Auto-Tune, Pumping limits) to see indices update in real-time.
