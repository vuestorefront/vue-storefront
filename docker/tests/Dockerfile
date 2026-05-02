FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    ripgrep \
    jq \
    gh \
    && rm -rf /var/lib/apt/lists/*

RUN curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR="/usr/bin" sh \
    && npm install -g @fission-ai/openspec@latest

CMD ["/bin/sh", "-c", "echo Container started\n trap \"exit 0\" 15\n \n \"$@\" & \n while sleep 1 & wait $!; do :; done", "-", "/bin/sh", "-c", "cd /var/www/src/themes/petsies-capybara/e2e-tests && yarn"]
