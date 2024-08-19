import pytest
import jwt
from datetime import datetime, timedelta
from authentication import gerar_token, validar_token

# Substitua esta chave pela mesma chave secreta usada no authentication.py
CHAVE_SECRETA = '123@chaveSecreta'

def test_gerar_token():
    id = "test_user_id"
    token = gerar_token(id)
    
    assert isinstance(token, str)  # Verifica se o token é uma string
    
    # Decodifica o token para verificar seu conteúdo
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
    expirado_token = jwt.encode({
        'id': id,
        'exp': datetime.utcnow() - timedelta(seconds=1)
    }, CHAVE_SECRETA, algorithm='HS256')
    with pytest.raises(ValueError):
        validar_token(expirado_token)