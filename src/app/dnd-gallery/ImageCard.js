"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ImageCard = ({
  item,
  handleSelectedImages,
  selectedImages,
}) => {
  const [isSelected, setIsSelected] = useState(false);
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

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: item?.id,
  });

  const style = {

    transform: CSS.Transform.toString(transform),
    cursor: 'pointer',
    touchAction: 'none',
  };

  const handleCheckboxChange = (event) => {
    event.stopPropagation(); // Prevent drag event from firing
    // handleSelectedImages(item);
    console.log("item",item)
  };

  return (
    <div ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="pics"
      id={item?.id}
      >
      

      <Image src={item?.imgSrc} alt="" width={500} height={300}  />
      <label
        className={
          isSelected
            ? "checkbox-details-active"
            : "checkbox-details"
        }
      // onClick={() => console.log("item", item)}
      >
        <input
          className="form-check-input"
          type="checkbox"
          checked={isSelected}
          id="flexCheckChecked2"
          onChange={handleCheckboxChange}
        />
      </label>
      {/* {isDrag && <div className="is-drag"></div>} */}
    </div>


  );
};

export default ImageCard;
