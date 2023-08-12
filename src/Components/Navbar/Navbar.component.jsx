import React, { memo } from 'react';

import { Link } from 'react-router-dom';

import ClickAwayListener from 'react-click-away-listener';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SearchIcon from '@material-ui/icons/Search';
import { Badge, Container } from '..';
import styles from './Navbar.module.scss';

const Navbar = memo(
  ({
    user: { _id, profileImage },
    searchNames,
    showNames,
    notifications,
    unseenNotificationCount,
    showNotifications,
    logout,
    handleNotificationClick,
    showNamesList,
    removeSearchResults,
    onSearchChange,
    unshowNotifications,
    navigateToProfilePage,
    navigateToPostPage,
  }) => (
    <div className={styles.navbar}>
      <Container classes={{ container: styles.navWrapper }}>
        <div>
          <h2>
            <Link to="/timeline" className={styles.header}>
              Study.io
            </Link>
          </h2>
          <ClickAwayListener onClickAway={removeSearchResults}>
            <div className={styles.searchWrapper}>
              <SearchIcon className={styles.icon} />
              <input
                placeholder="Search..."
                className={styles.search}
                onChange={onSearchChange}
                onFocus={showNamesList}
              />
              {searchNames && showNames && (
                <div className={styles.nameList}>
                  {searchNames.map(
                    ({ name, _id: userId, profileImage: profileImageName }) => (
                      <div
                        onClick={() => {
                          removeSearchResults();
                          navigateToProfilePage(userId);
                        }}
                        onKeyPress={() => {
                          removeSearchResults();
                          navigateToProfilePage(userId);
                        }}
                        role="button"
                        tabIndex="-1"
                      >
                        <img
                          src={profileImageName}
                          alt=""
                          className={styles.searchImage}
                        />
                        <div className={styles.searchName}>{name}</div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </ClickAwayListener>
        </div>
        <div className={styles.menu}>
          <div>
            <Link to="/timeline">
              <HomeIcon className={styles.icon} />
              {' '}
            </Link>
          </div>
          <div>
            <Link to={`/profile/${_id}`}>
              <img src={profileImage} alt="" className={styles.profileImage} />
            </Link>
          </div>
          <ClickAwayListener onClickAway={() => unshowNotifications()}>
            <div className={styles.notificationWrapper}>
              <Badge number={unseenNotificationCount} color="danger">
                <NotificationsIcon
                  onClick={handleNotificationClick}
                  className={styles.icon}
                />
              </Badge>
              {notifications && showNotifications && (
                <div className={styles.notificationsList}>
                  {notifications.length === 0
                    ? (
                      <p className={styles.noNotif}>
                        Sorry, there are no notifications to show
                      </p>
                    ) : notifications.map(
                      ({
                        message,
                        profileImage: profileImageName,
                        action,
                        doerId,
                        postId,
                      }) => (
                        <div
                          className={styles.notificationItem}
                          onClick={() => {
                            unshowNotifications();
                            action === 'followed'
                              ? navigateToProfilePage(doerId)
                              : navigateToPostPage(postId);
                          }}
                          onKeyPress={() => {
                            unshowNotifications();
                            action === 'followed'
                              ? navigateToProfilePage(doerId)
                              : navigateToPostPage(postId);
                          }}
                          role="button"
                          tabIndex="-1"
                        >
                          <img
                            src={profileImageName}
                            alt=""
                            className={styles.profileImage}
                          />
                          <div className={styles.notificationMessage}>
                            {message}
                          </div>
                        </div>
                      ),
                    )}
                </div>
              )}
            </div>
          </ClickAwayListener>
          <div>
            <ExitToAppIcon className={styles.icon} onClick={logout} />
          </div>
          {' '}
        </div>
      </Container>
    </div>
  ),
);

export default Navbar;
