import ImageCard from "./ImageCard";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { FaRegImage } from "react-icons/fa6";

function GalleryColumn({ id, cards, selectedImages, handleSelectedImages, handleImageUpload }) {
    const { setNodeRef } = useDroppable({ id: id });
    return (

        <SortableContext
            id={id}
            items={cards}
            strategy={rectSortingStrategy}
        ><div
            ref={setNodeRef}
            className="gallery"
        >
                {cards?.map((item, index) => (
                    <ImageCard
                        item={item}
                        key={index}
                        selectedImages={selectedImages}
                        handleSelectedImages={handleSelectedImages}
                    />
                ))}
                <div className="pics img-upload">
                    <label className="img-upload-label">
                        <div className="img-upload-content">
                            <FaRegImage />
                            <br></br>
                            Add Images
                        </div>

                        <input
                            name="myImage"
                            type="file"
                            accept=".jpeg, .jpg, .png, .webp"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>
        </SortableContext>


    )
}

export default GalleryColumn