import ImageCard from "./ImageCard";
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { FaRegImage } from "react-icons/fa6";

function GalleryColumn({ id, cards, title }) {
    const { setNodeRef } = useDroppable({ id: id });
    return (


        <div>
            <p>{title}</p>
            <div
                ref={setNodeRef}
                className="gallery"
            >
                {cards?.map((item, index) => (
                    <ImageCard
                        item={item}
                        key={index}
                    />
                ))}
            </div>
        </div>


    )
}

export default GalleryColumn