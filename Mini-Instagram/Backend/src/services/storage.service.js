const ImageKit = require("@imagekit/nodejs/index.js");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadImage = async (buffer) => {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: `image_${Date.now()}.jpg`,
  });
  return result.url;
};

module.exports = {
  uploadImage,
};
