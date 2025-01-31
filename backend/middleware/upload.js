const cloudinary = require("../config/cloudinary.js");

/**
 * Uploads an image to Cloudinary.
 * @param {Object} file - The image file (from multer)
 * @param {String} folder - The folder name to store the image
 * @returns {Object} Cloudinary response { url, publicId }
 */
const uploadImageToCloudinary = (file, folder = "general") => {
	return new Promise((resolve, reject) => {
		if (!file || !file.buffer) {
			return reject(new Error("File buffer is missing"));
		}

		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder,
				format: "webp",
				allowed_formats: ["jpg", "jpeg", "png", "webp"],
			},
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve({
						url: result.secure_url,
						publicId: result.public_id,
					});
				}
			}
		);
		uploadStream.end(file.buffer);
	});
};

module.exports = { uploadImageToCloudinary };
