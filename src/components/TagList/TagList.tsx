import React from 'react';
import "./TagList.css"
import { Tag } from "../../types/types";

interface TagListProps {
    tags: Tag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    const getTagColor = (group: string):{ backgroundColor: string, color: string } => {
        const groupColors: Record<string, { backgroundColor: string, color: string }> = {
            genre: { backgroundColor: "#F0F1F2", color: "#000000" },
            theme: { backgroundColor: "#ff9933", color: "#FFFFFF" },
            format: { backgroundColor: "#6781ec", color: "#FFFFFF" },
            content: { backgroundColor: "#FF4040", color: "#FFFFFF" }
        };
        return groupColors[group] || "#000";
    };

    return (
        <span className="tag-list">
            {tags.map((tag, index) => (
                <span
                    key={tag.id}
                    className="tag"
                    style={getTagColor(tag.attributes.group)}
                >
                    {tag.attributes.name.en.toUpperCase()}
                    {index < tags.length - 1 && ''}
                </span>
            ))}
        </span>
    );
};

export default TagList;
