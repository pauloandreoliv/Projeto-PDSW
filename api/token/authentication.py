import jwt
import datetime

def gerar_token(id):
    chave_secreta = '123@chaveSecreta'
    timestamp_expiracao = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=10)
    json = {
        'id': id,
        'exp': timestamp_expiracao
    }
    token = jwt.encode(json, chave_secreta, algorithm='HS256')
    return token

def validar_token(token):
    chave_secreta = '123@chaveSecreta'
    try:
        token_decodificado = jwt.decode(token, chave_secreta, algorithms=['HS256'])
        return token_decodificado
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expirado. Por favor, faça login novamente.")
    except jwt.InvalidTokenError:
        raise ValueError("Token inválido. Autenticação falhou.")
    

