import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import getLocal from '../services/AdminProfileService';

import './Admin.css';

function AdminProfile() {
  const history = useHistory();
  const [nameLocal, setNameLocal] = useState('');
  const [emailLocal, setEmailLocal] = useState('');
  const [existsLocal, setExistsLocal] = useState(false);

  useEffect(() => {
    getLocal({ setNameLocal, setEmailLocal, history, setExistsLocal });
  }, []);

  return (
    !existsLocal
      ? <div>Loading</div>
      : (
        <div className="div-main">
          <SideBarAdmin />
          <div className="div-filha">
            <h1 className="title">Perfil</h1>
            <p data-testid="profile-name">{`Nome: ${nameLocal}`}</p>
            <p data-testid="profile-email">{`Email: ${emailLocal}`}</p>
          </div>
        </div>
      )
  );
}

export default AdminProfile;
