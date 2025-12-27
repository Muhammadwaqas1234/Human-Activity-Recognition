from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from schemas import SensorInput
from model import HARModel
import numpy as np

app = FastAPI(
    title="Human Activity Recognition API",
    description="LSTM-based HAR system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once
har_model = HARModel("har_lstm_model.h5")

# API router prefix for clarity
@app.post("/api/predict")
def predict_activity(payload: SensorInput):
    return har_model.predict(payload.data)

# Serve frontend from "/"
frontend_path = Path(__file__).parent.parent / "frontend"
app.mount("/", StaticFiles(directory=str(frontend_path), html=True), name="frontend")
