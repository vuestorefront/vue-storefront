server {
	listen 80;
	server_name prod.vuestorefront.io; 
	return 301 https://prod.vuestorefront.io$request_uri;
}

server {
	listen 443 ssl;
	server_name prod.vuestorefront.io http2;

	ssl on;

	ssl_certificate /etc/nginx/ssl/prod.vuestorefront.io.chained.crt;
	ssl_certificate_key /etc/nginx/ssl/prod.vuestorefront.io.key;

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;	
	ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:DHE-RSA-AES256-SHA;
	ssl_ecdh_curve secp384r1;
	ssl_session_timeout 10m;
	ssl_session_cache shared:SSL:10m;
	ssl_session_tickets off;
	ssl_stapling on;
	ssl_stapling_verify on;
	resolver 8.8.8.8 8.8.4.4 valid=300s;
	resolver_timeout 5s; 

	ssl_dhparam /etc/nginx/ssl/dhparam.pem;

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
		application/javascript
		application/json
    text/xml
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

    location /graphql {
		proxy_pass http://localhost:8080/graphql;
	}
  
    location /img/ {
		proxy_pass http://localhost:8080/img/;
	}
}
