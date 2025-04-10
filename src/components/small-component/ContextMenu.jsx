import React from 'react';
import UserDropdown from '../crm/NewLeads/UserDropdown';
import Closebutton from '../../images/close.png'


const ContextMenu = ({ selectedLeads, onDeleteButtonClick, duplicate , onClose ,leadreport, refreshpage , Callingdata }) => {
  // if (!selectedLeads || selectedLeads.length === 0) {
  //   return null;
  // }
  console.log(selectedLeads,"enter");
  return (
<div className="fixed top-13 left-[250px]  flex items-center justify-between bg-gray-200 px-4 py-2 rounded-md shadow-md z-50">
<div className="flex items-center space-x-4">
        <span className="text-gray-600 text-sm font-medium">{selectedLeads.length||0} Items Selected</span>
        <button className="text-red-500 text-sm hover:underline focus:outline-none">Unselect all</button>
      </div>

      <div className="flex items-center space-x-4 ml-2">
          <UserDropdown data={selectedLeads} duplicateLead={duplicate} refreshpage={refreshpage} onClose={onClose} Callingdata={Callingdata}/>
          <div className="w-px h-6 bg-gray-300 mx-2" />
         {/* { !leadreport &&selectedLeads.length === 1 && <button
            onClick={onDeleteButtonClick}
            className="flex items-center space-x-2 text-red-600 text-sm font-medium hover:text-red-700 focus:outline-none"
          >
            <span>Delete</span>
          </button>} */}
        <img src={Closebutton} onClick={onClose} className='cursor-pointer'/>
      </div>
    </div>
  );
};

export default ContextMenu;
