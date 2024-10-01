import Document from "../models/document.models.js"; // Assuming your model file is named document.model.js

// Create a new document
async function createFile(req, res) {
  const { title} = req.params; 

  try {
    const newDocument = await Document.create({
      title,
      owner: req.user._id, // Assuming `req.user` contains the authenticated user
    });

    res.status(201).json({
      success: true,
      data: newDocument,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create document",
      error: error.message,
    });
  }
}

// View all documents 
async function viewFile(req, res) {
  try {
    const documents = await Document.find({ owner: req.user._id }); // Shows only documents owned by the logged-in user

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve documents",
      error: error.message,
    });
  }
}

// View a single document by its ID
async function viewSingleFile(req, res) {
  const { id } = req.params;

  try {
    const document = await Document.findById(id).populate("collaborators.user");

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve document",
      error: error.message,
    });
  }
}

// Edit a document by its ID
async function editFile(req, res) {
  const { id } = req.params;
  const { title, content, collaborators } = req.body;

  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      { title, content, collaborators },
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDocument,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update document",
      error: error.message,
    });
  }
}

// Delete a document by its ID
async function deleteFile(req, res) {
  const { id } = req.params;

  try {
    const document = await Document.findByIdAndDelete(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete document",
      error: error.message,
    });
  }
}

export { createFile, viewFile, deleteFile, editFile, viewSingleFile };
