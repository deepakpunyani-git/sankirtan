const ArtistService = require('../models/ArtistServiesModel');

const addArtistService = async (req, res) => {
  try {
      const { service } = req.body;

      if (!service) {
          return res.status(400).json({ success: false, message: 'Service is required.' });
      }

      const existingArtistService = await ArtistService.findOne({ service });

      if (existingArtistService) {
          return res.status(200).json({ success: false, message: 'Artist Service already exists.' });
      }

      const newArtistService = new ArtistService({ service });
      await newArtistService.save();

      return res.status(201).json({ success: true, message: 'Artist Service added successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const listArtistServices = async (req, res) => {
  try {
      const artistServices = await ArtistService.find();
      return res.status(200).json({ success: true, artistServices });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const activateArtistService = async (req, res) => {
  try {
      const { artistServiceId } = req.params;

      const artistService = await ArtistService.findById(artistServiceId);

      if (!artistService) {
          return res.status(404).json({ success: false, message: 'Artist Service not found.' });
      }

      artistService.active = true;
      await artistService.save();

      return res.status(200).json({ success: true, message: 'Artist Service activated successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deactivateArtistService = async (req, res) => {
  try {
      const { artistServiceId } = req.params;

      const artistService = await ArtistService.findById(artistServiceId);

      if (!artistService) {
          return res.status(404).json({ success: false, message: 'Artist Service not found.' });
      }

      artistService.active = false;
      await artistService.save();

      return res.status(200).json({ success: true, message: 'Artist Service deactivated successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateArtistService = async (req, res) => {
  try {
      const { artistServiceId } = req.params;
      const { newService } = req.body;

      if (!artistServiceId || !newService) {
          return res.status(400).json({ success: false, message: 'Artist Service ID and new service are required.' });
      }

      const artistService = await ArtistService.findById(artistServiceId);

      if (!artistService) {
          return res.status(404).json({ success: false, message: 'Artist Service not found.' });
      }

      // Check if the new service already exists
      const existingService = await ArtistService.findOne({ service: newService });

      if (existingService) {
          return res.status(200).json({ success: false, message: 'New service already exists.' });
      }

      artistService.service = newService;
      await artistService.save();

      return res.status(200).json({ success: true, message: 'Artist Service updated successfully.' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const listActiveArtistServices = async (req, res) => {
  try {
      const activeArtistServices = await ArtistService.find({ active: true }, { service: 1 }).sort({ 'service': 1 });

      return res.status(200).json({ success: true, artistServices: activeArtistServices });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


module.exports = { addArtistService, activateArtistService, deactivateArtistService, updateArtistService, listArtistServices , listActiveArtistServices };
