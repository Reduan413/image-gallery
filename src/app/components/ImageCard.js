"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const ImageCard = ({
  item,
  handleSelectedImages,
  selectedImages,
  allData,
  setAllData,
  index,
  selectedDragItem,
  setSelectedDragItem,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  useEffect(() => {
    const exists = selectedImages?.find(
      (singleImage) => singleImage?.id === item?.id
    );
    if (exists) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [item, selectedImages]);
  const dragStart = (e, position) => {
    dragItem.current = position;
    selectedDragItem.dragItem = position;
  };
  const drop = (e, a) => {
    const copyListItems = [...allData];
    const dragItemContent = copyListItems[selectedDragItem.dragItem];
    copyListItems.splice(selectedDragItem.dragItem, 1);
    copyListItems.splice(selectedDragItem.dragOverItem, 0, dragItemContent);
    setSelectedDragItem({
      dragItem: null,
      dragOverItem: null,
    });
    setAllData(copyListItems);
  };
  return (
    <div
      className="pics"
      onDragStart={(e) => {
        setSelectedDragItem({
          dragItem: index,
          dragOverItem: selectedDragItem.dragOverItem,
        });
        // selectedDragItem.dragItem = index;
      }}
      onDragEnter={(e) => {
        setSelectedDragItem({
          dragItem: selectedDragItem.dragItem,
          dragOverItem: index,
        });
        setIsDrag(true);
      }}
      onDragEnd={(e) => {
        drop()
      }}
      onDragLeave={(e) => setIsDrag(false)}
      draggable
    >
      <Image src={item?.imgSrc} alt="" />
      <label
        className={
          isSelected
            ? "checkbox-details-active"
            : isDrag
            ? "checkbox-details-drag"
            : "checkbox-details"
        }
        // onClick={() => setPlaceBtn(!placeBtn)}
      >
        <input
          className="form-check-input"
          type="checkbox"
          checked={isSelected}
          id="flexCheckChecked2"
          onChange={() => {
            handleSelectedImages(item);
          }}
        />
      </label>
      {isDrag && <div className="is-drag"></div>}
    </div>
  );
};

export default ImageCard;
