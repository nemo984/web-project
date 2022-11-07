import requests
from django.conf import settings
from django.core.exceptions import ValidationError

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'

def google_validate_id_token(*, id_token: str) -> bool:
    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        params={'id_token': id_token}
    )
    
    if not response.ok:
        raise ValidationError('id_token is invalid.')
    
    audience = response.json()['aud']
    if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
        raise ValidationError('Invalid audience')

    return True