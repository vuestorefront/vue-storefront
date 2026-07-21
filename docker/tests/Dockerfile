FROM mcr.microsoft.com/playwright:v1.61.1-noble

ARG YARN_VERSION=4.17.1
ARG NODE_VERSION=24.17.0
ARG UV_VERSION=0.11.30
ARG OPENSPEC_VERSION=1.6.0

ENV COREPACK_HOME=/usr/local/share/corepack

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    ripgrep \
    jq \
    gh \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p "${COREPACK_HOME}" \
    && test "$(node --version)" = "v${NODE_VERSION}" \
    && corepack enable \
    && corepack install --global "yarn@${YARN_VERSION}" \
    && test "$(yarn --version)" = "${YARN_VERSION}"

RUN curl --proto '=https' --tlsv1.2 -LsSf \
    "https://releases.astral.sh/github/uv/releases/download/${UV_VERSION}/uv-installer.sh" \
    -o /tmp/uv-installer.sh \
    && env UV_UNMANAGED_INSTALL="/usr/bin" sh /tmp/uv-installer.sh \
    && rm /tmp/uv-installer.sh \
    && uv --version | grep -q "^uv ${UV_VERSION}" \
    && npm install -g "@fission-ai/openspec@${OPENSPEC_VERSION}" \
    && npm list -g --depth=0 "@fission-ai/openspec@${OPENSPEC_VERSION}"

ENV HOME=/home/ubuntu

CMD ["/bin/sh", "-c", "echo Container started\n trap \"exit 0\" 15\n \n \"$@\" & \n while sleep 1 & wait $!; do :; done", "-", "/bin/sh", "-c", "cd /var/www/src/themes/petsies-capybara/e2e-tests && yarn install --immutable"]
