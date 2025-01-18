from flask import Flask, request, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "<h1>3beans4coffee!!!</h1>"

@app.route('/enteruserdata', methods=['POST'])
def test():
    data = request.get_json()
    utils.user_data = data
    return jsonify({'status': "hitesh"})



# Add routes for each function in utils.py
@app.route('/astro_kundli_details', methods=['GET'])
def astro_kundli_details():
    return jsonify(utils.get_astro_kundli_details.invoke(""))

@app.route('/kundli_numerology_details', methods=['GET'])
def kundli_numerology_details():
    return jsonify(utils.get_kundli_numerology_details.invoke(""))

@app.route('/daily_kundli_nakshatra', methods=['GET'])
def daily_kundli_nakshatra():
    return jsonify(utils.get_daily_kundli_nakshatra.invoke(""))

@app.route('/hora_chart_details', methods=['GET'])
def hora_chart_details():
    return jsonify(utils.get_hora_chart_details.invoke(""))

@app.route('/kundli_planetary_details', methods=['GET'])
def kundli_planetary_details():
    return jsonify(utils.get_kundli_planetary_details.invoke(""))







@app.route('/dosh_report', methods=['GET'])
def dosh_report():
    return jsonify([
        utils.get_pitra_dosh_report(),
        utils.get_sadesati_status(),
        utils.get_kundli_kalsarpa_details(),
        utils.get_kundli_manglik_details()
    ])

@app.route('/sadesati_remedies', methods=['GET'])
def sadesati_remedies():
    return jsonify(utils.get_sadesati_remedies())

@app.route('/rudraksha_suggestion', methods=['GET'])
def rudraksha_suggestion():
    return jsonify(utils.get_rudraksha_suggestion())

@app.route('/gem_suggestion', methods=['GET'])
def gem_suggestion():
    return jsonify(utils.get_gem_suggestion())

@app.route('/major_vimshottari_dasha', methods=['GET'])
def major_vimshottari_dasha():
    return jsonify(utils.get_major_vimshottari_dasha())

@app.route('/kundli_match_details', methods=['GET'])
def kundli_match_details():
    return jsonify(utils.get_kundli_match_details())

@app.route('/kundali_match_dosha_details', methods=['GET'])
def kundali_dosha_details():
    return jsonify(utils.get_kundali_match_dosha_details())

@app.route('/kundli_match_manglik_details', methods=['GET'])
def kundli_match_manglik_details():
    return jsonify(utils.get_kundli_match_manglik_details())

@app.route('/kundli_match_ashtakoota_details', methods=['GET'])
def kundli_ashtakoota_details():
    return jsonify(utils.get_kundli_match_ashtakoota_details())

if __name__ == '__main__':
    app.run(debug=True)

