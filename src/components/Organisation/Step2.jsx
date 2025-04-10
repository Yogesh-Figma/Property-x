import React from 'react'

const Step2 = ({ formData, setFormData }) => {
  return (
    <div className='Organization-deatails'>
     <h8>Organization Details</h8>
        <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
            <label>Name</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label>Legal Name</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.legalName}
              onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
            />
          </div>
        </div>
      
        <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label>Contact Number</label>
            <input 
               type="text"
               className="form-control custom-input"
               value={formData.contactNumber}
               onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} />
          </div>
        </div>
      
     
        <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
            <label>Organization Logo</label>
            <div className='form-control custom-input'>
              <input
                type="file"
                id="imageUpload"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setFormData({ ...formData, orgLogo: e.target.files[0] })}
              />  
              <img src={require('../../images/cloud.png')} alt='cloud' className='cloud' />
            </div>
          </div>
          <div className='form-group'>
            <label>Alternate Contact Number</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.altContactNumber}
              onChange={(e) => setFormData({ ...formData,  alternateNumber: e.target.value })}
            />
          </div>
        </div>
      
      
        <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
            <label>Address</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label>Pincode</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
          </div>
        </div>
    </div>
  )
}

export default Step2
