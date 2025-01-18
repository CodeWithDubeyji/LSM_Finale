from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/', methods=['POST'])
def home():
    return "<h1>3beans4coffee!!!</h1>"