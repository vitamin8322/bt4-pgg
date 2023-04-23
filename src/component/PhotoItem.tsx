import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../models/itemModel";
import { setEditingId, setUpdatedTitle } from "../redux/slice/itemsSlice";
import { RootState } from "../redux/store";

interface ListItemProps {
  photo: Item;
  currentTime: string | number
}

const PhotoListItem: React.FC<ListItemProps> = React.memo(({ photo, currentTime  }) => {
  const dispatch = useDispatch();
  const { editingId, updatedTitles } = useSelector(
    (state: RootState) => state.items
  );
  const title = updatedTitles[photo.id] ?? photo.title;

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const title = event.target.value;
    dispatch(setUpdatedTitle({ id, title }));
  };

  const handleEdit = (id: number) => {
    dispatch(setEditingId(id));
  };

  const handleBlur = () => {
    dispatch(setEditingId(null));
  };
  return (
    <div
      key={photo.id}
      className="w-full"
      style={{ backgroundColor: photo.id % 2 === 0 ? "grey" : "white" }}
    >
      <img src={photo.thumbnailUrl} alt={photo.title} />
      {editingId == photo.id ? (
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={title}
          onChange={(event) => handleTitleChange(event, photo.id)}
          onBlur={handleBlur}
        />
      ) : (
        <label
          onMouseEnter={() => handleEdit(photo.id)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {title}
        </label>
      )}
      <div>{currentTime}</div>
    </div>
  );
});


export default PhotoListItem;
