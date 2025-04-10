FROM node AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем весь проект
COPY . .
# Собираем приложение
RUN npm run build

FROM nginx:alpine
# Копируем сборку в директорию nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]

