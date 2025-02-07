import { FaRegImage } from "react-icons/fa6";
import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import ImageCard from "./ImageCard";
import GalleryColumn from "./galleryColumn";

function Gallery({ allData, selectedImages, handleSelectedImages, setAllData, handleImageUpload }) {
    const [columns, setColumns] = useState(allData);

    const findColumn = (unique) => {
        try {
            if (!unique) {
                return null;
            }
            if (columns.some((c) => c.id == unique)) {
                return columns.find((c) => c.id == unique) ?? null;
            }
            const id = String(unique);
            const itemWithColumnId = columns.flatMap((c) => {
                const columnId = c.id;
                return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
            });
            const columnId = itemWithColumnId.find((i) => i.itemId == id)?.columnId;
            return columns.find((c) => c.id == columnId) ?? null;
        } catch (error) {

        }
    };

    const handleDragOver = (event) => {
        const { active, over, delta } = event;
        const activeId = String(active.id);
        const overId = over ? String(over.id) : null;
        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);
        if (!activeColumn || !overColumn || activeColumn === overColumn) {
            return null;
        }
        setColumns((prevState) => {
            const activeItems = activeColumn.cards;
            const overItems = overColumn.cards;
            const activeIndex = activeItems.findIndex((i) => i.id === activeId);
            const overIndex = overItems.findIndex((i) => i.id === overId);
            const newIndex = () => {
                const putOnBelowLastItem =
                    overIndex === overItems.length - 1 && delta.y > 0;
                const modifier = putOnBelowLastItem ? 1 : 0;
                return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            };
            return prevState.map((c) => {
                if (c.id === activeColumn.id) {
                    c.cards = activeItems.filter((i) => i.id !== activeId);
                    return c;
                } else if (c.id == overColumn.id) {
                    return {
                        ...c,
                        cards: [
                            ...overItems.slice(0, newIndex()),
                            activeItems[activeIndex],
                            ...overItems.slice(newIndex(), overItems.length),
                        ]
                    };
                } else {
                    return c;
                }
            });
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const activeId = String(active.id);
        const overId = over ? String(over.id) : null;
        const activeColumn = findColumn(activeId);
        const overColumn = findColumn(overId);
        if (!activeColumn || !overColumn || activeColumn !== overColumn) {
            return null;
        }
        const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
        const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
        if (activeIndex !== overIndex) {
            setColumns((prevState) => {
                return prevState.map((column) => {
                    console.log(overIndex, activeIndex, column.id, activeColumn.id)
                    if (column.id === activeColumn.id) {
                        const updatedCards = arrayMove(overColumn.cards, activeIndex, overIndex);
                        return { ...column, cards: updatedCards };
                    } else {
                        return column;
                    }
                });
            });
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
        >
            <div >
                {columns.map((column) => (
                    <SortableContext
                        items={column.cards}
                    >
                        <GalleryColumn key={column.id}
                            id={column.id}
                            title={column.title}
                            cards={column.cards}
                        />

                    </SortableContext>
                ))}
            </div>
        </DndContext>

    )
}

export default Gallery