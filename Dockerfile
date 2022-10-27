FROM node:14.14
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE 80
CMD ["node", "index.js"]