import  { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function AssistantsManagement() {
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
    userId: '',
    configId: '',
    twilioNumber: '',
    isDefault: false,
    websiteUrl: '',
    apiKeyUsed: false,
    tagLine: '',
    assistantDescription: '',
    keyBenefits: ['', ''],
    useCases: [{ name: '', description: '' }, { name: '', description: '' }],
    tutorial: '',
    price: '',
    category: '',
    isActive: false,
    isWebsiteView: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('keyBenefits')) {
      const index = parseInt(name.split('[')[1], 10);
      const updatedBenefits = [...formData.keyBenefits];
      updatedBenefits[index] = value;
      setFormData((prev) => ({ ...prev, keyBenefits: updatedBenefits }));
    } else if (name.startsWith('useCases')) {
      const [field, index] = name.split('.');
      const idx = parseInt(index.split('[')[1], 10);
      const updatedUseCases = [...formData.useCases];
      updatedUseCases[idx][field] = value;
      setFormData((prev) => ({ ...prev, useCases: updatedUseCases }));
    } else if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'keyBenefits') {
        formData.keyBenefits.forEach((benefit, i) =>
          form.append(`keyBenefits[${i}]`, benefit)
        );
      } else if (key === 'useCases') {
        formData.useCases.forEach((useCase, i) => {
          form.append(`useCases[${i}].name`, useCase.name);
          form.append(`useCases[${i}].description`, useCase.description);
        });
      } else if (key === 'image' && formData.image) {
        form.append(key, formData.image);
      } else {
        form.append(key, formData[key]);
      }
    });

    const response = await fetch('api/configs/createEcommAssistant', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      alert('Assistant created successfully!');
      setIsOpen(false); // Close the popup on success
    } else {
      alert('Failed to create assistant.');
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      const response = await fetch('https://configstaging.trainright.fit/api/configs/findAssistants');
      const data = await response.json();
      setAssistants(data.assistants);
    } catch (error) {
      console.error('Error fetching assistants:', error);
      setError('Failed to fetch assistants');
    }
  };

  const handleEdit = (assistant) => {
    setSelectedAssistant(assistant);
    setIsEditing(true);
  };

  const handleUpdate = async (updatedAssistant) => {
    try {
      const response = await fetch(`https://configstaging.trainright.fit/api/configs/updateAssistant?id=${selectedAssistant._id}`, {
        method: 'PUT',
        body: updatedAssistant
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Update successful', responseData);
        fetchAssistants(); // Refresh the list
        setIsEditing(false);
        setSelectedAssistant(null);
      } else {
        console.error('Update failed', responseData);
        setError(responseData.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating assistant:', error);
      setError('Error updating assistant');
    }
  };

  return (
    <>
    <Navbar/>
    <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create New Assistant
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Create New Assistant</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              {/* Other Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">User ID</label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Key Benefits */}
              <div className="my-4">
                <label className="block text-gray-700">Key Benefits</label>
                {formData.keyBenefits.map((benefit, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`keyBenefits[${index}]`}
                    value={benefit}
                    onChange={handleChange}
                    placeholder={`Benefit ${index + 1}`}
                    className="w-full mt-1 p-2 border rounded mb-2"
                  />
                ))}
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-gray-700">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full mt-1 p-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assistants Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {isEditing && selectedAssistant && (
        <EditAssistantModal 
          assistant={selectedAssistant} 
          onUpdate={handleUpdate}
          onCancel={() => {
            setIsEditing(false);
            setSelectedAssistant(null);
          }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Assistant ID</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assistants.map((assistant) => (
              <tr key={assistant._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{assistant.name}</td>
                <td className="p-3">{assistant.assistantId}</td>
                <td className="p-3">${assistant.price}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${assistant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {assistant.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button 
                    onClick={() => handleEdit(assistant)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

function EditAssistantModal({ assistant, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    ...assistant,
    keyBenefits: assistant.keyBenefits || [],
    useCases: assistant.useCases || [],
    image: null
  });
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  const handleKeyBenefitsChange = (index, value) => {
    const newKeyBenefits = [...formData.keyBenefits];
    newKeyBenefits[index] = value;
    setFormData(prev => ({ ...prev, keyBenefits: newKeyBenefits }));
  };

  const handleUseCaseChange = (index, field, value) => {
    const newUseCases = [...formData.useCases];
    newUseCases[index] = { ...newUseCases[index], [field]: value };
    setFormData(prev => ({ ...prev, useCases: newUseCases }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for multipart/form-data submission
    const formDataToSubmit = new FormData();
    
    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (key === 'keyBenefits') {
        formData.keyBenefits.forEach((benefit, i) =>
          formDataToSubmit.append(`keyBenefits[${i}]`, benefit)
        );
      } else if (key === 'useCases') {
        formData.useCases.forEach((useCase, i) => {
          formDataToSubmit.append(`useCases[${i}].name`, useCase.name);
          formDataToSubmit.append(`useCases[${i}].description`, useCase.description);
        });
      } else if (key !== 'image') {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Append image if a new one is selected
    if (formData.image) {
      formDataToSubmit.append('image', formData.image);
    }

    // Call onUpdate with FormData
    onUpdate(formDataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">Edit Assistant</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="form-group mt-4">
          <label className="block mb-2">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

          {/* Image Upload */}
          <div className="form-group mt-4">
          <label className="block mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border rounded"
          />
          {assistant.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Current Image:</p>
              <img 
                src={assistant.imageUrl} 
                alt="Current Assistant" 
                className="mt-2 max-w-[200px] max-h-[200px] object-cover"
              />
            </div>
          )}
        </div>

        <div className="form-group mt-4">
          <label className="block mb-2">Key Benefits</label>
          {formData.keyBenefits.map((benefit, index) => (
            <input
              key={index}
              type="text"
              value={benefit}
              onChange={(e) => handleKeyBenefitsChange(index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
        </div>

        <div className="form-group mt-4">
          <label className="block mb-2">Use Cases</label>
          {formData.useCases.map((useCase, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={useCase.name}
                onChange={(e) => handleUseCaseChange(index, 'name', e.target.value)}
                placeholder="Use Case Name"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={useCase.description}
                onChange={(e) => handleUseCaseChange(index, 'description', e.target.value)}
                placeholder="Use Case Description"
                className="p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <div className="form-group mt-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Active
          </label>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Assistant
          </button>
        </div>
      </form>
    </div>
  );
}




