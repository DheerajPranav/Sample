from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

app = Flask(__name__)

# Load trained models
models = {
    'inception': tf.keras.models.load_model('models/inception_model.h5'),
    'resnet': tf.keras.models.load_model('models/resnet_model.h5'),
    'vgg': tf.keras.models.load_model('models/vgg_model.h5')
}

# Class labels
CLASS_NAMES = ['Basal Cell Carcinoma', 'Melanoma', 'Squamous Cell Carcinoma']


# Preprocess image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    img_array = preprocess_image(file_path)

    model_name = request.form.get('model', 'inception')
    model = models.get(model_name, models['inception'])
    predictions = model.predict(img_array)

    result = {CLASS_NAMES[i]: float(predictions[0][i]) for i in range(len(CLASS_NAMES))}
    os.remove(file_path)  # Clean up uploaded file

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)