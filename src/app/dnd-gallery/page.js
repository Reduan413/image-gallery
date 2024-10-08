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
import { FaRegImage } from "react-icons/fa6";
import ImageCard from "./ImageCard";
import Gallery from "./gallery";

function Page() {
    const [allData, setAllData] = useState([
        {
            id: 'man_united',
            title: 'Man United',
            cards: [
                { id: "img1", imgSrc: image1 },
                { id: "img2", imgSrc: image2 },
                { id: "img3", imgSrc: image3 },
                { id: "img4", imgSrc: image4 },
                { id: "img5", imgSrc: image5 },
                { id: "img6", imgSrc: image6 },
                { id: "img7", imgSrc: image7 },
                { id: "img8", imgSrc: image8 },
                { id: "img9", imgSrc: image9 },
                { id: "img10", imgSrc: image10 },
                { id: "img11", imgSrc: image11 },
            ],
        },
        
    ]);
    const [selectedImages, setSelectedImages] = useState([]);
    const handleSelectedImages = (selectedImage) => {
        console.log("selectedImage",selectedImage)
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
    const filterArrays = (data, selected) => {
        return data.map(item => ({
            ...item,
            cards: item.cards.filter(card => !selected.includes(card.id))
        }));
    };

    const handleDeleteFiles = () => {
        const filteredArray1 = filterArrays(allData, selectedImages);
        setAllData(filteredArray1);
        setSelectedImages([]); // Optionally reset selected images
    };
    //  Image Upload Function
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    useEffect(() => {
        if (selectedImage) {
            // Generate a unique ID for the new card
            const newId = `img${allData[0].cards.length + 1}`; // Assuming IDs are sequential like img1, img2, etc.
            const newData = {
                id: newId,
                imgSrc: URL.createObjectURL(selectedImage), // Use a temporary URL for the image
            };

            // Update the cards state with the new card
            setAllData((prevAllData) => {
                const updatedCards = [...prevAllData[0].cards, newData];
                return [{ ...prevAllData[0], cards: updatedCards }];
            });

            // Reset the selected image state
            setSelectedImage(null);
        }
    }, [selectedImage, allData]);
    return (
        <div className="gallery-main">
            <div className="gallery-main-header">
                <h3>{selectedImages?.length} Files Selected</h3>
                {selectedImages?.length > 0 && (
                    <button onClick={handleDeleteFiles}>Delete Fils</button>
                )}
            </div>
            <Gallery allData={allData} selectedImages={selectedImages} handleSelectedImages={handleSelectedImages} setAllData={setAllData} handleImageUpload={handleImageUpload} />
        </div>
    )
}

export default Page