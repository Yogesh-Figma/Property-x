"use client"

import * as React from 'react';
import { Accordion as MuiAccordion} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./styles.scss"

export default function Accordion({ title, summary, className = ""}) {
  return (
      <MuiAccordion className={`accordion ${className}`} square={false} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className='title'>{title}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='summary'>
            {summary}
          </div>
        </AccordionDetails>
      </MuiAccordion>
  );
}
