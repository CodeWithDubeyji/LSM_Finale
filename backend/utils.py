import requests
import json

user_data ={
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
kundli_url = "https://www.astroyogi.com/contentsyn/kundli/getdailykundlinakshatraprediction"
def get_kundli():
    response = requests.get(kundli_url, params={'objStr': json.dumps(user_data)})
    return response.json()

if __name__ == '__main__':
    print(get_kundli())