FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
ENV SIGNAL_PORT=5000
CMD ["npm","start"]