FROM node:14.14
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE 8000
CMD ["node", "index.js"]