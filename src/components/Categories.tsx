import React, { useEffect, useState } from "react";
import "../css/categories.css";
import CategoryWrapper from "../components/categoryWrapper";
import CategoryItem from "./categoryItem";
import move from "../scripts/move"; 
import CategoryData from "../interfaces/categorydata";

// Define the props interface for the Categories component
interface CategoriesProps {
  scale?: number;
}

// Define the state interface for the Categories component
interface CategoriesState {
  alldata: Record<string, any>;
}

  interface AllData {
    [key: string]: CategoryData;
  }
  

// Define the Categories component as a functional component
const Categories: React.FC<CategoriesProps> = ({ scale = 1 }) => {
  // Initialize the state for alldata using useState
  const [alldata, setData] = useState<AllData>({});;

  // useEffect to call move(scale) when the component mounts
  useEffect(() => {
    move(scale);
  }, [scale]);

  // Function to add a new item to a category
  const addItem = (category: string) => {
    let cloned_data = { ...alldata };
    let item_length = cloned_data[category].subcategories.length + 1;
    let new_item_id = item_length++;
    let new_data = {
      id: new_item_id,
      name: null,
    };
    cloned_data[category].subcategories.push(new_data);
    setData(cloned_data);
  };

  // Function to add a new category
  const addCategory = (category: string) => {
    let cloned_data = { ...alldata };

    cloned_data["category" + Date.now()] = {
      main: {
        name: "",
        id:null
      },
      subcategories: [],
    };

    setData(cloned_data);
  };

  // Function to edit an item in a category
  const editItem = (data: any, category: string, id: number) => {
    let cloned_data = { ...alldata };
    cloned_data[category].subcategories.map((e: any, i: number) => {
      if (e.id === id) {
        e.name = data;
      }
    });
    setData(cloned_data);
  };

  // Function to delete an item from a category
  const deleteItem = (category: string, id: number) => {
    let cloned_data = { ...alldata };
    cloned_data[category].subcategories.map((e: any, i: number) => {
      if (e.id === id) {
        delete cloned_data[category].subcategories[i];
      }
    });
    setData(cloned_data);
  };

  // Function to edit a category
  const editCategory = (data: string, category: string) => {
    let cloned_data = { ...alldata };
    cloned_data[category].main.name = data;
    setData(cloned_data);
  };

  // Function to delete a category
  const deleteCategory = (category: string) => {
    let cloned_data = { ...alldata };
    delete cloned_data[category];
    setData(cloned_data);
  };

  return (
    <div
      className="wrapper"
      id="wrapper"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <CategoryItem
        style={{ marginBottom: "0px !important" }}
        addItem={addCategory}
        type={2}
        item_data={{ name: "add category", id:'norms' }}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
        editItem={editItem}
        deleteItem={deleteItem}
        category={''}

      />

      <div className="chains" style={{display:Object.keys(alldata).length?'flex':'none'}}>
        <div className="top-link"></div>
        <div className="chain-link" style={{display:Object.keys(alldata).length>1?'flex':'none'}}></div>
      </div>

      <div className="categories">
        {Object.keys(alldata).map((item) => (
          <CategoryWrapper
            addItem={addItem}
            deleteCategory={deleteCategory}
            deleteItem={deleteItem}
            editCategory={editCategory}
            editItem={editItem}
            data={alldata[item]}
            category={item}
            key={item} // Add a unique key to each CategoryWrapper
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
