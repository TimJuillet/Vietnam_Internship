from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import io
from PIL import Image
import os

app = Flask(__name__)

# Charger le modèle sauvegardé
model = load_model('../best_model9_vgg19.keras') #path to the model you want to use

def prepare_image(image, target):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image /= 255.0
    return image

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify(error="No file provided"), 400

    file = request.files['file']
    try:
        img = Image.open(io.BytesIO(file.read()))
        prepared_image = prepare_image(img, target=(224, 224))
        predictions = model.predict(prepared_image)
        class_idx = np.argmax(predictions, axis=1).item()
        return jsonify(prediction=int(class_idx))
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(debug=True,port=8000,host='0.0.0.0')
