import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPostedItems } from "../fetches/fetchPostedItems";
import { fetchUserCartItems } from "../fetches/fetchUserCartItems";
import { fetchUserNotifications } from "../fetches/fetchUserNotifications";
import {
  Notification,
  PostedItem,
  GamerdiseContextType,
  BasicUserInfo,
  ItemDisplayCardType,
} from "../types/types";

const GamerdiseContext = createContext<GamerdiseContextType>({
  isLoading: false,
  isErrorLoading: false,
  postedItems: [],
  userCartItems: [],
  userNotifications: [],
  categoryFilter: "",
  setCategoryFilter: () => {},
  searchInputFilter: "",
  setSearchInputFilter: () => {},
  onDisplayItem: null,
  setOnDisplayItem: () => {},
  currentAccount: null,
  setCurrentAccount: () => {},
  getPostedItems: () => {},
  getUserCartItems: () => {},
  getUserNotifications: () => {},
});

export const GamerdiseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrorLoading, setIsErrorLoading] = useState<boolean>(false);
  const [postedItems, setPostedItems] = useState<PostedItem[]>([]);
  const [userCartItems, setUserCartItems] = useState<PostedItem[]>([]);
  const [userNotifications, setUserNotifications] = useState<Notification[]>(
    []
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchInputFilter, setSearchInputFilter] = useState<string>("");
  const [onDisplayItem, setOnDisplayItem] =
    useState<ItemDisplayCardType | null>(null);
  const [currentAccount, setCurrentAccount] = useState<BasicUserInfo | null>(
    null
  );

  useEffect(() => {
    const unparsedUser = localStorage.getItem("user");
    if (unparsedUser) {
      const user = JSON.parse(unparsedUser);
      setCurrentAccount(user);
      try {
        getUserCartItems();
        getUserNotifications();
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    getPostedItems();
  }, []);

  const getPostedItems = () => {
    setIsLoading(true);
    fetchPostedItems()
      .then((response) => response.json())
      .then((items) => setPostedItems(items))
      .catch(() => {
        setIsErrorLoading(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getUserCartItems = () => {
    fetchUserCartItems()
      .then((response) => response.json())
      .then((userCartItems) => setUserCartItems(userCartItems))
      .catch((e) => console.error(e));
  };

  const getUserNotifications = () => {
    fetchUserNotifications()
      .then((response) => response.json())
      .then((notifications) => setUserNotifications(notifications))
      .catch((e) => console.error(e));
  };

  return (
    <GamerdiseContext.Provider
      value={{
        isLoading,
        isErrorLoading,
        postedItems,
        userCartItems,
        userNotifications,
        categoryFilter,
        setCategoryFilter,
        searchInputFilter,
        setSearchInputFilter,
        onDisplayItem,
        setOnDisplayItem,
        currentAccount,
        setCurrentAccount,
        getPostedItems,
        getUserCartItems,
        getUserNotifications,
      }}
    >
      {children}
    </GamerdiseContext.Provider>
  );
};

export const useGamerdise = () => {
  const context = useContext(GamerdiseContext);
  return {
    isLoading: context.isLoading,
    isErrorLoading: context.isErrorLoading,
    postedItems: context.postedItems,
    userCartItems: context.userCartItems,
    userNotifications: context.userNotifications,
    categoryFilter: context.categoryFilter,
    setCategoryFilter: context.setCategoryFilter,
    searchInputFilter: context.searchInputFilter,
    setSearchInputFilter: context.setSearchInputFilter,
    onDisplayItem: context.onDisplayItem,
    setOnDisplayItem: context.setOnDisplayItem,
    currentAccount: context.currentAccount,
    setCurrentAccount: context.setCurrentAccount,
    getPostedItems: context.getPostedItems,
    getUserCartItems: context.getUserCartItems,
    getUserNotifications: context.getUserNotifications,
  };
};
