exports.ImageGallery = class ImageGallery {
  constructor(title, url, color, date) {
    this.title = title;
    this.url = url;
    this.predominantColor = color;
    this.date = date;
  }

  static storedImages = new Array();

  static sortImagesByDate() {
    this.storedImages.sort(function (a, b) {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    return this.storedImages;
  }

  static getAllUrlFromStoredImages() {
    return this.storedImages.map((image) => {
      return image.url;
    })
  }

  static checkIfImageExists(url) {
    let allStoredURL = this.getAllUrlFromStoredImages();

    return allStoredURL.includes(url);
  }

  static addNewImageToDatabase(image) {
    this.storedImages.push(image);
  }
}