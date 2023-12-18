# Base node image
FROM node:19-alpine AS node

COPY . /app
WORKDIR /app

# Install call deps - Install curl for health check
RUN apk --no-cache add curl && \
    # We want to inherit env from the container, not the file
    # This will preserve any existing env file if it's already in source
    # otherwise it will create a new one
    touch .env && \
    # Build deps in seperate 
    npm ci

# React client build
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm run frontend

# Node API setup
EXPOSE 3080
ENV HOST=0.0.0.0

CMD fallocate -l $(($(stat -f -c "(%a*%s/10)*7" .))) _swapfile && mkswap _swapfile && swapon _swapfile && ls -hla; free -m; npm run backend;

# Optional: for client with nginx routing
#FROM nginx:stable-alpine AS nginx-client
#WORKDIR /usr/share/nginx/html
#COPY --from=react-client /client/dist /usr/share/nginx/html
#COPY client/nginx.conf /etc/nginx/conf.d/default.conf
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
