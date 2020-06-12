const parseBase64 = (image) => {
  const [mimeType, data] = image.split(",");
  return {
    data,
    mimeType: mimeType,
  };
};

module.exports = {
  parseBase64,
};
