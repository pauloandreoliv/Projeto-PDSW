import pytest
import jwt
from zoneinfo import ZoneInfo
from datetime import datetime, timedelta
from authentication import gerar_token, validar_token

CHAVE_SECRETA = '123@chaveSecreta'

def test_gerar_token():
    id = "test_user_id"
    token = gerar_token(id)
    
    assert isinstance(token, str) 

    try:
        payload = jwt.decode(token, CHAVE_SECRETA, algorithms=['HS256'])
        assert payload['id'] == id
        assert 'exp' in payload
    except jwt.ExpiredSignatureError:
        pytest.fail("Token expirado")
    except jwt.InvalidTokenError:
        pytest.fail("Token inválido")

def test_validar_token():
    id = "test_user_id"
    token = gerar_token(id)
    
    payload = validar_token(token)
    assert payload['id'] == id

    # Testa um token inválido
    with pytest.raises(ValueError):
        validar_token("invalid_token")
    
    # Testa um token expirado
    expirado_em = datetime.now(ZoneInfo('UTC')) - timedelta(seconds=1)
    expirado_token = jwt.encode({
        'id': id,
        'exp': expirado_em
    }, CHAVE_SECRETA, algorithm='HS256')
    with pytest.raises(ValueError):
        validar_token(expirado_token)