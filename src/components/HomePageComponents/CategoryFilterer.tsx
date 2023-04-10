import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { CategoriesAmount } from "../../types/types";

export const CategoryFilter = () => {
  const { postedItems, categoryFilter, setCategoryFilter } = useGamerdise();
  let categoriesAmount: CategoriesAmount = {};
  for (let item of postedItems) {
    categoriesAmount[`${item.category}`]
      ? (categoriesAmount[item.category] += 1)
      : (categoriesAmount[item.category] = 1);
  }

  const changeCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategoryFilter((e.target as HTMLDivElement).dataset.name as string);
  };

  return (
    <>
      {Object.keys(categoriesAmount).map((category) => (
        <div
          key={category}
          data-name={category}
          className={`category ${categoryFilter === category ? "active" : ""}`}
          onClick={changeCategory}
        >
          {category} ({categoriesAmount[category]})
        </div>
      ))}
    </>
  );
};
