FROM golang:latest

WORKDIR /root/path
COPY . .
RUN go get -d -v ./...

CMD cp -r /root/app /workspace