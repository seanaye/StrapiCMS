FROM strapi/base

WORKDIR /strapi

COPY ./package.json ./
# COPY ./yarn.lock ./

RUN npm install

COPY . .

RUN npm install strapi-plugin-images --no-save

RUN cp -r ./node_modules/strapi-plugin-images ./plugins/images/

RUN rm -rf ./node_modules/strapi-plugins-images

RUN cp -r ./node_modules/strapi-generate-plugin/templates/gitignore ./plugins/images/.gitignore

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
