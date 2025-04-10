import React from 'react'

const Step4 = ({    formData, setFormData }) => {

  return (
      <div className='preview'>
      <div className='sineup'>
        <h5>Owner Details</h5>
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label>Name</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.OwnerName}
                readOnly
              />

            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerEmail}
                readOnly
              />
            </div>
          </div>
        
      
          <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
              <label>Address</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerAddress}
                readOnly
              />
            </div>

            <div className='form-group'>
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerPhone}
                readOnly
              />
            </div>
          </div>
       
        
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label>Pan Card Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerPan}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Aadhar Card Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerAadhar}
                readOnly
              />
            </div>
          </div>
       
        <h5>Organization details</h5>
        
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label> Name</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.name}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Legal Name</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.legalName}
                readOnly
              />
            </div>
          </div>
        
        
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label> Email</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.email}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.contactNumber}
                readOnly
              />
            </div>
          </div>
        
        
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label>Organization Logo</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.orgLogo}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Alternate Contact Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.alternateNumber}
                readOnly
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
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Pincode</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.pincode}
                readOnly
              />
            </div>
          </div>
        
        <h5>Credentials</h5>
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label>PAN Card Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerPan}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Upload PAN Card</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.panPhoto}
                readOnly
              />
            </div>
          </div>
        
        
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label>Aadhar Card Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.Pincode}
                readOnly
              />
            </div>
            <div className='form-group'>
              <label>Upload Aadhar Card </label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.aadharPhoto}
                readOnly
              />
            </div>
          </div>
      
        
      </div>
      
    </div>
  )
}

export default Step4;
