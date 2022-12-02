# In Progress
![image](https://user-images.githubusercontent.com/52666539/205256187-5ab02b4f-fb7f-4aad-b8d1-8ddcb98ecaf7.png)


# Local Development

For testing with multiple devices inside same network

## livekit-server

```
./livekit-server.exe --dev --bind 0.0.0.0
```

## django

```
python manage.py runserver 0.0.0.0:8000
```

### .env

```
GOOGLE_OAUTH2_KEY=<google-oauth-key>
GOOGLE_OAUTH2_SECRET=<google-oauth-secret>
LIVEKIT_API_KEY=<livekit-api-key>
LIVEKIT_API_SECRET=<livekit-api-secret>
```

## react .env

```
HOST=0.0.0.0
REACT_APP_LIVEKIT_URL=ws://192.168.0.104:7880
REACT_APP_DJANGO_URL=http://192.168.0.104:8000
REACT_APP_OAUTH_CLIENT_ID=<django-oauth-client-id>
REACT_APP_OAUTH_CLIENT_SECRET=<django-oauth-client-secret>
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=<google-oauth-client-id>
```

# Docker Compose

...
