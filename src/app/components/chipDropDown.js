'use client'
import {useEffect, useRef, useState} from 'react';
import Chip from '@/app/components/chip';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const ChipDropDown = ({ value, handleChange, values, label, name, className }) => {
    const [dropDownEnabled, enableDropDown] = useState(false)
    const ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          enableDropDown(false);
        }
      };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, []);

    return (
        <div ref={ref} className={`drop-down position-relative d-inline-flex ${className}`} onClick={()=>enableDropDown(true)}>
            <div className='label'>{label} {dropDownEnabled? <KeyboardArrowUp sx={{   }}/>:<KeyboardArrowDown sx={{  }}/>}</div>
            <div className={`drop-down-list position-absolute ${dropDownEnabled ? '':'d-none'}`}>
                {values.map((item, index) => <Chip key={index} label={item.label} className={`chip-drop-down-item ${value.has(item.value) ? "selected":""}`} onClick={() => handleChange(name, item.value)} />)}
            </div>          
        </div>
    )
}

export default ChipDropDown;