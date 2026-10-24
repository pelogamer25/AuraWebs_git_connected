"""Local server that resolves URLs the way Netlify does, for `npm run qa`.

/x -> x.html, /dir/ -> dir/index.html, /dir -> 301 /dir/, unknown -> 404.html with status 404.
Redirect rules from netlify.toml are not emulated (the QA only follows links the pages contain).
"""
import http.server
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


class NetlifyLikeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        local = self.translate_path(path)
        if os.path.isdir(local):
            if not path.endswith('/'):
                self.send_response(301)
                self.send_header('Location', path + '/')
                self.end_headers()
                return None
            if os.path.exists(os.path.join(local, 'index.html')):
                return super().send_head()
        elif not os.path.exists(local) and os.path.exists(local + '.html'):
            self.path = path + '.html'
            return super().send_head()
        elif not os.path.exists(local):
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            body = open(os.path.join(ROOT, '404.html'), 'rb').read()
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return None
        return super().send_head()

    def log_message(self, *args):
        pass


if __name__ == '__main__':
    print(f'Serving {ROOT} on http://127.0.0.1:{PORT} (Netlify-style clean URLs)')
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), NetlifyLikeHandler).serve_forever()
