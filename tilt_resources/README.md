# Tilt

Run like this:
1. `brew install tilt 1password-cli` (1Password CLI needs extra steps of config in the desktop app: https://developer.1password.com/docs/cli/get-started/#install)
2. `cd` to repo root
3. Make sure you have access to the `Alokai DevOps Vault` 1Password vault to download the vue-storefront chart. ref.env file depends on it
4. `op run --env-file="./tilt_resources/ref.env" -- tilt up`
