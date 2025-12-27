const BACKEND_URL = "/api/predict";

const activityEl = document.getElementById("activity");
const confidenceEl = document.getElementById("confidence");
const debugEl = document.getElementById("debug");

let sensorWindow = [];
const WINDOW_SIZE = 40;

async function sendWindow(data) {
    try {
        const res = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const result = await res.json();

        activityEl.innerText = result.activity || "Unknown";
        confidenceEl.innerText =
            typeof result.confidence === "number"
                ? (result.confidence * 100).toFixed(2) + "%"
                : "0%";

        if (debugEl) {
            debugEl.innerText = `Activity: ${result.activity}, Confidence: ${result.confidence}`;
        }
    } catch (err) {
        console.error("Backend error:", err);
        activityEl.innerText = "Error";
        confidenceEl.innerText = "0%";
        if (debugEl) debugEl.innerText = `Error: ${err.message}`;
    }
}

async function initMotion() {
    if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
    ) {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== "granted") {
            alert("Motion permission denied");
            return;
        }
    }

    window.addEventListener("devicemotion", (event) => {
        const acc = event.accelerationIncludingGravity;
        const gyro = event.rotationRate;

        if (!acc || !gyro) return;

        const sample = [
            acc.x || 0,
            acc.y || 0,
            acc.z || 0,
            gyro.alpha || 0,
            gyro.beta || 0,
            gyro.gamma || 0,
            acc.x || 0,
            acc.y || 0,
            acc.z || 0,
        ];

        sensorWindow.push(sample);

        if (debugEl) {
            debugEl.innerText = `AX:${acc.x?.toFixed(2)} AY:${acc.y?.toFixed(
                2
            )} AZ:${acc.z?.toFixed(2)}`;
        }

        if (sensorWindow.length >= WINDOW_SIZE) {
            sendWindow(sensorWindow);
            sensorWindow = [];
        }
    });
}

initMotion();
