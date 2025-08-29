# backend/python/predict_resnet.py
import argparse
import json
import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.imagenet_utils import preprocess_input

parser = argparse.ArgumentParser()
parser.add_argument('--model', required=True, help='Path to .h5 model')
parser.add_argument('--image', required=True, help='Path to image to predict')
args = parser.parse_args()

MODEL_PATH = args.model
IMAGE_PATH = args.image

# classes — ensure this order matches training labels
CLASSES = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']

def main():
    if not os.path.exists(MODEL_PATH):
        print(json.dumps({'error': f'Model not found: {MODEL_PATH}'}))
        exit(1)
    if not os.path.exists(IMAGE_PATH):
        print(json.dumps({'error': f'Image not found: {IMAGE_PATH}'}))
        exit(1)

    # Load model (Keras)
    model = load_model(MODEL_PATH)

    # Load and preprocess image: adjust if you trained with different preprocessing
    img = image.load_img(IMAGE_PATH, target_size=(256, 256))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)  # use same preprocessing as training

    preds = model.predict(x)
    top_idx = int(np.argmax(preds, axis=1)[0])
    confidence = float(preds[0][top_idx])

    out = {
        'class_index': top_idx,
        'label': CLASSES[top_idx],
        'confidence': round(confidence, 6)
    }

    # print JSON to stdout — Node will parse it
    print(json.dumps(out))

if __name__ == '__main__':
    main()
