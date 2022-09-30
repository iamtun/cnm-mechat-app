import { createSelector } from '@reduxjs/toolkit';

export const messageListSelector = (state) => state.messages.data;
export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;

export const usersRemainingSelector = createSelector(userListSelector, searchTextSelector, (users, search) => {
    if(search) {
        const usersFilter = users.filter((user) => user.fullName.includes(search));
        return usersFilter.map((user) => {
            //console.log(user);
            return {
                _id: user._id,
                fullName: user.fullName,
                avatar: "https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg",
                phoneNumber: "0343220597"
            };
        });
    }

    return false;
});
