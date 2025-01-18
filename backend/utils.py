import requests
import json

# Base URL list for different Kundli API endpoints
BASE_URLS = {
    "astro_kundli_details": "https://www.astroyogi.com/contentsyn/kundli/getastrokundlidetails",
    "kundli_numerology_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlinumerotabledetails",
    "daily_kundli_nakshatra": "https://www.astroyogi.com/contentsyn/kundli/getdailykundlinakshatraprediction",
    "hora_chart_details": "https://www.astroyogi.com/contentsyn/kundli/gethorachartdetails",
    "kundli_planetary_details": "https://www.astroyogi.com/contentsyn/kundli/getkundliplanetrydetails",
    "kundli_manglik_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlimanglikdetails",
    "kundli_kalsarpa_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlikalsarpadetails",
    "sadesati_status": "https://www.astroyogi.com/contentsyn/kundli/getkundlisadhesaticurrentstatus",
    "pitra_dosh_report": "https://www.astroyogi.com/contentsyn/kundli/getkundlipitradoshreport",
    "sadesati_remedies": "https://www.astroyogi.com/contentsyn/kundli/getsadhesatiremedies",
    "rudraksha_suggestion": "https://www.astroyogi.com/contentsyn/kundli/getrudrakshasuggestion",
    "gem_suggestion": "https://www.astroyogi.com/contentsyn/kundli/getbasicgemsuggestion",
    "major_vimshottari_dasha": "https://www.astroyogi.com/contentsyn/kundli/getmajorvdasha",
    "kundli_matching_match_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlimatchingastrodetails",
    "kundli_matching_dosha_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlimatchingdoshadetails",
    "kundli_matching_manglik_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlimatchingmanglikreport",
    "kundli_matching_ashtakoota_details": "https://www.astroyogi.com/contentsyn/kundli/getkundlimatchingashtakootdetails",

}

# Example user data
user_data = {
  "Day": 15,
  "Month": 7,
  "Year": 2005,
  "Hour": 22,
  "Min": 53,
  "Lat": "19.2361",
  "Lon": "72.9488",
  "Tzone": "5.5",
  "City": "Mumbai",
  "Varshaphal_year": "2025",
  "PlanetName": "",
  "PlanetId": "",
  "ChartId": ""
}

def fetch_kundli_data(endpoint_key, user_data):
    """
    Fetch Kundli data from the specified endpoint.

    :param endpoint_key: Key corresponding to the API endpoint in BASE_URLS
    :param user_data: User data to send as 'objStr' parameter
    :return: JSON response from the API
    """
    if endpoint_key not in BASE_URLS:
        raise ValueError(f"Invalid endpoint key: {endpoint_key}")

    url = BASE_URLS[endpoint_key]
    response = requests.get(url, params={'objStr': json.dumps(user_data)})

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to fetch data from {url}, status code: {response.status_code}"}

# Individual functions for each endpoint
def get_astro_kundli_details():
    '''Kundali details provide astrological insights based on the birth chart, including the nakshatra, ascendant, planetary positions, and yogas. These factors influence the individual’s personality, relationships, and life events. They also help with compatibility and suggest astrological remedies for challenges '''
    return fetch_kundli_data("astro_kundli_details", user_data)

def get_kundli_numerology_details():
    '''Numerology details provide insights into the individual’s personality, strengths, weaknesses, and life path based on their birth date and name. Numerology calculations assign numerical values to letters and numbers to reveal hidden meanings and patterns in one’s life. It can help with self-discovery, decision-making, and personal growth.''' 
    return fetch_kundli_data("kundli_numerology_details", user_data)

def get_daily_kundli_nakshatra():
    '''This provides predictions based on the position of the moon's sign and nakshatra at birth. It affects health, emotions, career, relationships, and travel, giving personalized guidance on various aspects of life.'''
    return fetch_kundli_data("daily_kundli_nakshatra", user_data)

def get_hora_chart_details():
    '''A detailed division of the sky, showing the placement of planets across the 12 zodiac signs at the time of birth. It gives insights into the planetary influences and their impact on different life areas like career, health, and relationships'''
    return fetch_kundli_data("hora_chart_details", user_data)

def get_kundli_planetary_details():
    ''' This chart outlines the position of planets, their respective houses, and aspects (influence) on other planets. It reflects the overall nature of the person’s life experiences and karmic influences'''
    return fetch_kundli_data("kundli_planetary_details", user_data)

def get_kundli_manglik_details():
    ''' This refers to the influence of Mars in a horoscope, specifically whether it creates conflicts in relationships, especially marriage. The presence of Manglik dosha may affect marital happiness but can be mitigated through remedies.
'''
    return fetch_kundli_data("kundli_manglik_details", user_data)

def get_kundli_kalsarpa_details():
    '''A combination where all planets are positioned between Rahu and Ketu in a horoscope, considered to bring challenges. It signifies struggle in life and may impact career, health, and family but can be reduced with proper remedies.
.'''
    return fetch_kundli_data("kundli_kalsarpa_details", user_data)

def get_sadesati_status():
    ''' A period in life when Saturn transits through the signs adjacent to the moon sign, lasting for about seven and a half years. This period is believed to bring challenges and transformations in various aspects like health, career, and relationships.
'''
    return fetch_kundli_data("sadesati_status", user_data)

def get_pitra_dosh_report():
    ''' This represents unresolved ancestral karmic debts, manifesting as issues in a person’s life due to neglect or improper respect for ancestors. It can lead to difficulties and emotional unrest but can be healed with spiritual practices.
'''
    return fetch_kundli_data("pitra_dosh_report", user_data)

def get_sadesati_remedies():
    ''' Remedies to mitigate the effects of Sade Sati, such as performing specific rituals, wearing gem stones, chanting mantras, and donating to the needy. These remedies are believed to reduce the challenges and bring positive changes during this period.  '''
    return fetch_kundli_data("sadesati_remedies", user_data)

def get_rudraksha_suggestion():
    ''' Rudraksha beads are believed to have spiritual and healing properties, based on the number of faces (mukhis) they have. The suggestion provides guidance on choosing the right Rudraksha based on the individual’s birth chart and planetary influences.'''
    return fetch_kundli_data("rudraksha_suggestion", user_data)

def get_gem_suggestion():
    '''Gemstones are associated with specific planets and astrological benefits, based on the individual’s birth chart. The suggestion provides guidance on wearing the right gemstone to enhance positive planetary influences and balance energy.'''
    return fetch_kundli_data("gem_suggestion", user_data)

def get_major_vimshottari_dasha():
    '''Vimshottari Dasha is a system of planetary periods in Vedic astrology, indicating the influence of different planets at specific times in life. The major Dasha period is based on the position of the moon at birth and its influence on various life events and experiences.'''
    return fetch_kundli_data("major_vimshottari_dasha", user_data)

# Main driver code to test all endpoints
# if __name__ == '__main__':
#     print("Astro Kundli Details:", get_astro_kundli_details())
#     print("Kundli Numerology Details:", get_kundli_numerology_details())
#     print("Daily Kundli Nakshatra:", get_daily_kundli_nakshatra())
#     print("Hora Chart Details:", get_hora_chart_details())
#     print("Kundli Planetary Details:", get_kundli_planetary_details())
#     print("Kundli Manglik Details:", get_kundli_manglik_details())
#     print("Kundli Kalsarpa Details:", get_kundli_kalsarpa_details())
#     print("Sadesati Status:", get_sadesati_status())
#     print("Pitra Dosh Report:", get_pitra_dosh_report())
#     print("Sadesati Remedies:", get_sadesati_remedies())
#     print("Rudraksha Suggestion:", get_rudraksha_suggestion())
#     print("Gem Suggestion:", get_gem_suggestion())
#     print("Major Vimshottari Dasha:", get_major_vimshottari_dasha())


matching_data = {"m_day":"7","m_month":"4","m_year":"2020","m_hour":16,"m_min":8,"m_lat":"19.2361","m_lon":"72.9488","m_tzone":"5.5","f_day":"6","f_month":"2","f_year":"2023","f_hour":1,"f_min":12,"f_lat":"19.2361","f_lon":"72.9488","f_tzone":"5.5"}

def get_kundli_match_details():
    '''Kundli matching is a process of analyzing the compatibility between two individuals based on their birth charts. It considers factors like Guna Milan, Manglik Dosha, and planetary positions to assess the harmony and potential challenges in a relationship.'''
    
    return fetch_kundli_data("kundli_matching_match_details", matching_data)

def get_kundali_match_dosha_details():
    '''Kundali doshas are astrological combinations that indicate potential challenges or obstacles in a person’s life. They can affect various aspects like health, relationships, and career. Understanding and addressing these doshas can help in minimizing their negative effects.'''
    return fetch_kundli_data("kundli_matching_dosha_details", user_data)

def get_kundli_match_manglik_details():
    '''Manglik Dosha is an astrological condition caused by the planet Mars in specific positions in the birth chart. It is believed to affect marriage and relationships, leading to conflicts and challenges. Remedies and precautions can help mitigate the effects of Manglik Dosha.'''
    return fetch_kundli_data("kundli_matching_manglik_details", user_data)

def get_kundli_match_ashtakoota_details():  
    '''Ashtakoota matching is a method of Kundli matching that assesses the compatibility between two individuals based on eight factors or gunas. Each factor represents different aspects of life and relationships, providing insights into the harmony and challenges in a marriage.'''
    return fetch_kundli_data("kundli_matching_ashtakoota_details", matching_data)

# if __name__ == '__main__':
#     print("Kundli Match Details:", get_kundli_match_details())
#     print("Kundali Dosha Details:", get_kundali_dosha_details())
#     print("Kundli Manglik Details:", get_kundli_manglik_details())
#     print("Kundli Ashtakoota Details:", get_kundli_ashtakoota_details())
