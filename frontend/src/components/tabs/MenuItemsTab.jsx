import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { ManagerItemCardList } from "../manageritemscardlist/manageritemscardlist.component";

const MenuItemsTab = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [managerRestaurantId, setManagerRestaurantId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        itemName: "",
        itemPrice: 0.00,
        itemDescription: "",
        itemAvailability: 0,
        itemImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
    });
    const managerId = useParams();

    // Get the manager id and restaurant id
    useEffect(() => {
        const fetchManagerData = async () => {
            const managerResponse = await axios.get(`/managers/${parseInt(managerId['managerId'])}`);
            const managerData = managerResponse.data;
            setManagerRestaurantId(managerData.restaurant);
        };
        fetchManagerData();
    }, [managerId]);

    // Get the restaurants menu items
    useEffect(() => {
        if (managerRestaurantId) {
            const fetchMenus = async () => {
                try {
                    const response = await axios.get(`/restaurants`);
                    const menuItemsData = response.data[managerRestaurantId - 1].menu_restaurant;
                    setMenuItems(menuItemsData);
                    setFilteredItems(menuItemsData);
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            };
            fetchMenus();

            const interval = setInterval(fetchMenus, 1000);
            return () => clearInterval(interval);
        }
    }, [managerRestaurantId]);

    // Toggle the modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Update new items
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check if avaiability is an integer
        if (name === 'itemAvailability' && parseInt(value) < 0) {
            return;
        }
        // Check if iftem price is an float
        if (name === 'itemPrice' && parseFloat(value) < 0) {
            return;
        }
        setNewItem({ ...newItem, [name]: name === 'itemAvailability' ? parseInt(value) : value });
    };

    // Submit new menu item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/menus/", { ...newItem, restaurant: managerRestaurantId });
            // Add the new item 
            setMenuItems([...menuItems, response.data]);
            setFilteredItems([...menuItems, response.data]);
            // Reset the text and number fields
            setNewItem({
                itemName: "",
                itemPrice: 0.00,
                itemDescription: "",
                itemAvailability: 0,
                itemImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
            });
            setShowModal(false);
        } catch (error) {
            console.error('Error creating new menu item:', error);
        }
    };

    return (
        <div>
            <h2>Menu Items</h2>
            <Button className="create-item-button" onClick={toggleModal}>Create New Menu Item</Button>
            <ManagerItemCardList menuItems={filteredItems} />
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="itemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" name="itemName" value={newItem.itemName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="itemPrice">
                            <Form.Label>Item Price</Form.Label>
                            <Form.Control type="number" step="0.01" name="itemPrice" value={newItem.itemPrice} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="itemDescription">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="itemDescription" value={newItem.itemDescription} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="itemAvailability">
                            <Form.Label>Item Availability</Form.Label>
                            <Form.Control type="number" name="itemAvailability" value={newItem.itemAvailability} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="itemImage">
                            <Form.Label>Item Image</Form.Label>
                            <Form.Control type="text" name="itemImage" value={newItem.itemImage} onChange={handleChange} />
                        </Form.Group>
                        <Button className='submit-button' variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MenuItemsTab;