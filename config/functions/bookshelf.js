'use strict';

module.exports = (bookshelf, connection) => {
  console.log('Loaded uuid')
  bookshelf.plugin(require('bookshelf-uuid'))
}
