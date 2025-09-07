import axios from "axios";

export const imageUpload = async imageFile => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_API}`, formData);
    return data.data.display_url
}