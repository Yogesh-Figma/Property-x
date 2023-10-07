import React from "react";
import { styled } from '@mui/material/styles';
const KILO_BYTES_PER_BYTE = 1000;
import DeleteIcon from '@mui/icons-material/Delete';


function isVideo(file) {
  return file.type.match('video.*')
}

const convertBytesToKB = (bytes) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

// ImageList Component//
const FilePreviewGrid = ({ files, removeFile }) => {
  // Return the list of files//
  const filesData = Object.keys(files);
  return (
    filesData.length != 0 && <section className={`file-list d-flex`}>{
      filesData.map((fileName, index) => {
        let file = files[fileName];
        let isImageFile = file.type.split("/")[0] === "image";
        return (<div className="preview-container position-relative">
          {isImageFile ? (
            <img
              src={URL.createObjectURL(file)}
              alt={`file preview ${index}`}
            />
          ): isVideo ? <video src={URL.createObjectURL(file)} /> :
          <div className="file-preview-container" isImageFile={isImageFile}>
            <span>{file.name}</span>
            <aside>
              <span>{convertBytesToKB(file.size)} kb</span>
            </aside>
          </div>}
          <div className="delete-icon position-absolute align-items-center justify-content-center" onClick={(event) => { event.stopPropagation(); removeFile(fileName)}}>
                <DeleteIcon className="fas fa-trash-alt" />
              </div>
        </div>)
      })
    }</section>
  );
};

export default FilePreviewGrid;