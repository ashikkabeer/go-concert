const {
  createConcert,
  createConcertService,
  updateConcertService,
  deleteConcertService,
  softDeleteConcertService,
} = require("../services/concertService");
const createConcert = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const provider_id = req.user.id;
    const result = await createConcertService(
      name,
      description,
      price,
      provider_id,
    );

    return res.status(201).json({
      message: "Concert created successfully.",
      concertId: result.insertId,
    });
  } catch (error) {
    console.error("Error in createConcertController:", error.message);

    if (error.message.includes("Invalid")) {
      return res.status(400).json({
        error: error.message,
      });
    } else {
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }
};

const updateConcert = async (req, res) => {
  try {
    const _id = req.params.id;
    const { name, description, price } = req.body;
    const provider_id = req.user.id;
    const result = await updateConcertService(
      _id,
      name,
      description,
      price,
      provider_id,
    );
    return res.status(201).json({
      message: "Concert updated successfully.",
      concertId: result.id,
    });
  } catch (error) {
    console.error("Error in updateConcertController:", error.message);

    if (error.message.includes("Invalid")) {
      return res.status(400).json({
        error: error.message,
      });
    } else {
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }
};

const deleteConcert = async (req, res) => {
  const _id = req.params.id; // Get the concert ID from the request parameters

  try {
    // Call the service to delete the concert
    const result = await deleteConcertService(_id);

    // Send a success response
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in deleteConcert controller:", error.message);

    // Send an appropriate error response
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

const softDeleteConcert = async (req, res) => {
  const _id = req.params.id; // Get the concert ID from the request parameters

  try {
    // Call the service to soft delete the concert
    const result = await softDeleteConcertService(_id);

    // Send a success response
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in softDeleteConcert controller:", error.message);

    // Send an appropriate error response
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

module.exports = {
  createConcert,
  updateConcert,
  deleteConcert,
  softDeleteConcert,
};
