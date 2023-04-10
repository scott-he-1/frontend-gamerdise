import { Dispatch, SetStateAction } from "react";

export type PostedItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  posterId: number;
  posterName: string;
  postedItem?: any;
};

export type ItemToPostType = {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
};

export type Notification = {
  id: number;
  message: string;
  userId: number;
  notification?: any;
};

export type BasicUserInfo = {
  token: string;
  id: number;
  email: string;
};

export type MenuRouteOptions = {
  name: string;
  icon: JSX.Element;
  linkTo: string;
  disabledLink?: boolean;
  hoverElement?: JSX.Element;
  accessoryElement?: JSX.Element | null;
  trayActive?: boolean;
  showHover?: () => void,
  removeHover?: () => void,
  requiresLogin?: boolean;
};

export type GamerdiseContextType = {
  isLoading: boolean;
  isErrorLoading: boolean;
  postedItems: PostedItem[];
  userCartItems: PostedItem[];
  userNotifications: Notification[];
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  searchInputFilter: string;
  setSearchInputFilter: Dispatch<SetStateAction<string>>;
  onDisplayItem: ItemDisplayCardType | null;
  setOnDisplayItem: Dispatch<SetStateAction<ItemDisplayCardType | null>>;
  currentAccount: BasicUserInfo | null;
  setCurrentAccount: Dispatch<SetStateAction<BasicUserInfo | null>>;
  getPostedItems: () => void;
  getUserCartItems: () => void;
  getUserNotifications: () => void;
};

export type CategoriesAmount = {
  [key: string]: number;
};

export type ErrorMessageType = {
  [key: string]: string;
};

export type LoginSet = {
  emailInput: string;
  passwordInput: string;
};

export type ItemDisplayCardType = {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  posterName: string;
};

export type PostAnItemTypes = {
  [key: string]: string | number;
};

export type CreateAccountInputType = {
  [key: string]: string;
};

export type CreateAccountField = {
  [key: string]: string;
};

export type CheckoutSelectsType = {
  label: string;
  name: string;
  type: string;
  selectOptions: (string | number)[];
}[];

export type UserAddressInfoType = {
  [key: string]: string
}

export type UserCardInfoType = {
  [key:string]: string;
}