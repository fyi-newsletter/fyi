FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json .
COPY ./packages/api/package*.json ./packages/api/
COPY ./packages/shared/ ./packages/shared/
RUN npm install -w packages/api
COPY ./packages/api/ ./packages/api/
RUN npm run build -w packages/api

FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json .
COPY ./packages/api/package*.json ./packages/api/
COPY --from=build app/packages/shared/ ./packages/shared/
RUN npm install --only=production
COPY --from=build /app/packages/api/dist ./packages/api/dist

CMD ["sh", "-c", "npm run migration:run -w packages/api && npm run start:prod -w packages/api"]