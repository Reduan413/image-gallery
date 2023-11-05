"use client";
import React, { useEffect, useState } from "react";
import image1 from "../../images/image-1.webp";
import image2 from "../../images/image-2.webp";
import image3 from "../../images/image-3.webp";
import image4 from "../../images/image-4.webp";
import image5 from "../../images/image-5.webp";
import image6 from "../../images/image-6.webp";
import image7 from "../../images/image-7.webp";
import image8 from "../../images/image-8.webp";
import image9 from "../../images/image-9.webp";
import image10 from "../../images/image-10.jpeg";
import image11 from "../../images/image-11.jpeg";
import Image from "next/image";
import ImageCard from "./ImageCard";
import { FaRegImage } from "react-icons/fa6";
const Gallery = () => {
  const [allData, setAllData] = useState([
    { id: 1, imgSrc: image1 },
    { id: 2, imgSrc: image2 },
    { id: 3, imgSrc: image3 },
    { id: 4, imgSrc: image4 },
    { id: 5, imgSrc: image5 },
    { id: 6, imgSrc: image6 },
    { id: 7, imgSrc: image7 },
    { id: 8, imgSrc: image8 },
    { id: 9, imgSrc: image9 },
    { id: 10, imgSrc: image10 },
    { id: 11, imgSrc: image11 },
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDragItem, setSelectedDragItem] = useState({
    dragItem: null,
    dragOverItem: null,
  });
  const handleSelectedImages = (selectedImage) => {
    const exists = selectedImages?.find(
      (singleImage) => singleImage?.id === selectedImage?.id
    );

    if (!exists) {
      setSelectedImages([...selectedImages, selectedImage]);
    } else {
      const filterData = selectedImages?.filter(
        (singleImage) => singleImage?.id != selectedImage?.id
      );
      setSelectedImages(filterData);
    }
  };
  const handleDeleteFiles = () => {
    setSelectedImages([]);
  };
  return (
    <div className="gallery-main">
      <div className="gallery-main-header">
        <h3>{selectedImages?.length} Files Selected</h3>
        {selectedImages?.length > 0 && <button onClick={handleDeleteFiles}>Delete Fils</button>}
      </div>
      <div className="gallery">
        {allData?.map((item, index) => (
          <ImageCard
            item={item}
            key={index}
            selectedImages={selectedImages}
            handleSelectedImages={handleSelectedImages}
            allData={allData}
            setAllData={setAllData}
            index={index}
            selectedDragItem={selectedDragItem}
            setSelectedDragItem={setSelectedDragItem}
          />
        ))}
        <div className="pics img-upload">
          <label className="img-upload-label">
            <div className="img-upload-content">
              <FaRegImage />
              <br></br>
              Add Images
            </div>

            <input name="myImage" type="file" accept="image/*" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
