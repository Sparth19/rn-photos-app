import RNFetchBlob from 'rn-fetch-blob';

const getExtension = (filename: string): string | undefined => {
  // To get the file extension
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)?.toString() : undefined;
};

export const downloadImageRemote = (image_URL: string): void => {
  // To add the time suffix in filename
  let date = new Date();
  // Getting the extension of the file
  let ext = getExtension(image_URL);
  ext = '.' + ext!;
  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      console.log('res -> ', JSON.stringify(res));
    })
    .catch(error => {
      console.error('Error downloading image:', error);
    });
};
