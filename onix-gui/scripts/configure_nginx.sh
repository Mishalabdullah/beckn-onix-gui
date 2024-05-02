#!/bin/bash
server_name=$1
port=$2

cat <<EOF > /etc/nginx/conf.d/reverse-proxy.conf
server {
    listen 80;
    server_name $server_name;

    location / {
        proxy_pass http://localhost:$port;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}


EOF

systemctl reload nginx

# Add certbot for HTTPS
apt install python3-certbot-nginx
certbot --nginx -d $server_name
