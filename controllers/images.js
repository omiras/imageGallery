const ImageGallery = require('../models/image').ImageGallery;

const get_image_colors = require('get-image-colors');

function extractPredominantColor(colors) {
    let firstColor = colors[0];
    return firstColor._rgb.slice(0, -1);
}

exports.getImages = (req, res, next) => {
    res.render('images', {
        images: ImageGallery.sortImagesByDate(),
        path: '/'
    });
};

exports.addImage = (req, res, next) => {
    res.render('addNew', {
        error: false,
        path: '/add-new'

    });
};

exports.addImagePost = (req, res, next) => {
    const imageUrl = req.body.imageURL;
    const title = req.body.imageName;
    const date = req.body.date;

    if (ImageGallery.checkIfImageExists(imageUrl)) {
        return res.render('addNew', {
            error: `La URL ${imageUrl} ya existe en nuestra base de datos.`,
            path: '/add-new'

        });
    }

    get_image_colors(imageUrl).then(colors => {
        const predominantColor = extractPredominantColor(colors);
        const newImage = new ImageGallery(title, imageUrl, predominantColor, date);

        ImageGallery.addNewImageToDatabase(newImage);
        return res.redirect('/');
    }).catch(error => {
        console.log("Error de conversión", error);
        return res.render('addNew', {
            error: `Ha ocurrido un error inesperado al subir la foto. Por favor, prueba con otra URL`,
            path: '/add-new'

        });
    })
};