FROM keymetrics/pm2:8-jessie

# Get arguments
ARG env

# Bundle APP files
COPY server /app/server/
COPY vcnt_server.config.js /app

# Create app directory
WORKDIR /app

# Install app dependencies
RUN cd server && npm install >/dev/null 2>&1
RUN cd ..

# Install and configure log-rotate
RUN pm2 install pm2-logrotate >/dev/null 2>&1
RUN pm2 set pm2-logrotate:max_size 10M >/dev/null 2>&1
RUN pm2 set pm2-logrotate:compress true >/dev/null 2>&1
RUN pm2 set pm2-logrotate:retain 7 >/dev/null 2>&1

# Expose the listening port of your app
EXPOSE 3000

# Show current folder structure in logs
# RUN ls -al -R

# Run command
CMD [ "pm2-runtime", "start", "--env", $env, "vcnt_server.config.js" ]
