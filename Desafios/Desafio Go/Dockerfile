FROM golang:rc-alpine as builder

WORKDIR /go/src/app

COPY . .

RUN go build -o /app hello.go


FROM scratch

COPY --from=builder /app .

CMD ["/app"]