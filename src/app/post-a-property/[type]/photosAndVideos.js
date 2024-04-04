import React from 'react'
import Heading from '@/app/components/heading';
import DragDropFile, {SUPPORTED_FILE_TYPE} from '@/app/components/ui/dragDropFile';
import Button from "@/app/components/button";
import Image from 'next/image';

export default ({ formData, handleChange, changeStep, setImages, images }) => {

    const handleNext = () => {
        changeStep(2);
    }

    return <div className="photo-and-video-cnt">
        <Heading label={"Upload Photos and Videos"}/>
        <div className='d-flex mt-4'>
            <div className='upload-container'>
                <DragDropFile files={images} updateFilesCb={setImages} supportedFileTypes={[SUPPORTED_FILE_TYPE.image, SUPPORTED_FILE_TYPE.video]} multiple={true}/>
            </div>
            <Image alt="undraw building" className='undraw-building d-none d-lg-inline-block' src={"/undrawUpload.svg"} width={304} height={258} />
        </div>
        <div className='d-flex justify-content-end'>
            <Button className="next-button" rounded={true} height={48} text={"Next"} onClick={handleNext} />
        </div>
    </div>
}