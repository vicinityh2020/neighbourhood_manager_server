FROM keymetrics/pm2:8-jessie
# FROM keymetrics/pm2:8-alpine

# Bundle APP files
COPY server /app/server/
COPY vcnt_server.config.js /app

# Create app directory
WORKDIR /app

# Install app dependencies
RUN cd server && npm install --development
RUN cd ..

# Expose the listening port of your app
EXPOSE 3001

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "vcnt_server.config.js" ]
