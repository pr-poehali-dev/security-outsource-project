import json
import os
import secrets
from datetime import datetime, timedelta
from typing import Dict, Any
import psycopg2
import bcrypt

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Авторизация администратора сайта
    Аргументы: event - dict с httpMethod, body, headers
               context - объект с атрибутами request_id, function_name
    Возвращает: HTTP response dict с токеном сессии
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action', 'login')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        if action == 'login':
            username = body_data.get('username', '')
            password = body_data.get('password', '')
            
            cur.execute("SELECT id, password_hash FROM admins WHERE username = %s", (username,))
            result = cur.fetchone()
            
            if not result:
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid credentials'}),
                    'isBase64Encoded': False
                }
            
            admin_id, password_hash = result
            
            if not bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid credentials'}),
                    'isBase64Encoded': False
                }
            
            token = secrets.token_urlsafe(32)
            expires_at = datetime.utcnow() + timedelta(hours=24)
            
            cur.execute(
                "INSERT INTO sessions (admin_id, token, expires_at) VALUES (%s, %s, %s)",
                (admin_id, token, expires_at)
            )
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'token': token,
                    'expires_at': expires_at.isoformat()
                }),
                'isBase64Encoded': False
            }
        
        elif action == 'verify':
            token = body_data.get('token', '')
            
            cur.execute(
                "SELECT admin_id FROM sessions WHERE token = %s AND expires_at > NOW()",
                (token,)
            )
            result = cur.fetchone()
            cur.close()
            conn.close()
            
            if result:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'valid': True}),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'valid': False}),
                    'isBase64Encoded': False
                }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
