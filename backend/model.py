import numpy as np
from tensorflow.keras.models import load_model

ACTIVITIES = [
    "Walking",
    "Walking Upstairs",
    "Walking Downstairs",
    "Sitting",
    "Standing",
    "Lying"
]

class HARModel:
    def __init__(self, model_path: str):
        self.model = load_model(model_path)

    def predict(self, sensor_data):
        arr = np.array(sensor_data, dtype=np.float32)
        if arr.ndim != 2 or arr.shape[1] != 9:
            raise ValueError("Input must be 2D with shape (time_steps, 9 features)")

        if arr.shape[0] < 128:
            repeats = (128 // arr.shape[0]) + 1
            arr = np.tile(arr, (repeats, 1))[:128]

        X = arr.reshape(1, 128, 9)
        preds = self.model.predict(X, verbose=0)
        idx = int(np.argmax(preds))
        return {
            "activity": ACTIVITIES[idx],
            "confidence": round(float(np.max(preds)), 4)
        }
