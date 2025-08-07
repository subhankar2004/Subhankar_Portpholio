FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -y
RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

# Copy your entire project
COPY . .

# Generate Prisma client if you have Prisma schema
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]