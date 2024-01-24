const ArtistType = require('../models/ArtistTypeModel');


const addArtistType = async (req, res) => {
    try {
        // Extract the required field 'type' from the request body
        const { type } = req.body;

        // Check if 'type' is provided
        if (!type) {
            return res.status(400).json({ message: 'The "type" field is required.' });
        }

        // Check if the ArtistType already exists
        const existingArtistType = await ArtistType.findOne({ type });

        if (existingArtistType) {
            return res.status(200).json({ message: 'Artist Type already exists.' });
        } else {
            const newArtistType = new ArtistType({ type });
            await newArtistType.save();

            return res.status(201).json({ message: 'Artist Type added successfully.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const activateArtistType = async (req, res) => {
    try {
        const { artistTypeId } = req.params;

        if (!artistTypeId) {
            return res.status(400).json({ success: false, message: 'Artist Type ID is required.' });
        }

        const artistType = await ArtistType.findById(artistTypeId);

        if (!artistType) {
            return res.status(404).json({ success: false, message: 'Artist Type not found.' });
        }

        if (artistType.active) {
            return res.status(200).json({ success: false, message: 'Artist Type is already active.' });
        }

        artistType.active = true;
        await artistType.save();

        return res.status(200).json({ success: true, message: 'Artist Type activated successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const deactivateArtistType = async (req, res) => {
    try {
        const { artistTypeId } = req.params;

        if (!artistTypeId) {
            return res.status(400).json({ success: false, message: 'Artist Type ID is required.' });
        }

        const artistType = await ArtistType.findById(artistTypeId);

        if (!artistType) {
            return res.status(404).json({ success: false, message: 'Artist Type not found.' });
        }

        if (!artistType.active) {
            return res.status(200).json({ success: false, message: 'Artist Type is already inactive.' });
        }

        artistType.active = false;
        await artistType.save();

        return res.status(200).json({ success: true, message: 'Artist Type deactivated successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateArtistType = async (req, res) => {
    try {
        const { artistTypeId } = req.params;
        const { newType } = req.body;

        if (!artistTypeId || !newType) {
            return res.status(400).json({ success: false, message: 'Artist Type ID and new type are required.' });
        }

        const artistType = await ArtistType.findById(artistTypeId);

        if (!artistType) {
            return res.status(404).json({ success: false, message: 'Artist Type not found.' });
        }

        const existingType = await ArtistType.findOne({ type: newType, _id: { $ne: artistType._id } });

        if (existingType) {
            return res.status(200).json({ success: false, message: 'New type is already in use.' });
        }

        artistType.type = newType;
        await artistType.save();

        return res.status(200).json({ success: true, message: 'Artist Type updated successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const listActiveArtistTypes = async (req, res) => {
    try {
        const activeArtistTypes = await ArtistType.find({ active: true }, { type: 1}).sort({ 'type': -1 });


        return res.status(200).json({ success: true, artistTypes: activeArtistTypes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const listArtistTypes = async (req, res) => {
    try {
        const activeArtistTypes = await ArtistType.find().sort({ 'type': -1 });
        return res.status(200).json({ success: true, artistTypes: activeArtistTypes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    listActiveArtistTypes,
    addArtistType,
    activateArtistType,
    deactivateArtistType,
    updateArtistType,
    listArtistTypes
};