# Skin Cancer Detection Project

## Overview
This project detects skin cancer using deep learning models (InceptionV3, ResNet101, VGG16). It includes:
- **Model Training** (Jupyter Notebook & Python scripts)
- **Backend API** (Flask for serving predictions)
- **Frontend UI** (HTML, JS, CSS for user interaction)

## File Structure
```
SkinCancerDetection/
│── backend/
│   ├── app.py                # Flask API
│── frontend/
│   ├── index.html             # Frontend UI
│   ├── script.js              # API calls
│   ├── styles.css             # Styling
│── models/
│── dataset/
│── notebooks/
│── README.md
```

## Setup Instructions
### Backend
1. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
2. Run Flask server:
   ```bash
   python backend/app.py
   ```

### Frontend
1. Open `frontend/index.html` in a browser.

## Usage
- Upload an image.
- Select a model.
- Click 'Predict' to get skin cancer classification.
