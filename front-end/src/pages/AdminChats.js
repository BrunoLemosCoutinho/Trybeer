import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChatCard from '../components/Chat/ChatCard';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import { getAllChats } from '../services/api';

function AdminChats() {
  const [messagesList, setMessagesList] = useState([]);
  useEffect(() => {
    getAllChats()
      .then((result) => setMessagesList(result));
  }, []);
  return (
    <div className="div-main">
      <SideBarAdmin />
      <div className="div-filha">
        <h1 className="title">Conversas</h1>
        {
          messagesList.length !== 0
            ? messagesList.map(({ chatRoom, messages }, index) => (
              <Link
                key={ index }
                to={ { pathname: '/admin/chat', state: chatRoom } }
              >
                <ChatCard
                  key={ index }
                  chatRoom={ chatRoom }
                  messages={ messages }
                />
              </Link>
            ))
            : <div data-testid="text-for-no-conversation">Nenhuma conversa por aqui</div>
        }
      </div>
    </div>
  );
}

export default AdminChats;
