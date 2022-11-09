import requests
from django.conf import settings
from livekit import AccessToken, VideoGrant
import logging
logger = logging.getLogger("mylogger")

def create_room_token(room_id, name):
    logger.info(f'api_key: {settings.LIVEKIT_API_KEY} dev secret: {settings.LIVEKIT_API_SECRET}')
    grant = VideoGrant(room_join=True, room=room_id)
    access_token = AccessToken(settings.LIVEKIT_API_KEY, settings.LIVEKIT_API_SECRET, grant=grant, identity=name, metadata="HAHHA") # TTL, ..
    return access_token.to_jwt()