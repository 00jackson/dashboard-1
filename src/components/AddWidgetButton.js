import React, { useState, useEffect } from 'react';
import useWidgetStore from '../Store/store';

const AddWidgetButton = ({ activeCategory }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(activeCategory || 'CSPM');
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');

  const selectedWidgets = useWidgetStore((state) => state.widgets[activeTab]);
  const addWidget = useWidgetStore((state) => state.addWidget);
  const removeWidget = useWidgetStore((state) => state.removeWidget);

  const allWidgets = {
    CSPM: ['Cloud Accounts', 'Risk Management', 'Compliance Status'],
    CWPP: ['Top 5 Namespace Specific Alerts', 'Workload Alerts', 'Vulnerability Management'],
    RegistryScan: ['Image Risk Assessment', 'Image Security Issues', 'Container Scanning'],
  };

  useEffect(() => {
    if (activeCategory) {
      setActiveTab(activeCategory);
    }
  }, [activeCategory]);

  const toggleDialog = (e) => {
    e.stopPropagation();
    setIsDialogOpen(!isDialogOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (tab, widget) => {
    if (selectedWidgets.includes(widget)) {
      removeWidget(tab, widget);
    } else {
      addWidget(tab, widget);
    }
  };

  const handleWidgetNameChange = (e) => setNewWidgetName(e.target.value);
  const handleWidgetTextChange = (e) => setNewWidgetText(e.target.value);

  const handleAddWidget = () => {
    if (newWidgetName) {
      addWidget(activeTab, newWidgetName);
      setNewWidgetName('');
      setNewWidgetText('');
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
  };

  const renderCheckboxes = () => {
    if (!allWidgets[activeTab]) {
      console.error('Error: Invalid tab selected');
      return <div>Invalid category selected.</div>;
    }

    return allWidgets[activeTab].map((widget) => (
      <div key={widget} className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={selectedWidgets.includes(widget)}
          onChange={() => handleCheckboxChange(activeTab, widget)}
        />
        <label className="ml-2">{widget}</label>
      </div>
    ));
  };

  return (
    <>
      <button className="bg-gray-200 px-2 py-2 rounded-md" onClick={toggleDialog}>
        + Add Widget
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50" onClick={toggleDialog}>
          <div className="bg-white w-2/5 h-full p-6 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div>
            <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Add Widget</h2>
                  <button onClick={toggleDialog} className="text-gray-900 text-2xl">
                    &times;
                  </button>
                </div>
                <h2 className="font-semibold mb-4 text-gray-500">Personalize your dashboard by adding the following widgets</h2>
              <div className="flex mb-4">
                {['CSPM', 'CWPP', 'RegistryScan'].map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-4 ${activeTab === tab ? 'bg-blue-700 text-white rounded-md' : ''}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div>{renderCheckboxes()}</div>

              <div className="flex flex-col mt-4">
                <input
                  type="text"
                  placeholder="Widget Name"
                  value={newWidgetName}
                  onChange={handleWidgetNameChange}
                  className="mb-2 p-2 border"
                />
                <textarea
                  placeholder="Widget Description"
                  value={newWidgetText}
                  onChange={handleWidgetTextChange}
                  className="mb-2 p-2 border"
                />
                <button onClick={handleAddWidget} className="bg-blue-700 text-white py-2 rounded-md">
                  Add Widget
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={handleCancel} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleConfirm} className="bg-blue-700 text-white px-4 py-2 rounded-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWidgetButton;