import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models/contacts', 'contacts.json');

const updateContactsFile = async dataArr => {
	await fs.writeFile(contactsPath, JSON.stringify(dataArr, null, 2));
};

// Returns array of contacts
const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

// Returns object of contact with required ID / null
const getContactById = async contactId => {
	const dataArr = await listContacts();
	const res = dataArr.find(item => item.id === contactId);
	return res || null;
};

// Returns object of added contact
const addContact = async body => {
	const dataArr = await listContacts();
	const newContact = {
		id: nanoid(),
		...body,
	};

	dataArr.push(newContact);
	await updateContactsFile(dataArr);

	return newContact;
};

// Returns object of deleted contact with required ID / null
const removeContact = async contactId => {
	const dataArr = await listContacts();
	const requiredIndex = dataArr.findIndex(item => item.id === contactId);

	if (requiredIndex === -1) return null;

	const [res] = dataArr.splice(requiredIndex, 1);
	await updateContactsFile(dataArr);

	return res;
};

// Returns object of updated contact with required ID / null
const updateContact = async (contactId, body) => {
	const dataArr = await listContacts();
	const requiredIndex = dataArr.findIndex(item => item.id === contactId);

	if (requiredIndex === -1) return null;

	dataArr[requiredIndex] = {
		id: contactId,
		...body,
	};
	await updateContactsFile(dataArr);

	return dataArr[requiredIndex];
};

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
