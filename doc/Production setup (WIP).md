## Introduction

If You like to start developing sites using Vue Storefront, probably You need to start with the [Installation guide](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Installing%20on%20Linux%20and%20MacOS.md). For the development purposes You'll probably be using `yarn install` / `npm run installer` sequence which will setup Vue Storefront locally using the automated installer and prepared Docker images for having Elastic Search and Redis support.

Development mode means You're using node.js based server as HTTP service and running the app on the `3000` TCP port. As it's great for local testing it's **not recommended** to use installer and direct user access to node.js in production configurations.

## Production setup - bare VPS

To run Vue Storefront in the production mode without Docker/Kubernetes You'll need the Virtual Private Server with `root` access (for the setup purposes). We'll assume that You're using `Debian GNU Linux` in the following steps.

Assumptions for the rest of this tutorial:
- You're having root access to Debian Linux machine 
- That's all ;)

### Prerequisites

### Nginx Setup

```
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

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
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
		text/xml
		application/javascript
		application/json
		text/json
		text/html;
	}
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

```


### Vue Storefront Setup

### Usefull database commands





## Production setup - using Docker / Kubernetes

To be prepared.
