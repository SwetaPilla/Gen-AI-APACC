# JanAI – India's AI Decision Intelligence Platform
## Interactive Hackathon Prototype & Command Center Dashboard

This workspace contains the complete high-fidelity interactive frontend demo for **JanAI**, designed as a Grand Finale presentation prototype for a Google Cloud Hackathon.

## Repository Contents

*   **[index.html](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/index.html)**: The main single-page application containing the Government Command Center, the simulated Citizen WhatsApp Portal, and the 10-slide Presentation Deck.
*   **[index.css](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/index.css)**: The custom styling system. Features a dark-mode glassmorphic cybernetic aesthetic with glowing animations and fully responsive grids.
*   **[app.js](file:///c:/Users/sweta/Documents/Promptwars1/MentalWellness/GEN%20AI%20APACC/app.js)**: The core JavaScript engine. Handles the state switches, WhatsApp voice note simulation, STT/Translation/RAG pipeline visualization, dynamic SVG digital twin map updates, and the mathematical What-If simulator.

---

## How to Run Locally

You can run this prototype directly in your browser without any external dependencies:

1.  Locate `index.html` on your filesystem at `C:\Users\sweta\Documents\Promptwars1\MentalWellness\GEN AI APACC\index.html`.
2.  Double-click `index.html` to open it in Google Chrome, Microsoft Edge, or any modern web browser.
3.  Alternatively, you can run a simple local web server using Python or Node.js in this directory:
    *   **Python**:
        ```bash
        python -m http.server 8000
        ```
        Then visit `http://localhost:8000` in your browser.
    *   **Node.js (using live-server)**:
        ```bash
        npx live-server
        ```

---

## Interactive Features to Test

1.  **Citizen Access Portal (Left)**: Click on the quick selector buttons (e.g., *Ramesh*, *Priya*, *Sunil*, *Harpreet*) in the mobile simulator. Witness how the platform transcribes local voice notes (Punjabi, Bhojpuri, Kannada, Marathi), translates them, executes the RAG retrieval pipeline using AlloyDB vectors, and responds with grounded facts while adding corresponding alerts to the Government Command Center.
2.  **Geospatial Digital Twin (Center)**: See the SVG map update dynamically in response to incoming alerts and executed workflows. Look for warning zones blinking red/orange.
3.  **Decision Support Panel (Right)**: Click on active alerts in the Operational Alerts queue (e.g., Groundwater Stress in Nelamangala, Flash Flood Warning in Mumbai, Stubble Burning Plume in Punjab). Inspect the explainable AI rationale and click **Approve & Execute** to trigger automated closed-loop workflows.
4.  **What-If Policy Simulator (Tab 2)**: Adjust the sliders for water tankers, stubble subsidies, transit redirection, and cooling centers. Watch the live gauges (CSAT, Mitigated Risk, Latency, Budget) calculate and update in real-time alongside a generative causal advisory analysis.
5.  **Hackathon Pitch Deck (Tab 4)**: Click through the 10 slide cards using the Next/Previous buttons to present the project structure to the judges.
