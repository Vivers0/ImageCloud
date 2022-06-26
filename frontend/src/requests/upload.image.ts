import axios, { AxiosRequestConfig } from "axios";
import { IFile } from "../types/File.types";

const uploadImage = async (image: File): Promise<IFile> => {
    const URL = 'http://localhost:3456/upload';
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('imageName', image.name);

    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    }

    return axios.post(URL, formData, config).then(res => res.status === 201 && res.data);
}

export default uploadImage;