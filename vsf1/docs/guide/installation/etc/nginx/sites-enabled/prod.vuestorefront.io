server {
	listen 80;
	server_name prod.vuestorefront.io;
	add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;

    gzip on;
    gzip_proxied any;
    gzip_types
        text/css
        text/javascript
        text/xml
        application/javascript
        application/json
        text/json;

    location / {
        proxy_pass http://localhost:3000/;
    }

    location /assets/ {
        proxy_pass http://localhost:3000/assets/;
    }

    location /api/ {
        proxy_pass http://localhost:8080/api/;
    }

    location /img/ {
        proxy_pass http://localhost:8080/img/;
    }
}
