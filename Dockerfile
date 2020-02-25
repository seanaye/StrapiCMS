FROM node:current-alpine

WORKDIR /strapi

ADD . / ./

RUN npm install

RUN npm install strapi-plugin-images --no-save

RUN mv node_modules/strapi-plugin-images plugins/images

RUN cp node_modules/strapi-generate-plugin/templates/gitignore plugins/images/.gitignore

CMD [ "npm", "run", "start" ]
