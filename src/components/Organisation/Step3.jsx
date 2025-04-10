import React from 'react'

const Step3 = ({ formData, setFormData }) => {

  return (  
      <div className='Credentials'>
     <h8>Credentials</h8>
      
        <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
            <label>PAN Card Number</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.ownerPan}
              onChange={(e) => setFormData({ ...formData, ownerPan: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label>Upload PAN Card</label>
            <div className='form-control custom-input'>
              <input
                type="file"
                id="imageUpload"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setFormData({ ...formData, panPhoto: e.target.files[0] })}
              />
              <img src={require('../../images/cloud.png')} alt='cloud' className='cloud' />
            </div>
          </div>
        </div>
      
     
        <div className='Org-form' style={{ display: 'flex' }}>
          <div className='form-group'>
            <label>Aadhar Card Number</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.ownerAadhar}
              onChange={(e) => setFormData({ ...formData, ownerAadhar: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label>Upload Aadhar Card</label>
            <div className='form-control custom-input'>
              <input
                type="file"
                id="imageUpload"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setFormData({ ...formData, aadharPhoto: e.target.files[0] })}
              />
              <img src={require('../../images/cloud.png')} alt='cloud' className='cloud' />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Step3
