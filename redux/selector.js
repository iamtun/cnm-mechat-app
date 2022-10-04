import { createSelector } from '@reduxjs/toolkit';

export const messageListSelector = (state) => state.messages.data;
export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;
export const userInfoSelector = (state) => state.info.data;

//Load data success!
export const usersRemainingSelector = createSelector(userListSelector, searchTextSelector, (users, search) => {
    if(search) {
        const usersFilter = users.filter((user) => user.fullName.includes(search));
        return usersFilter.map((user) => {
            return {
                _id: user._id,
                fullName: user.fullName,
                avatar: user.avatarLink,
                phoneNumber: user.phoneNumber
            };
        });
    }

    return false;
});
