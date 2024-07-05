# -*- mode: Python -*-
# Run like (from repo root):
# op run --env-file="./tilt_resources/ref.env" -- tilt up
# https://github.com/vuestorefront/cloud-monorepo/blob/d55df62b79d0a44828dddfd2872a857b3967cb0f/internal-services/farmer-instance/Tiltfile

load('ext://helm_resource', 'helm_resource', 'helm_repo')
allow_k8s_contexts(['rancher-desktop', 'docker-desktop'])
watch_file("./tilt_resources/values.yml")

k8s_yaml('./tilt_resources/crd.yml')
k8s_yaml('./tilt_resources/no-op.yaml')


helm_repo(
    name='vsf',
    url='https://chartmuseum.vuestorefront.cloud',
    username=os.getenv("CHARTMUSEUM_USERNAME"),
    password=os.getenv("CHARTMUSEUM_PASSWORD")
)
helm_resource(
    name='vue-storefront',
    chart='vsf/vue-storefront',
    flags=['-f', 'tilt_resources/values.yml'],
    resource_deps=['vsf']
)

docker_build(
  'tilt-middleware',
  '.',
)
