import { createSelector } from "@reduxjs/toolkit";

export const messageListSelector = (state) => state.messages.messages;