import { useState } from "react";
import Dropzone from "react-dropzone";
import uploadImage from "../requests/upload.image";
import '../styles/form.css';
import { IFile } from "../types/File.types";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { grey } from "@mui/material/colors";
import { Box, Button, IconButton } from '@mui/material';
import cfg from '../config.json'

const DZ = () => {
  const [uploadedImage, setUploadedImage] = useState<IFile | null>(null)

  const handleChange = async (f: File[]) => {
    const isImage = f && f[0] && f[0].type.split('/')[0] === 'image'
    if (isImage) {
      const file = f[0];
      const response = await uploadImage(file);
      if (response) {
        return setUploadedImage(response);
      }
      return alert('Error!');
    }
    return alert('Не изображение!')
  };

  const Img = () => uploadedImage && (
    <>
      <Box>
        <img
          src={`${cfg.backendURL}${uploadedImage.url}`}
          alt={uploadedImage.name}
          loading="lazy"
          width="35%"

        />
      </Box>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ marginTop: 6}}
        onClick={() => navigator.clipboard.writeText(`${cfg.backendURL}${uploadedImage.url}`)}
      >
        Скопипировать
      </Button>
    </>
  )

  const FileUpload = () => (
    <>
      <Dropzone onDrop={handleChange}>
        {({ getRootProps, getInputProps, isDragAccept }) => (
          <section className="container">
            {uploadedImage ? <Img /> : (
              <div {...getRootProps({ className: `dropzone-div ${isDragAccept ? 'isDragFocuced' : ''}` })}>
                <input {...getInputProps()} accept="image/*" />
                <IconButton>
                  <FileUploadIcon style={{ fontSize: 180, color: !isDragAccept ? grey[500] : '#0275d8' }} />
                </IconButton>
              </div>)}
          </section>
        )}
      </Dropzone>
    </>
  )

  return (
    <FileUpload />
  )
}

export default DZ;