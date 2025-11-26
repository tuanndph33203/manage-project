import axios from 'axios'

const uploadFileCloudinary = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'txgwigcz') // Thay bằng upload preset của bạn
    formData.append('folder', 'test')
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dfykg7wtt/image/upload', // Thay bằng cloudinary name của bạn
      formData
    )
    return response.data.url
  } catch (error) {
    console.error(error)
  }
}

export { uploadFileCloudinary }
