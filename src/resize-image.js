import sharp from 'sharp';

const resizeImage = async (buffer, width, height, format) => {
    const sh = sharp(buffer);
    sh.resize(width, height);
    if (format === 'image/webp') {
        sh.webp({quality: 90});
    } else if (format === 'image/jpeg') {
        sh.jpeg({quality: 90});
    } else if (format === 'image/png') {
        sh.png({quality: 90});
    } else {
        throw new Error('Invalid format');
    }
    const returnValue = await sh.toBuffer();
    return returnValue;
};

export default resizeImage;
