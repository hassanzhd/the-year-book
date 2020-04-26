module.exports.validExt = (__extension) => {
  switch (__extension) {
    case ".jpg":
      return true;
    case ".JPG":
      return true;
    case "jpeg":
      return true;
    case "JPEG":
      return true;
    case "png":
      return true;
    case "PNG":
      return true;

    default:
      break;
  }
  return false;
};
