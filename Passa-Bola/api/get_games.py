from flask import Flask, jsonify, request
import soccerdata as sd
import pandas as pd
from datetime import datetime

app = Flask(__name__)

cache = {
    'data': None,
    'timestamp': None
}
CACHE_DURATION_SECONDS = 3600

@app.route('/api/get_games', methods=['GET'])
def get_games():
    now = datetime.now()
    
    if cache['data'] is not None and cache['timestamp'] is not None:
        age = (now - cache['timestamp']).total_seconds()
        if age < CACHE_DURATION_SECONDS:
            return jsonify(cache['data'])

    try:
        fbref = sd.FBref(leagues="BRA-Serie A1", seasons="2024")
        
        print("Buscando calendário de jogos...")
        schedule = fbref.read_schedule()
        
        schedule.reset_index(inplace=True)
        schedule['date'] = pd.to_datetime(schedule['date']).dt.strftime('%d/%m/%Y')
        schedule['time'] = schedule['datetime'].dt.strftime('%H:%M')

        games_data = []
        for index, row in schedule.iterrows():
            games_data.append({
                'id': f"{row['game_id']}",
                'homeTeam': row['home_team'],
                'awayTeam': row['away_team'],
                'homeTeamLogo': '/logo.png',
                'awayTeamLogo': '/logo.png',
                'date': row['date'],
                'time': row['time'],
                'venue': row.get('venue', 'Não informado'),
                'score': f"{row['home_score']}-{row['away_score']}" if pd.notna(row['home_score']) else None,
                'status': 'finished' if pd.notna(row['home_score']) else 'scheduled'
            })
        
        cache['data'] = games_data
        cache['timestamp'] = now
        
        return jsonify(games_data)

    except Exception as e:
        print(f"Erro ao buscar dados do soccerdata: {e}")
        return jsonify({"error": "Não foi possível buscar os dados dos jogos."}), 500

@app.route('/api/', methods=['GET'])
def home():
    return "API do Passa a Bola está funcionando."