TAG=`git rev-parse HEAD`
docker build -t registry.storefrontcloud.io/docs-storefrontcloud-io/v2:${TAG:0:8} -f Dockerfile .
docker push registry.storefrontcloud.io/docs-storefrontcloud-io/v2:${TAG:0:8}
