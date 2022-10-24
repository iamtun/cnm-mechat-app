import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";

export const messageListSelector = (state) => state.messages.data;
export const messageLoadingSelector = (state) => state.messages.loading;

export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;
export const userInfoSelector = (state) => state.info.data;
export const userInfoByPhoneSelector = (state) => state.userInfoByPhone;
export const userIdSelector = (state) => state.info.userId;

export const friendListSelector = (state) => state.friends.data;
export const friendIdSelector = (state) => state.friends.friendId;

export const conversationsListSelector = (state) => state.conversations.data;

/**
 * get friend list then user info changed
 */
export const getFriendsByUserSelector = createSelector(
  userInfoSelector,
  userListSelector,
  (user, users) => {
    if (users && user?.friends) {
      const friends = users.filter((_user) => user.friends.includes(_user._id));
      return friends;
    }
    return null;
  }
);

/**
 * user searching to get friend list
 */
export const usersRemainingSelector = createSelector(
  userListSelector,
  getFriendsByUserSelector,
  userInfoSelector,
  searchTextSelector,
  (users, friends, user, search) => {
    if (search != null) {
      if (search.startsWith("0")) {
        const usersFilter = users.filter(
          (_user) =>
            _user.phoneNumber === search &&
            _user.phoneNumber !== user.phoneNumber
        );

        const friendFilter = friends.filter(
          (friend) => friend.phoneNumber === search
        );

        if (friendFilter.length > 0) {
          return friendFilter.map((friend) => ({
            ...friend,
            isFriend: true,
          }));
        } else if (usersFilter.length > 0) {
          return usersFilter.map((user) => ({
            ...user,
            isFriend: false,
          }));
        }
        //don't find
        if (!usersFilter.length) {
          return 1;
        }

        //Cái này check bắt đầu từ A-Z (sau sửa lại cho giống người Việt)
      } else if (search.match("^[A-Z]")) {
        const friendFilter = friends.filter((friend) =>
          friend.fullName.includes(search)
        );
        //don't find
        if (!friendFilter.length) {
          return 1;
        }

        return friendFilter.map((user) => ({
          _id: user._id,
          fullName: user.fullName,
          avatarLink: user.avatarLink,
          backgroundLink: user.backgroundLink,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          isFriend: true,
        }));
      } else {
        return 1;
      }
    }

    return false;
  }
);

/**
 * get user info then click item search your friend
 */
export const searchItemClickSelector = createSelector(
  userIdSelector,
  usersRemainingSelector,
  (id, users) => {
    const userInfo = users.filter((user) => user._id === id);
    return userInfo[0];
  }
);

/**
 * get conversation by id
 */
export const getConversationIdByIdFriendSelector = createSelector(
  friendIdSelector,
  conversationsListSelector,
  (friendId, conversations) => {
    const conversation = conversations.filter(
      (_conversation) =>
        _conversation.members.length === 2 &&
        _conversation.members.includes(friendId)
    );

    if (conversation.length > 0) {
      return conversation[0].id;
    }
    return 0;
  }
);

export const getMessageByIdConversationSelector = createSelector(
    userListSelector,
    messageListSelector,
    (users, messages) => {
        try{
            const _messages = messages.map((message) => {
                const user = users.filter((_user) => _user._id === message.senderID)[0];
    
                return {
                    _id: message._id,
                    action: message.action ? message.action : null,
                    content: message.action ? null : message.content,
                    imageLink: message.imageLink,
                    fileLink: message.fileLink?.replaceAll('%20', ' '),
                    createdAt: message.action
                        ? moment(message.createdAt).format('DD/MM/YYYY hh:mm')
                        : moment(message.createdAt).format('hh:mm'),
                    user: {
                        id: user._id,
                        name: message.action ? null : user.fullName,
                        avatar: message.action ? null : user.avatarLink,
                    },
                };
            });
    
            return _messages.slice(-10);
            //return _messages;
        }catch(err) {
            console.log('get message ', err);
        } 
    },
);

export const getUserByPhoneNumber = createSelector(
  userListSelector,
  getFriendsByUserSelector,
  searchTextSelector,
  (users, friends, search) => {
    if (search) {
      if (search.startsWith("0")) {
        const usersFilter = users.filter(
          (_user) => _user.phoneNumber === search
        );

        const friendFilter = friends.filter(
          (friend) => friend.phoneNumber === search
        );

        if (friendFilter.length > 0) {
          return friendFilter.map((friend) => ({
            ...friend,
            isFriend: true,
          }));
        } else if (usersFilter.length > 0) {
          return usersFilter.map((user) => ({
            ...user,
            isFriend: false,
          }));
        }
        //don't find
        if (!usersFilter.length) {
          return 1;
        }
      } else {
        return 1;
      }
    }
    return false;
  }
);

export const getUserRegister = createSelector(
  userListSelector,
  searchTextSelector,
   (users, search) => {
    console.log("search", search);

    if (search) {
      if (search.startsWith("0")) {
        const usersFilter = users.filter(
          (_user) => _user.phoneNumber === search
        );

        //don't find
        if (!usersFilter.length) {
          return 1;
        }

        return usersFilter;
      } else {
        return 1;
      }
    }
    return false;
  }
);
