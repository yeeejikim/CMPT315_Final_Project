import React, { useState } from "react";
import './manageritemscard.styles.css'
import axios from "axios";

// Create menu item cards
export const ManagerItemCard = ({ item }) => {
    const { item_id, item_name, item_price, item_image, item_availability, item_desc } = item;
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });
    const [originalItem, setOriginalItem] = useState({ ...item });

    // Edit button action
    const handleEdit = () => {
        setEditing(true);
    };

    // Save the edit values
    const handleSave = async () => {
        try {
            await axios.put(`/menus/${item_id}/`, editedItem);
            setEditing(false);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    // Cancel button action
    const handleCancel = () => {
        setEditing(false);
        // Reset values back to original
        setEditedItem({ ...originalItem });
    };

    // Delete button action
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            try {
                await axios.delete(`/menus/${item_id}/`);
                // You can implement a function here to remove the deleted item from the UI
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    // Get the values to change the backend
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    return (
        <div className='menu-card-container'>
            {editing ? (
                <>
                    <input type="text" name="item_name" value={editedItem.item_name} onChange={handleChange} />
                    <input type="number" name="item_price" value={editedItem.item_price} onChange={handleChange} />
                    <input type="text" name="item_desc" value={editedItem.item_desc} onChange={handleChange} />
                    <input type="number" name="item_availability" value={editedItem.item_availability} onChange={handleChange} />
                    <input type="text" name="item_image" value={editedItem.item_image} onChange={handleChange} />
                    <button className='save-button' onClick={handleSave}>Save</button>
                    <button className='static-button' onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h2>{item_name}</h2>
                    <img alt='menu' src={item_image} width={100}></img>
                    <h3>$ {item_price}</h3>
                    <h4>Availability: {item_availability}</h4>
                    <h5>{item_desc}</h5>
                    <button className='static-button' onClick={handleEdit}>Edit</button>
                    <button className='delete-button' onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    )
};