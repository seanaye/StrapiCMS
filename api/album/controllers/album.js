'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findPublic (ctx) {
    const res = await strapi.services.album.find(ctx.query)
    return res.filter((album) => {
      return album.Public
    })
  }
};

