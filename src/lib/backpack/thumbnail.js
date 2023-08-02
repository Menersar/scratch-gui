const jpegThumbnail = dataUrl => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // ???
        const maxDimension = 96; // 3x the maximum displayed size of 32px

        if (image.height < 1 || image.width < 1) {
            canvas.width = canvas.height = maxDimension;
            // Canvas clears automatically after setting the canvas' dimensions.
            // // drawImage can fail if image height/width is less than 1
            // // Use blank image; the costume is too small to render anyway
            // ctx.fillStyle = 'white'; // Create white background, since jpeg doesn't have transparency
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            if (image.height > image.width) {
                canvas.height = maxDimension;
                canvas.width = (maxDimension / image.height) * image.width;
            } else {
                canvas.width = maxDimension;
                canvas.height = (maxDimension / image.width) * image.height;
            }
            // ctx.fillStyle = 'white';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        // // ??? reason for quality value 0.92 ???
        // resolve(canvas.toDataURL('image/jpeg', 0.92 /* quality */)); // Default quality is 0.92

        // TODO: !!! Use JPEG format image when light mode and PNG format image when dark mode is enabled. !!!
        // Use PNG format image instead of JPEG to avoid visible white background planes when dark mode is enabled.
        const dataURL = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
        resolve(dataURL);
    };
    image.onerror = err => {
        reject(err);
    };
    image.src = dataUrl;
});

export default jpegThumbnail;
