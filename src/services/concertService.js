const pool = require('../config/db');

const createConcertService = async (name, description, price, provider_id) => {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error('Invalid name provided.');
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        throw new Error('Invalid description provided.');
    }
    if (isNaN(price) || price <= 0) {
        throw new Error('Invalid price provided. Price must be a positive number.');
    }

    // TODO: handle file upload to AWS or another service
    // TODO: const image_url = await uploadImage(file); // Implement this function as needed

    const image_url = 'http://sample.image.com/'; // ! Placeholder URL, remove later

    try {
        const query = `
            INSERT INTO Services (name, description, price, provider_id, image_url) 
            VALUES (?, ?, ?, ?, ?)`;

        const [results] = await pool.execute(query, [name, description, price, provider_id, image_url]);

        return results;
    } catch (error) {
        console.error('Error inserting concert into database:', error);
        throw new Error('Database error occurred while creating concert.');
    }
};

const updateConcertService = async (_id, name, description, price, provider_id) => {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error('Invalid name provided.');
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        throw new Error('Invalid description provided.');
    }

    if (isNaN(price) || price <= 0) {
        throw new Error('Invalid price provided. Price must be a positive number.');
    }

    // TODO: handle file upload to AWS or another service
    // TODO: const image_url = await uploadImage(file); // Implement this function as needed

    const image_url = 'http://sample.image.com/'; // ! Placeholder URL, remove later

    try {
        const query = `
            UPDATE Services 
            SET name = ?, description = ?, price = ?, provider_id = ?, image_url = ? 
            WHERE id = ?`;
        const [results] = await pool.execute(query, [name, description, price, provider_id, image_url, _id]);

        return results;
    } catch (error) {
        console.error('Error updating concert in database:', error);
        throw new Error('Database error occurred while updating concert.');
    }
};

const deleteConcertService = async (_id) => {
    try {
        const query = `
            DELETE FROM Services 
            WHERE id = ?`;

        const [results] = await pool.execute(query, [_id]);

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            throw new Error('Concert not found or already deleted.');
        }

        return {
            message: 'Concert successfully deleted.',
            affectedRows: results.affectedRows,
        };
    } catch (error) {
        console.error('Error deleting concert in database:', error);
        throw new Error('Database error occurred while deleting concert.');
    }
};

const softDeleteConcertService = async (_id) => {
    try {
        const query = `
            UPDATE Services 
            SET is_active = ? 
            WHERE id = ?`;

        const [results] = await pool.execute(query, [0, _id]);

        if (results.affectedRows === 0) {
            throw new Error('Concert not found or already deleted.');
        }

        return {
            message: 'Concert successfully marked as inactive.',
            affectedRows: results.affectedRows,
        };
    } catch (error) {
        console.error('Error soft deleting concert in database:', error);
        throw new Error('Database error occurred while soft deleting concert.');
    }
};

module.exports = {
    createConcertService,
    updateConcertService,
    deleteConcertService,
    softDeleteConcertService,
};
