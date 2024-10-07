import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import "./App.css";
import Page1 from "./pages";

const MyDocument = ({ formData }) => (
  <Document>
    <Page>
      <Page1 formData={formData} />
    </Page>
  </Document>
);

const App = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    invoiceDate: "",
    items: [
      {
        description: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle invoice item changes
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    newItems[index].total =
      newItems[index].quantity * newItems[index].unitPrice;
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  // Add a new item to the invoice
  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          description: "",
          quantity: 0,
          unitPrice: 0,
          total: 0,
        },
      ],
    }));
  };

  // Remove an item from the invoice
  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount;

    setFormData((prevData) => ({
      ...prevData,
      subtotal,
      taxAmount,
      total,
    }));

    setSubmitted(true);
    setShowViewer(true);
  };

  return (
    <div className="app-container">
      {!showViewer && (
        <div className="form-container">
          <h1>Generate Your Project Invoice</h1>
          <form className="pdf-form" onSubmit={handleSubmit}>
            {/* Company and Client Details */}
            <h2>Company Details</h2>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter Company Name"
              />
            </label>
            <label>
              Company Address:
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                placeholder="Enter Company Address"
              />
            </label>
            <label>
              Company Email:
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                placeholder="Enter Company Email"
              />
            </label>

            <h2>Client Details</h2>
            <label>
             Client Name:
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter Client Name"
              />
            </label>
            <label>
              Client Email:
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                placeholder="Enter Client Email"
              />
            </label>
            <label>
              Invoice Date:
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleInputChange}
              />
            </label>

            {/* Invoice Items */}
            <h2>Invoice Items</h2>
            {formData.items.map((item, index) => (
              <div key={index} className="invoice-item">
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Enter Description"
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Enter Quantity"
                  />
                </label>
                <label>
                  Unit Price:
                  <input
                    type="number"
                    name="unitPrice"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Enter Unit Price"
                  />
                </label>
                <p>Total: {item.total}</p>
                <button type="button" onClick={() => handleRemoveItem(index)} className="remove-item-btn ">
                  Remove Item
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddItem} className="add-item-btn">
              Add Item
            </button>

            <label>
              Tax Rate (%):
              <input
                type="number"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleInputChange}
                placeholder="Enter Tax Rate"
              />
            </label>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>

          {/* Show Download and View buttons after form submission */}
          {submitted && (
            <>
              <PDFDownloadLink
                document={<MyDocument formData={formData} />}
                fileName="project-invoice.pdf"
                className="open-btn"
              >
                {({ loading }) =>
                  loading ? "Loading document..." : "Download PDF"
                }
              </PDFDownloadLink>

              <button className="open-btn" onClick={() => setShowViewer(true)}>
                View PDF
              </button>
            </>
          )}
        </div>
      )}
      {/* PDF Viewer */}
      {showViewer && (
        <div className="pdf-viewer-container">
          <button className="close-btn" onClick={() => setShowViewer(false)}>
            Close Viewer
          </button>
          <PDFViewer className="pdf-viewer">
            <MyDocument formData={formData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default App;
