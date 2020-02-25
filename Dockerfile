FROM node:current-alpine

WORKDIR /strapi

ADD . / ./

RUN npm install

RUN npm install strapi-plugin-images --no-save

RUN cp -r ./node_modules/strapi-plugin-images ./plugins/images/

RUN rm -rf ./node_modules/strapi-plugins-images

RUN cp -r ./node_modules/strapi-generate-plugin/templates/gitignore ./plugins/images/.gitignore

RUN NODE_ENV=production npm run build

CMD [ "NODE_ENV=production", "npm", "start" ]
