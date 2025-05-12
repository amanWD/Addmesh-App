export type RootNavigationParamList = {
  Tabs: undefined;
  Account: undefined;
  EpubReader: undefined;
};

export type TabsParamList = {
  Home: undefined;
  LibraryStack: undefined;
  MyShelfStack: undefined;
  SavedStack: undefined;
  Settings: undefined;
};

export type StackParamList = {
  Library: undefined;
  MyShelf: undefined;
  Saved: undefined;
  BlogDetail: {id: string};
  EbookDetail: {id: string};
  AudioBookDetail: {id: string};
  ExplanationAudioDetail: {id: string};
  EventDetail: {id: string};
};

export type AccountStackParamList = {
  Profile: undefined;
  Login: undefined;
  VerifyOtp: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ForgetPasswordConfirm: undefined;
  ChangePassword: undefined;
};
