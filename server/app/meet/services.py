import logging

import requests
from django.conf import settings
from livekit import AccessToken, VideoGrant, RoomServiceClient

logger = logging.getLogger("mylogger")

def create_room_identifier(room):
    return f'{room.id}-{room.channel}-{room.name}'

def create_room_token(room, name) -> str:
    logger.info(f'api_key: {settings.LIVEKIT_API_KEY} dev secret: {settings.LIVEKIT_API_SECRET}')
    grant = VideoGrant(room_join=True, room=create_room_identifier(room), room_list=True)
    access_token = AccessToken(settings.LIVEKIT_API_KEY, settings.LIVEKIT_API_SECRET, grant=grant, identity=name, metadata="HAHHA") # TTL, ..
    return access_token.to_jwt()

# polling or ws?
# Another solution: USe livekit webhooks, notify current users in channel via websockets 
def get_in_room_count(room) -> int:
    client = RoomServiceClient(settings.LIVEKIT_API_URL, settings.LIVEKIT_API_KEY, settings.LIVEKIT_API_SECRET)
    room_name = create_room_identifier(room)
    participants = client.list_participants(room_name)
    return len(participants)
