import { ID, storage } from '@/appwrite'

const uploadImage = async (file: File) => {
	if (!file) return

	const fileUploaded = await storage.createFile('66458bab000e4311fd27', ID.unique(), file)

	return fileUploaded
}

export default uploadImage