import path from 'path';
import multer from 'multer';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
	destination,
	filename: (req, file, cb) => {
		const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniquePreffix}_${file.originalname}`);
	},
});

const limits = {
	fileSize: 1024 * 100,
};

const upload = multer({
	storage,
	limits,
});

export default upload;
