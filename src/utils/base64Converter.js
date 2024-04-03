export const convertImageToBase64 = (images, callback) => {
  let convertedImages = images.map((imagePath) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        // imagePath와 함께 Base64 인코딩된 데이터를 객체로 반환
        resolve({ path: imagePath, base64: dataURL });
      };
      img.onerror = () =>
        reject(new Error(`Failed to load image at path ${imagePath}`));
      img.src = imagePath;
    });
  });

  Promise.all(convertedImages)
    .then((data) => callback(data))
    .catch((error) => console.error(error));
};
