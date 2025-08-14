
FROM node:20.19.4-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # 生成 dist/ 或 build/ 目录


FROM nginx:1.25-alpine
# 复制构建产物到 Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# 覆盖默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 暴露端口
EXPOSE 80