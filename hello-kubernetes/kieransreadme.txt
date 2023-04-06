cd src/app/

docker build -t my-hello-kubernetes .

docker run -p 8080:8080 --name hello-k8s my-hello-kubernetes