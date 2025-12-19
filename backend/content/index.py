import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Управление контентными блоками (текст, изображения)
    Аргументы: event - dict с httpMethod, body, headers
               context - объект с атрибутами request_id, function_name
    Возвращает: HTTP response dict с данными контента
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
    
    def verify_token(token: str) -> bool:
        if not token:
            return False
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute("SELECT admin_id FROM sessions WHERE token = %s AND expires_at > NOW()", (token,))
        result = cur.fetchone()
        cur.close()
        conn.close()
        return result is not None
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'GET':
        section = event.get('queryStringParameters', {}).get('section', '')
        
        if section:
            cur.execute(
                "SELECT id, section, type, content, image_url, position FROM content_blocks WHERE section = %s AND is_active = true ORDER BY position",
                (section,)
            )
        else:
            cur.execute(
                "SELECT id, section, type, content, image_url, position FROM content_blocks WHERE is_active = true ORDER BY section, position"
            )
        
        rows = cur.fetchall()
        blocks = []
        for row in rows:
            blocks.append({
                'id': row[0],
                'section': row[1],
                'type': row[2],
                'content': row[3],
                'image_url': row[4],
                'position': row[5]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'blocks': blocks}),
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token', headers.get('x-auth-token', ''))
    
    if not verify_token(token):
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        section = body_data.get('section', '')
        content_type = body_data.get('type', 'text')
        content = body_data.get('content', '')
        image_url = body_data.get('image_url', '')
        position = body_data.get('position', 0)
        
        cur.execute(
            "INSERT INTO content_blocks (section, type, content, image_url, position) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (section, content_type, content, image_url, position)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'id': new_id, 'message': 'Block created'}),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        block_id = body_data.get('id')
        content = body_data.get('content')
        image_url = body_data.get('image_url')
        
        if content is not None:
            cur.execute("UPDATE content_blocks SET content = %s, updated_at = NOW() WHERE id = %s", (content, block_id))
        if image_url is not None:
            cur.execute("UPDATE content_blocks SET image_url = %s, updated_at = NOW() WHERE id = %s", (image_url, block_id))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Block updated'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        block_id = params.get('id')
        
        cur.execute("UPDATE content_blocks SET is_active = false WHERE id = %s", (block_id,))
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'message': 'Block deleted'}),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
