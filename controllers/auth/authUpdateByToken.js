import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

import User from '../../models/User.js';
import { ctrlWrapper } from '../../decorators/index.js';

const avatarsPath = path.resolve('public', 'avatars');

const updateByToken = async (req, res) => {
	const { _id: id } = req.user;
	const { path: oldPath, filename } = req.file;

	await Jimp.read(oldPath)
		.then(avatar => {
			avatar.cover(250, 250).quality(60).greyscale().write(oldPath);
		})
		.catch(err => console.log(err));

	const newPath = path.join(avatarsPath, filename);
	await fs.rename(oldPath, newPath);
	const userUpdatedAvatarURL = path.join('avatars', filename);

	const data = await User.findByIdAndUpdate(
		id,
		{ userAvatarURL: userUpdatedAvatarURL },
		{ new: true }
	);

	const { userAvatarURL } = data;

	res.json({
		userAvatarURL,
	});
};

export default ctrlWrapper(updateByToken);
