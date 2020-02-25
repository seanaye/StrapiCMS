'use strict';

/**
 * Images.js controller
 *
 * @description: A set of functions called "actions" of the `images` plugin.
 */

module.exports = {

  /**
   * Get and process an image
   *
   * @return {Object}
   */

  get: async (ctx) => {
    const ImagesService = strapi.plugins['images'].services.images;
    const {
      size,
      mode = 'cover',
    } = ctx.query;
    // modified to fetch uploads based on hash and not id. To circumvent fetching based on incremental id
    const entity = (await strapi.plugins['upload'].services.upload.fetchAll({hash: ctx.params._hash, _limit: 1}))[0];
    const {
      mime,
    } = entity;
    if (!entity) return ctx.notFound(); // Upload was not found
    if (!ImagesService.supportedMime(mime)) return ctx.noContent(); // Mime of the upload is not supported

    try {
      const image = await ImagesService.read(entity);
      await ImagesService
        .process(image, {
          size,
          mode,
        });
      const imageBuffer = await ImagesService.getBuffer(image, mime);
      ctx.set('Content-Type', mime);
      ctx.send(imageBuffer);
    } catch (error) {
      ctx.internalServerError();
    }
  }
};
