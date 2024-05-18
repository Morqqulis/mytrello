import { storage } from '@/appwrite'

const getUrl = async (image: Image) => {
	if (!image.bucketId && !image.fileId) return

	const url = storage.getFilePreview(image.bucketId, image.fileId)
    
	return url
}

export default getUrl
