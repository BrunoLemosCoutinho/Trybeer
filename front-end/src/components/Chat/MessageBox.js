import React from 'react';
import PropTypes from 'prop-types';

function MessageBox({ message, nickname, sentAt }) {
  return (
    <div>
      <div>
        <span data-testid="nickname">{ nickname }</span>
        <span data-testid="message-time">{ sentAt }</span>
      </div>
      <p data-testid="text-message">{ message }</p>
    </div>
  );
}

MessageBox.propTypes = {
  nickname: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
};

export default MessageBox;
