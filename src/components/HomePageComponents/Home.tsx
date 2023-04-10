import React, { EventHandler } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { CategoryFilter } from "./CategoryFilterer";
import { ItemDisplayCard } from "./ItemDisplayCard";
import { OnDisplayItemComponent } from "./OnDisplayItemComponent";
import { Searchbar } from "./Searchbar";
import "./Home.css";

export const Home = () => {
  const {
    isLoading,
    isErrorLoading,
    postedItems,
    currentAccount,
    categoryFilter,
    setCategoryFilter,
    searchInputFilter,
    setSearchInputFilter,
    onDisplayItem,
    setOnDisplayItem,
    userCartItems,
    userNotifications,
  } = useGamerdise();

  const postedItemsSection = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isErrorLoading) {
      return <div>Error loading items</div>;
    } else {
      return postedItems
        .filter(
          (item) =>
            item.category.includes(categoryFilter) &&
            item.name.match(new RegExp(searchInputFilter, "gi"))
        )
        .map((item) => {
          return (
            <ItemDisplayCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              category={item.category}
              price={item.price}
              posterName={item.posterName}
            />
          );
        });
    }
  };

  const removeOnDisplayItem = (e: React.SyntheticEvent) => {
    if ((e.target as Element).classList[0] === "pageCover") {
      setOnDisplayItem(null);
    }
  };

  return (
    <>
      {onDisplayItem !== null && (
        <div className="pageCover" onClick={removeOnDisplayItem}>
          <OnDisplayItemComponent />
        </div>
      )}
      {currentAccount && (
        <div className="greeting">Welcome, {currentAccount.email}!</div>
      )}
      <div className="container homePage">
        <Searchbar />
        <div className="postedItemsMainDisplay">
          <div className="categoriesFilterSection">
            {categoryFilter.length > 0 && (
              <button
                onClick={() => setCategoryFilter("")}
                className="filterClearer"
              >
                Clear Your Filter
              </button>
            )}
            <div className="header-2">Categories</div>
            <CategoryFilter />
          </div>
          <div className="postedItemsSection">
            {postedItems.length <= 0 ? (
              <h2>No Items on the market</h2>
            ) : (
              postedItemsSection()
            )}
          </div>
        </div>
      </div>
    </>
  );
};
