import {
  faHouse,
  faSackDollar,
  faShoppingCart,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MiniCartItem } from "../components/MiniCartItem/MiniCartItem";
import { NotificationItem } from "../components/Notifications/NotificationItem";
import { useGamerdise } from "../providers/GamerdiseProvider";
import { MenuRouteOptions } from "../types/types";
import "./Layout.css";

export const Layout = () => {
  const { currentAccount, userNotifications, userCartItems } = useGamerdise();
  const [showNotificationBoard, setShowNotificationBoard] =
    useState<boolean>(false);
  const [showAccountOptions, setShowAccountOptions] = useState<boolean>(false);
  const [showMiniCart, setShowMiniCart] = useState<boolean>(false);
  const navigate = useNavigate();

  const routeOptions: MenuRouteOptions[] = [
    { name: "Home", icon: <FontAwesomeIcon icon={faHouse} />, linkTo: "/" },
    {
      name: "Post An Item",
      icon: <FontAwesomeIcon icon={faSackDollar} />,
      linkTo: "/postAnItem",
    },
    {
      name: "Cart",
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
      linkTo: "/checkout",
      requiresLogin: true,
      showHover: () => setShowMiniCart(true),
      removeHover: () => setShowMiniCart(false),
      trayActive: showMiniCart,
      hoverElement: (
        <div
          className="hoverTray"
          onMouseEnter={() => setShowMiniCart(true)}
          onMouseLeave={() => setShowMiniCart(false)}
        >
          {userCartItems.length > 0 ? (
            userCartItems.map(({ postedItem }) => {
              return (
                <MiniCartItem
                  key={postedItem.name}
                  name={postedItem.name}
                  image={postedItem.image}
                  price={postedItem.price}
                />
              );
            })
          ) : (
            <div>No items in cart</div>
          )}
        </div>
      ),
    },
    currentAccount
      ? {
          name: "User",
          icon: <FontAwesomeIcon icon={faUser} />,
          linkTo: "/",
          showHover: () => setShowAccountOptions(true),
          removeHover: () => setShowAccountOptions(false),
          trayActive: showAccountOptions,
          hoverElement: (
            <div
              className="hoverTray"
              onMouseEnter={() => setShowAccountOptions(true)}
              onMouseLeave={() => setShowAccountOptions(false)}
            >
              <button
                className="logoutButton"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          ),
        }
      : { name: "Login", icon: <div>LOGIN</div>, linkTo: "/login" },
    {
      name: "Notifications",
      icon: <FontAwesomeIcon icon={faBell} />,
      linkTo: "",
      requiresLogin: true,
      accessoryElement: userNotifications.length ? (
        <div className="notificationCounter">{userNotifications.length}</div>
      ) : null,
      showHover: () => setShowNotificationBoard(true),
      removeHover: () => setShowNotificationBoard(false),
      trayActive: showNotificationBoard,
      hoverElement: (
        <div
          className="hoverTray"
          onMouseEnter={() => setShowNotificationBoard(true)}
          onMouseLeave={() => setShowNotificationBoard(false)}
        >
          {userNotifications.length > 0 ? (
            userNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                message={notification.message}
              />
            ))
          ) : (
            <div className="notificationMessage">No Notifications at the time.</div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="menu">
        <div className="menuTitle pusher">
          <Link to={"/"}>Gamerdise</Link>
        </div>
        <nav className="navbar">
          <ul>
            {routeOptions.map((option) => {
              if (option.requiresLogin && !currentAccount) {
                return;
              }
              return (
                <div key={option.name} className="menuIcon" title={option.name}>
                  <li>
                    <Link
                      to={option.linkTo}
                      className={option.disabledLink ? "disabledLink" : ""}
                      onMouseEnter={
                        option.showHover ? option.showHover : () => {}
                      }
                      onMouseLeave={
                        option.removeHover ? option.removeHover : () => {}
                      }
                    >
                      {option.icon}
                    </Link>
                  </li>
                  {option.trayActive && option.hoverElement}
                  {option.accessoryElement && option.accessoryElement}
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
