import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TopBar from '../components/SideBarClient/TopBar';
import { getLocal, sendNewName } from '../services/ClientProfileService';
import InputProfile from '../services/InputProfile';

import './ClientProfile.css';

function ClientProfile() {
  const history = useHistory();
  const [disableButton, setDisableButton] = useState(true);
  const [editedName, setEditedName] = useState('');
  const [nameLocal, setNameLocal] = useState('');
  const [emailLocal, setEmailLocal] = useState('');
  const [existsLocal, setExistsLocal] = useState(false);

  useEffect(() => {
    getLocal({ setEditedName, setNameLocal, setEmailLocal, setExistsLocal, history });
  }, []);

  useEffect(() => {
    if (editedName !== nameLocal) setDisableButton(false);
    else setDisableButton(true);
  }, [editedName]);

  function handleChangeName(event) { setEditedName(event.target.value); }

  return (
    <div id="div-profile">
      <TopBar title="Meu perfil" />
      {existsLocal === true
        ? (
          <form className="formClientProfile">
            <InputProfile
              title="Name"
              id="profile-name-input"
              type="text"
              value={ editedName }
              callback={ (e) => handleChangeName(e) }
            />
            <br />
            <label htmlFor="profile-email-input">
              Email
              <br />
              <input
                type="email"
                data-testid="profile-email-input"
                value={ emailLocal }
                readOnly
              />
            </label>
            <br />
            <button
              className="buttonUpdate"
              type="button"
              data-testid="profile-save-btn"
              disabled={ disableButton }
              onClick={ () => sendNewName(editedName, emailLocal) }
            >
              Salvar
            </button>
          </form>
        ) : null}
    </div>
  );
}

export default ClientProfile;
