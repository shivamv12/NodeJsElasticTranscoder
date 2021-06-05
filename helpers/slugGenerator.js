const slugify = require('slugify');

/**
 * @param {*} value: String
 * @param {*} options: Object {length: <num>, prefix: <val>} <Optional>
 * @desc - Generate slug using given string.
 */
const slugGenerator = async (value, options) => {
  let slugString = await slugify(value, {
    replacement: '-' /** default `-` */,
    remove:
      /[*+&~.()#^'"!:;@]/g /** remove characters that match regex, defaults `undefined` */,
    lower: true /** convert to lower case, defaults `false` */,
    strict: false /** strip special characters except replacement, defaults `false` */,
  });

  if (options && options.length)
    slugString +=
      '-' +
      Math.round(
        Math.pow(36, options.length + 1) -
          Math.random() * Math.pow(36, options.length)
      )
        .toString(36)
        .slice(1);

  return slugString;
};

module.exports = slugGenerator;
