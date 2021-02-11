
import * as React from 'react';

export interface FileUploadProps {
    setImage: (image: HTMLImageElement) => void;
}

const FileUpload = (props: FileUploadProps): JSX.Element => {
    const imageLoaded = (event: React.ChangeEvent) => {
        const urlCreator = window.URL || window.webkitURL;
        const uploadedFile = (event.target as HTMLInputElement).files[0];
        const image = new Image();
        image.onload = () => {
            props.setImage(image);
        };
        image.src = urlCreator.createObjectURL(uploadedFile);
    };
    return (<input type="file" onChange={imageLoaded} />);
};

export default FileUpload;