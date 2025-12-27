from pydantic import BaseModel
from typing import List

class SensorInput(BaseModel):
    data: List[List[float]]  # Expecting 2D list: 128 time steps x 9 features
