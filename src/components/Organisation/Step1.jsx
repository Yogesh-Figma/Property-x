import React from 'react';

const Step1 = ({ formData, setFormData }) => {
  return (
    <div className='Oragnization-profile'>
      <div className='frame'>
        <div className='OragnizationProfile-img'>
          <div className='profile-img-2'>
            <div className='photo-div'>
              <div className='centre-div'>
                <img src={require('../../images/profile.png')} alt="ProfileImage" className="profile-img3" />
                <img src={require('../../images/AddPhoto.png')} alt="SmallProfileImage" className="small-img" />
                <input
                  type="file"
                  className="upload-input"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
                />
              </div>
            </div>
            <div className='profile-text'>
              <p className='grey-text'>Allowed Format</p>
              <p>JPG, JPEG, and PNG</p>
              <br />
              <p className='grey-text'>Max file size</p>
              <p>2MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className='owner-details'>
        <h8 className='owner-heading'>Owner Details</h8>
          <div className='Org-form' style={{ display: 'flex' }}>
            <div className='form-group'>
              <label>Name</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.OwnerName}
                onChange={(e) => setFormData({ ...formData, OwnerName: e.target.value })}
              />
            </div>
             <div className='form-group'>
            <label>Email</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.ownerEmail}
              onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, ownerAddress: e.target.value })}
              />
            </div>
          <div className='form-group'>
            <label>Contact Number</label>
            <input
              type="text"
              className="form-control custom-input"
              value={formData.ownerPhone}
              onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, ownerPan: e.target.value })}
              />
            </div>
            <div className='form-group'>
              <label>Aadhar Card Number</label>
              <input
                type="text"
                className="form-control custom-input"
                value={formData.ownerAadhar}
                onChange={(e) => setFormData({ ...formData, ownerAadhar: e.target.value })}
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Step1;
