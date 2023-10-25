"use client";

import Image from 'next/image';
import crossIcon from '@/app/icons/cross_icon.svg?url'
import "./styles.scss"

const colors = ["#ECE5C7","#CDF0EA","#EEE","#FFEEF4","#FEFBE7","#F7D3BA","#D2E9E9","#F5F1DA","#E1ECC8", "#CCFFEC"]

const Chip = ({ label, className, onClick, showCrossIcon, handleCross, variant }) => {
  const randomColor = colors[Math.floor(Math.random() * 10)];
  return (
    <div className={`chip ${className}`} onClick={onClick} style={variant == 'randomColor' ? { backgroundColor:randomColor}:{border: "0.5px solid #C7C7C7"}}>
      <span>{label}</span>
      {!!showCrossIcon && <Image className="chip-end-icon cursor-pointer" src={crossIcon} width={7} height={7} onClick={handleCross} />}
    </div>)
}
export default Chip;