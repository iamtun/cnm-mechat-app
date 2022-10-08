import { createSelector } from "@reduxjs/toolkit";

export const messageListSelector = (state) => state.messages.data;
export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;
export const userInfoSelector = (state) => state.info.data;
export const userIdSelector = (state) => state.info.userId;
export const friendListSelector = (state) => state.friends.data;
export const conversationsListSelector = (state) => state.conversations.data;

//Load data success!
export const usersRemainingSelector = createSelector(
  userListSelector,
  friendListSelector,
  userInfoSelector,
  searchTextSelector,
  (users, friends, user, search) => {
    if (search) {
      if (search.startsWith("0")) {
        const usersFilter = users.filter(
          (_user) =>
            _user.phoneNumber === search &&
            _user.phoneNumber !== user.phoneNumber
        );

        //don't find
        if (!usersFilter.length) {
          return 1;
        }
        return usersFilter.map((user) => ({
          _id: user._id,
          fullName: user.fullName,
          avatar: user.avatarLink,
          phoneNumber: user.phoneNumber,
          isFriend: false,
        }));
        //Cái này check bắt đầu từ A-Z (sau sửa lại cho giống người Việt)
      } else if (search.match("^[A-Z]")) {
        const friendFilter = friends.filter((friend) =>
          friend.fullName.includes(search)
        );
        if (!friendFilter.length) {
          return 1;
        }

        //don't find
        return friendFilter.map((user) => ({
          _id: user._id,
          fullName: user.fullName,
          avatar: user.avatarLink,
          phoneNumber: user.phoneNumber,
          isFriend: true,
        }));
      } else {
        return 1;
      }
    }

    return false;
  }
);

export const searchItemClickSelector = createSelector(
  userIdSelector,
  userListSelector,
  (id, users) => {
    const userInfo = users.filter((user) => user._id === id);
    return userInfo[0];
  }
);
