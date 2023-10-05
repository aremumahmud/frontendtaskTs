import React from "react";
import CategoryItem from "./categoryItem";
import "../css/categoryWrapper.css";


// Define the data interface for the Categories component
interface CategoryData {
  main: {
    name: string;
    id: any;
  };
  subcategories: Array<{
    id: any;
    name: string | null;
  }>;
}

// Define the props interface for the CategoryWrapper component
interface CategoryWrapperProps {
  data: CategoryData;
  addItem: (category: string) => void;
  editItem?: (data: string, category: string, id: number) => void;
  editCategory: (data: string, category: string) => void;
  deleteItem?: (category: string, id: number) => void;
  deleteCategory: (category: string) => void;
  category: string;
}

// Define the CategoryWrapper component as a functional component
const CategoryWrapper: React.FC<CategoryWrapperProps> = ({
  data,
  addItem,
  editItem,
  editCategory,
  deleteItem,
  deleteCategory,
  category,
}) => {
  return (
    <div className="categoryWrapper">
      <div className="chain-hook"></div>
      <CategoryItem
        addItem={addItem}
        type={0}
        item_data={data.main}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
        category={category}
      />
      <div className="subcategories" style={{gridTemplateColumns:data.subcategories.length>1?' 1fr 1fr':'1fr'}}>
        {data.subcategories.map((res, index) => (
          <CategoryItem
            deleteItem={deleteItem}
            editItem={editItem}
            category={category}
            type={1}
            item_data={res}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            key={index} // Add a unique key for each subcategory item
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryWrapper;
