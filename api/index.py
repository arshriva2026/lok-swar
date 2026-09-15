import sys
import os
import io

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from server import LokSwarBackendHandler

class MockSocket:
    def __init__(self, rfile_bytes):
        self.rfile = io.BytesIO(rfile_bytes)
        self.wfile = io.BytesIO()

    def makefile(self, mode, *args, **kwargs):
        if 'r' in mode:
            return self.rfile
        if 'w' in mode:
            return self.wfile
        return io.BytesIO()

    def sendall(self, data):
        self.wfile.write(data)
        
    def getsockname(self):
        return ("127.0.0.1", 8000)

class MockServer:
    def __init__(self):
        self.server_address = ("127.0.0.1", 8000)

def application(environ, start_response):
    # Construct raw HTTP request from WSGI environ
    method = environ.get('REQUEST_METHOD', 'GET')
    path = environ.get('PATH_INFO', '/')
    query = environ.get('QUERY_STRING', '')
    if query:
        path += '?' + query
    protocol = environ.get('SERVER_PROTOCOL', 'HTTP/1.1')
    
    raw_request = f"{method} {path} {protocol}\r\n"
    for k, v in environ.items():
        if k.startswith('HTTP_'):
            header_name = k[5:].replace('_', '-').title()
            raw_request += f"{header_name}: {v}\r\n"
        elif k in ('CONTENT_TYPE', 'CONTENT_LENGTH') and v:
            header_name = k.replace('_', '-').title()
            raw_request += f"{header_name}: {v}\r\n"
    raw_request += "\r\n"
    
    body = b""
    content_length = int(environ.get('CONTENT_LENGTH', 0) or 0)
    if content_length > 0 and 'wsgi.input' in environ:
        body = environ['wsgi.input'].read(content_length)
        
    raw_request_bytes = raw_request.encode('utf-8') + body
    
    mock_socket = MockSocket(raw_request_bytes)
    
    try:
        handler = LokSwarBackendHandler(mock_socket, ("127.0.0.1", 12345), MockServer())
    except Exception as e:
        pass # Handler finishes and raises sometimes on close, it's fine
        
    response_bytes = mock_socket.wfile.getvalue()
    
    # Parse the raw HTTP response back to WSGI
    header_end = response_bytes.find(b"\r\n\r\n")
    if header_end == -1:
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [b"Malformed response from handler"]
        
    header_block = response_bytes[:header_end].decode('utf-8')
    body_bytes = response_bytes[header_end+4:]
    
    lines = header_block.split("\r\n")
    status_line = lines[0]
    status_parts = status_line.split(" ", 2)
    status = f"{status_parts[1]} {status_parts[2]}" if len(status_parts) >= 3 else "200 OK"
    
    headers = []
    for line in lines[1:]:
        if ":" in line:
            k, v = line.split(":", 1)
            headers.append((k.strip(), v.strip()))
            
    start_response(status, headers)
    return [body_bytes]

if __name__ == "__main__":
    env = {
        'REQUEST_METHOD': 'GET',
        'PATH_INFO': '/api/admin/budget/overview',
        'SERVER_PROTOCOL': 'HTTP/1.1'
    }
    def start_response(status, headers):
        print("STATUS:", status)
        print("HEADERS:", headers)
    
    res = application(env, start_response)
    print("BODY:", res[0].decode('utf-8'))
