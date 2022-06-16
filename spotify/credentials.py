from secrets import secrets

client_id = secrets.get('CLIENT_ID')
client_secret = secrets.get('CLIENT_SECRET')

CLIENT_ID = client_id
CLIENT_SECRET = client_secret
REDIRECT_URI = 'http://127.0.0.1:8000/spotify/redirect'
