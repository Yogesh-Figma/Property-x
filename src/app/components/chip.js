"use client";

import Image from 'next/image';
import crossIcon from '@/app/icons/cross_icon.svg'



const style = {
    div: {
        borderRadius: "8px",
        border: "0.5px solid #C7C7C7",
        display: "inline-flex",
        maxWidth: "100px",
        alignItems: "center",
        verticalAlign: "middle",
        padding: "0px 10px"
    }
}

const Chip = ({ label, className, onClick, showCrossIcon, handleCross }) =>
    <div className={`chip ${className}`} onClick={onClick}>
        <style jsx global>{`
          .chip {
            border-radius: 35px;
            border: 0.5px solid #C7C7C7;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            padding: 2px 10px;
          }
          .chip-end-icon {
            margin-left:6px;
            cursor:pointer;
          }`}
        </style>
        <span>{label}</span>
        {!!showCrossIcon && <Image className="chip-end-icon" src={crossIcon} width={7} height={7} onClick={handleCross}/>}
    </div>

export default Chip;