# 📱 Human Activity Recognition (HAR) using LSTM

A **real-time Human Activity Recognition system** that uses **mobile phone motion sensors** (accelerometer + gyroscope) and a **deep learning LSTM model** to classify human activities such as walking, sitting, standing, and lying.

The system includes:

* A **TensorFlow/Keras LSTM model**
* A **FastAPI backend**
* A **mobile-friendly web frontend**
* Real-time sensor data capture from Android devices

---

## 🚀 Features

* 📊 LSTM-based sequence modeling (trained on UCI HAR Dataset)
* 📱 Live mobile sensor data (DeviceMotion API)
* 🌐 Web-based UI accessible from phone browser
* ⚡ Real-time predictions with confidence score
* 🔁 Automatic padding to 128 timesteps
* 🧠 Activities detected:

  * Walking
  * Walking Upstairs
  * Walking Downstairs
  * Sitting
  * Standing
  * Lying

---

## 🧠 Model Details

* **Architecture:** LSTM → Dense → Softmax

* **Input Shape:** `(128 timesteps, 9 features)`

* **Features Used:**

  * Body Acceleration (X, Y, Z)
  * Gyroscope (X, Y, Z)
  * Total Acceleration (X, Y, Z)

* **Framework:** TensorFlow / Keras

* **Saved Model:** `har_lstm_model.h5`

---

## 🗂️ Project Structure

```
HAR_App/
│
├── backend/
│   ├── main.py          # FastAPI server
│   ├── model.py         # LSTM model loader & inference
│   ├── schemas.py       # Request validation
│   └── har_lstm_model.h5
│
├── frontend/
│   ├── index.html       # UI
│   ├── style.css        # Styling
│   └── script.js        # Mobile motion logic
│
├── venv/                # Virtual environment
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd HAR_App
```

---

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

---

### 3️⃣ Install Dependencies

```bash
pip install fastapi uvicorn tensorflow numpy pydantic
```

---

### 4️⃣ Run Backend Server

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 📲 How to Use (Mobile)

1. Connect **mobile & laptop to same Wi-Fi**
2. Open browser on phone
3. Visit:

```
http://<laptop-ip>:8000
```

Example:

```
http://192.168.18.93:8000
```

4. Allow **Motion Sensor Permission**
5. Move your phone (walk, shake, sit)
6. See live activity & confidence 🎯

---

## 🌐 API Endpoint

### `POST /api/predict`

**Request Body**

```json
{
  "data": [
    [ax, ay, az, gx, gy, gz, tax, tay, taz],
    ...
  ]
}
```

**Response**

```json
{
  "activity": "Walking",
  "confidence": 0.92
}
```

---

## 🔒 Notes & Limitations

* HTTPS is required on some mobile browsers for motion sensors
* Sensor values differ from UCI HAR dataset → accuracy may vary
* Model trained on **waist-mounted sensors**, phone position matters

---

## 🛠️ Future Improvements

* 🔁 Sensor normalization (mean/std)
* 📦 Convert model to TensorFlow Lite
* 📲 Android APK / PWA
* 📈 Temporal smoothing of predictions
* 🧪 Fine-tuning on real mobile sensor data

---

## 👨‍💻 Author

**Muhammad Waqas**
AI | Deep Learning | Computer Vision
📍 Pakistan

---

## 📜 License

This project is for **educational & research purposes**.


