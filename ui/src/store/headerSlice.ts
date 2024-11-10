import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  pageTitle: string;
  noOfNotifications: number;
  newNotificationMessage: string;
  newNotificationStatus: number;
}

interface PageTitlePayload {
  title: string;
}

interface NotificationPayload {
  message: string;
  status: number;
}

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    pageTitle: "Home", // current page title state management
    noOfNotifications: 15, // no of unread notifications
    newNotificationMessage: "", // message of notification to be shown
    newNotificationStatus: 1, // to check the notification type -  success/ error/ info
  } as HeaderState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<PageTitlePayload>) => {
      state.pageTitle = action.payload.title;
    },

    removeNotificationMessage: (state) => {
      state.newNotificationMessage = "";
    },

    showNotification: (state, action: PayloadAction<NotificationPayload>) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },
});

export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;

export default headerSlice.reducer;
