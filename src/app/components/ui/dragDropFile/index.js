"use client"
import "./styles.scss"
import React from 'react';
import Button from "@/app/components/button";
import UploadFileIcon from "@/app/icons/upload.svg"
import FilePreviewGrid from "./filePreviewGrid";


const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000000; // 50 mb

export const SUPPORTED_FILE_TYPE = {
    "video": "video/*",
    "image": "image/*",
    "file": "*"
}

const getFileType = (file) => {
    if (file.type.match('video.*')) return SUPPORTED_FILE_TYPE.video;
    if (file.type.match('image.*')) return SUPPORTED_FILE_TYPE.image;
    return SUPPORTED_FILE_TYPE.file;
}

function DragDropFile({ uploadText, name, updateFilesCb, multiple, supportedFileTypes = [Object.values(SUPPORTED_FILE_TYPE)], maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES, ...otherProps }) {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [files, setFiles] = React.useState({});

    const convertNestedObjectToArray = (nestedObj) =>
        Object.keys(nestedObj).map((key) => nestedObj[key]);

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };
    // ref
    const inputRef = React.useRef(null);

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes && supportedFileTypes.some(item => item == getFileType(file))) {
                if (!multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleNewFileUpload({target:{files:e.dataTransfer.files}})
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleNewFileUpload(e)
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    let uploadedFileLength = Object.keys(files).length;
    return (
        <div className="file-upload-form">
            <form className="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={multiple} onChange={handleChange} accept={supportedFileTypes.join(",")} />
                <label htmlFor="input-file-upload" className={"label-file-upload " + (dragActive ? "drag-active" : "")}>
                    <div>
                        {uploadText ? <div className="upload-text text-left">{uploadText}</div> : <>
                            <UploadFileIcon />
                            <div>Drag and Drop Files here</div>
                            <div>-OR-</div>
                        </>}
                        {multiple ?
                         <Button className="upload-button" rounded={true} height={48} text={"Browse Files"} onClick={onButtonClick} /> :
                        <div className="d-flex align-items-center single-file-upload">
                            <Button className="upload-button" rounded={true} height={48} text={uploadedFileLength ? "Replace File":"Choose File"} onClick={onButtonClick} />
                            {uploadedFileLength  ? <FilePreviewGrid removeFile={removeFile} files={files} /> : <span>No File Chosen</span>}
                            </div>}
                    </div>
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </form>
            {multiple && <FilePreviewGrid removeFile={removeFile} files={files} />}
        </div>
    );
};


export default DragDropFile;