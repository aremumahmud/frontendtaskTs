import React, { useState } from "react";
import "../css/categoryItem.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaAngleLeft, FaMarker, FaPen, FaPlus } from "react-icons/fa";

// Define the props interface for the CategoryItem component
interface CategoryItemProps {
  item_data: {
    id: any;
    name: string | null;
  };
  type: number;
  category: string;
  editItem?: (data: string, category: string, id: number) => void;
  editCategory: (data: string, category: string) => void;
  deleteItem?: (category: string, id: number) => void;
  deleteCategory: (category: string) => void;
  addItem?: (category: string) => void;
  style?: React.CSSProperties;
}

// Define the CategoryItem component as a functional component
const CategoryItem: React.FC<CategoryItemProps> = ({
  item_data,
  type,
  category,
  editItem,
  editCategory,
  deleteItem,
  deleteCategory,
  addItem,
  style = { marginBottom: "20px" },
}) => {
  let item_name = item_data.name;
  let [mode, setMode] = useState(item_data.name ? "disabled" : "enabled");

  // Function to toggle between "disabled" and "enabled" modes
  const set_mode = () => {
    if (mode === "disabled") {
      return setMode("enabled");
    }
    setMode("disabled");
  };

  return (
    <div className="categoryItem">
      <div
        className={`input_label ${mode !== "disabled" && "active"}`}
        style={
          type === 1
            ? { ...style, background: "#001A23", color: "white" }
            : { ...style }
        }
      >
        {mode === "disabled" ? (
          <p>{item_data.name}</p>
        ) : (
          <input
            onChange={(e) =>
              editItem
                ? editItem(e.target.value, category, item_data.id)
                : editCategory(e.target.value, category)
            }
            type="text"
            value={item_name || ""}
            placeholder="type here...."
          />
        )}
      </div>
      <div className="icons">
        {type !== 1 && (
          <div
            onClick={() => addItem && addItem(category)}
            style={type === 2 ? { background: "#EADDA6" } : {}}
            className="icon"
          >
            <FaPlus size={10} />
          </div>
        )}
        {type !== 2 && (
          <>
            <div className="icon" onClick={set_mode}>
              {mode === "disabled" ? (
                <FaPen size={10} />
              ) : (
                <FaAngleLeft size={15} />
              )}
            </div>
            <div
              className="icon"
              onClick={() =>
                deleteItem
                  ? deleteItem(category, item_data.id)
                  : deleteCategory(category)
              }
            >
              <AiOutlineDelete size={15} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
