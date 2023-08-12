import React, { useEffect, useRef, memo } from 'react';

import SwipeableViews from 'react-swipeable-views';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import styles from './Chat.module.scss';

const Chat = memo(({
  index,
  messages,
  message,
  openConversation,
  onSearchChange,
  conversations,
  openedChat,
  openedChatMember,
  searchString,
  searchNames,
  startConversation,
  sendMessage,
  userId,
  goBackToChatList,
  onMessageChange,
}) => {
  const messagesContainer = useRef(null);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({
        left: 0,
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        {index ? openedChatMember?.name : 'Inbox'}
        {index === 1 && (
          <ArrowBackIosIcon
            className={styles.arrowBackward}
            onClick={goBackToChatList}
          />
        )}
      </div>
      <SwipeableViews
        index={index}
        style={{ height: '100%' }}
        containerStyle={{ height: '100%' }}
      >
        <div className={styles.searchWrapper}>
          <input
            placeholder="Search..."
            value={searchString}
            className={styles.search}
            onChange={onSearchChange}
          />
          {conversations && conversations?.length ? (
            <div className={styles.nameList}>
              {conversations.map((conversation) => {
                const { name, profileImage } = conversation.participants.find(
                  (participant) => participant._id !== userId,
                );
                return (
                  <div
                    onClick={() => openConversation(conversation._id)}
                    onKeyPress={() => openConversation(conversation._id)}
                    role="button"
                    tabIndex="-1"
                  >
                    <img
                      src={profileImage}
                      alt=""
                      className={styles.searchImage}
                    />
                    <div className={styles.searchName}>{name}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            !searchNames?.length && (
              <div className={styles.noConversationWrapper}>
                Sorry, you have not got any conversation yet.
              </div>
            )
          )}
          {searchNames && (
            <div className={styles.nameList}>
              {conversations && conversations.length > 0 && (
                <h5 className={styles.searchNamesHeader}>More People</h5>
              )}
              {searchNames.map(({ name, _id, profileImage }) => (
                <div
                  onClick={() => startConversation(_id)}
                  onKeyPress={() => startConversation(_id)}
                  role="button"
                  tabIndex="-1"
                >
                  <img
                    src={profileImage}
                    alt=""
                    className={styles.searchImage}
                  />
                  <div className={styles.searchName}>{name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.chatWrapper}>
          <div className={styles.chatMessages} ref={messagesContainer}>
            {openedChat
              && messages.map(({ text, sentBy }) => (
                <div
                  className={`${styles.chatMessage} ${
                    sentBy === userId ? styles.ownMessage : styles.notOwnMessage
                  }`}
                >
                  {text}
                </div>
              ))}
          </div>
          <div className={styles.chatTextField}>
            <form onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Write here...."
                value={message}
                onChange={onMessageChange}
              />
            </form>
          </div>
        </div>
      </SwipeableViews>
    </div>
  );
});

export default Chat;
