import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoReply } from 'react-icons/go';
import PropTypes from 'prop-types';
import { getRoomMessages } from '../services/api';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import AdminFormMessage from '../components/Chat/AdminFormMessage';
import MessageBox from '../components/Chat/MessageBox';
import socket from '../utils/socketClient';

function AdminChat(props) {
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const { location: { state: roomName } } = props;

  useEffect(() => {
    console.log('Prop com email do cliente', roomName);
    getRoomMessages(roomName)
      .then((result) => {
        setMessages(result.messages);
        setLoadingHistory(false);
      });
  }, []);

  useEffect(() => {
    socket.emit('connectRoom', roomName);

    socket.on('chat.receiveMessage', (newData) => {
      setMessages([...messages, newData]);
    });
  }, [messages]);

  return (
    <div className="div-main">
      <SideBarAdmin />
      <div className="div-filha">
        <button
          type="button"
          data-testid="back-button"
          onClick={ () => history.push('/admin/chats') }
        >
          <GoReply size={ 20 } />
        </button>
        <h1>{ `Conversando com ${roomName}`}</h1>
        {
          loadingHistory
            ? <div />
            : (
              messages.map(({ message, nickname, sentAt }, index) => (
                <MessageBox
                  key={ index }
                  message={ message }
                  nickname={ nickname }
                  sentAt={ sentAt }
                />
              ))
            )
        }
        <AdminFormMessage
          roomName={ roomName }
        />
      </div>
    </div>
  );
}

AdminChat.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default AdminChat;
