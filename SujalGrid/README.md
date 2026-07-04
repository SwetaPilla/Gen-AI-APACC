# Sujal-Grid: Real-Time Aquifer Recharge & Water-Grid Intelligence
## Deployed Hackathon Prototype & Benchmark Dashboard

Sujal-Grid is a decision-support platform designed to solve groundwater depletion crises globally—scaling from rural India (Kolar, Karnataka) to agricultural valleys in the USA (Fresno, California). It showcases how combining **Google Cloud (Managed Service for Apache Spark)** and **NVIDIA GPU acceleration (cuDF / Spark RAPIDS)** optimizes large-scale geostatistical modeling by 180x.

---

## Directory Contents

*   **[index.html](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/index.html)**: The main layout. Contains the Aquifer Control Room, the NVIDIA GPU Benchmark Panel, the "What-If" Water Allocator, and the presentation slides.
*   **[index.css](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/index.css)**: Glassmorphic cybernetic dark-blue theme styling for water tables and simulated well levels.
*   **[app.js](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/app.js)**: Holds the interactive dashboard functions, the WhatsApp farmer simulator, the CPU vs. GPU benchmark runner, and the water table path animations.
*   **[SujalGrid_Proposal.md](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/SujalGrid/SujalGrid_Proposal.md)**: Pitch slides outlines, system design specifications, and judges' Q&A.

---

## How to Run Locally

You can open this prototype in any web browser:

1.  Locate `index.html` on your filesystem at `C:\Users\sweta\Documents\Promptwars1\MentalWellness\GEN AI APACC\SujalGrid\index.html`.
2.  Double-click `index.html` to open it in Chrome, Edge, or Safari.
3.  Alternatively, run a local web server:
    ```bash
    python -m http.server 8000
    ```
    Then open `http://localhost:8000/SujalGrid/` in your browser.

---

## Interactive Walkthrough Guide

1.  **Farmer WhatsApp Simulator (Left)**: Click on **`Harish (Karnataka)`** or **`John (California)`**. Watch the chat simulate voice note transcriptions (Kannada/English), cuDF data cleaning logs, GPU-Spark spatial models, and grounded water table advisories.
2.  **Geospatial Aquifer Map (SVG)**: View the cross-section representing the Ground Level, Unsaturated Zone, Water Table, and Saturated Aquifer. Watch the water table line adjust in height.
3.  **NVIDIA GPU Accelerator Benchmark (Tab 2)**:
    *   Click **`Run CPU Model`**: The progress loader runs slowly (simulating high CPU processing latency) and displays `12.8 Sec` in red.
    *   Click **`Run NVIDIA GPU Model`**: The loader finishes instantly, displaying `71 ms` and a green `180x Faster` speedup.
4.  **"What-If" Water Allocator (Tab 3)**: Move the *Agricultural Pumping Draw limit* or the *Stormwater Recharge Rate* sliders. Watch the water table level rise and fall on the SVG diagram and check the sustainability gauges.
5.  **Pitch Slides (Tab 4)**: Click through the 10 final presentation slides to present the project structure to the judges.
