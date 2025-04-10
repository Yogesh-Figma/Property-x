import React, { useState } from 'react';
import AddNewLead from '../crm/NewLeads/AddNewLead';
import apiServiceInstance from '../../Api/ApiService';
import AreyouSureDelete from '../pages/AreyouSureDelete';

const DetailCard2 = ({LeadId ,calling, duplicate,onUpdate}) => { 
      const [isLeadupdateVisible , setLeadupdateVisible] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = async () => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async (confirm) => {
        const isDelete = true;
        if (confirm) {
          try {
            let response;
            if (calling) {
              response = await apiServiceInstance.deleteCallingLeads(LeadId);
            } else if (duplicate) {
              response = await apiServiceInstance.deleteDuplicateLeads(LeadId, isDelete);
            } else {
              response = await apiServiceInstance.deleteLeads(LeadId, isDelete);
            }
            console.log("Delete response:", response);
            onUpdate();
          }
          catch (error) { 
            console.error("Error deleting lead:", error);
          }
        }
        setIsDeleteModalOpen(false);
      };
      const handleLeadUpdate =() =>{
        setLeadupdateVisible(true);
      }
      const handleCloseLeadUpdate =()=>{
        setLeadupdateVisible(false);
      }
  return (
    <div
    className="absolute flex flex-col bg-white shadow-lg rounded-md py-2 z-50 "
    style={{ width: '5.3rem',marginRight:'12px' , marginTop: '2rem', gap:'12px', marginLeft: '-86px'}}
  >     {!calling && <button className="text-gray-700 text-left hover:text-gray-900 transition-colors ml-2 font-semibold " onClick={handleLeadUpdate}>
        Edit
      </button>}
    {/* { !calling && <button className="text-gray-700 text-left hover:text-gray-900 transition-colors ml-2 font-semibold">
        Update
      </button>} */}
      <button className="text-red-600 text-left hover:text-red-700 transition-colors ml-2 font-semibold" onClick={handleDelete}>
        Delete
      </button>
      {isLeadupdateVisible && (
        <AddNewLead 
        leadId={LeadId}
        isVisible={isLeadupdateVisible}
        onClose={handleCloseLeadUpdate}
        duplicate={duplicate}
        refreshLeads={onUpdate}
        update={true}
        calldata={calling}
        />
      )}
      {isDeleteModalOpen && (
        <AreyouSureDelete 
        isOpen={isDeleteModalOpen}
        onClose={() => handleConfirmDelete(false)}
        onConfirm={() => handleConfirmDelete(true)}
        />
      )}
    </div>
  );
};

export default DetailCard2;