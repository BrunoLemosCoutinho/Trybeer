import React, { useEffect, useState } from 'react';
import { getRoomMessages } from '../services/api';
import TopBar from '../components/SideBarClient/TopBar';
import FormMessage from '../components/Chat/FormMessage';
import MessageBox from '../components/Chat/MessageBox';
import socket from '../utils/socketClient';

function UserChat() {
  const [messages, setMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const roomName = user.email;
    getRoomMessages(roomName)
      .then((result) => {
        setMessages(result.messages);
        setLoadingHistory(false);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const roomName = user.email;
    socket.emit('connectRoom', roomName);

    socket.on('chat.receiveMessage', (newData) => {
      setMessages([...messages, newData]);
    });
  }, [messages]);

  return (
    <div>
      <TopBar title="TryBeer" />
      <h1>Chat com vendedor</h1>
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
      <FormMessage />
    </div>
  );
}

export default UserChat;
