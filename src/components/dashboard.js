import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react'; 
import Category from './Category';
import Category1 from './Category1';
import Category2 from './Category2';
import Navbar from './navbar';
import useWidgetStore from '../Store/store';

const Dashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('CSPM');
  const [selectedWidgets, setSelectedWidgets] = useState({
    CSPM: [],
    CWPP: [],
    RegistryScan: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');

  const selectedWidgetsState = useWidgetStore((state) => state.widgets);
  const addWidget = useWidgetStore((state) => state.addWidget);
  const removeWidget = useWidgetStore((state) => state.removeWidget);

  const allWidgets = {
    CSPM: ['Cloud Accounts', 'Risk Management', 'Compliance Status'],
    CWPP: ['Top 5 Namespace Specific Alerts', 'Workload Alerts', 'Vulnerability Management'],
    RegistryScan: ['Image Risk Assessment', 'Image Security Issues', 'Container Scanning'],
  };

  useEffect(() => {
    setSelectedWidgets(selectedWidgetsState);
  }, [selectedWidgetsState]);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (widget) => {
    setSelectedWidgets((prev) => {
      const updatedWidgets = prev[activeTab].includes(widget)
        ? prev[activeTab].filter((w) => w !== widget)
        : [...prev[activeTab], widget];
      return { ...prev, [activeTab]: updatedWidgets };
    });
    if (selectedWidgets[activeTab].includes(widget)) {
      removeWidget(activeTab, widget);
    } else {
      addWidget(activeTab, widget);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    if (query === '') {
      setSearchQuery('');
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

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const filteredWidgets = {
    CSPM: searchQuery ? allWidgets.CSPM.filter(widget => widget.toLowerCase().includes(searchQuery)) : allWidgets.CSPM,
    CWPP: searchQuery ? allWidgets.CWPP.filter(widget => widget.toLowerCase().includes(searchQuery)) : allWidgets.CWPP,
    RegistryScan: searchQuery ? allWidgets.RegistryScan.filter(widget => widget.toLowerCase().includes(searchQuery)) : allWidgets.RegistryScan,
  };

  const renderCategories = () => {
    if (
      searchQuery &&
      !filteredWidgets.CSPM.length &&
      !filteredWidgets.CWPP.length &&
      !filteredWidgets.RegistryScan.length
    ) {
      return <p>Sorry, there's nothing we could find.</p>;
    }

    return (
      <>
        {filteredWidgets.CSPM.length > 0 && (
          <Category name="CSPM" widgets={selectedWidgets.CSPM} />
        )}
        {filteredWidgets.CWPP.length > 0 && (
          <Category1 name="CWPP" widgets={selectedWidgets.CWPP} />
        )}
        {filteredWidgets.RegistryScan.length > 0 && (
          <Category2 name="RegistryScan" widgets={selectedWidgets.RegistryScan} />
        )}
      </>
    );
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} />
      <div className="mt-6 p-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">CNAPP Dashboard</h2>
          <div className="flex items-center space-x-2">
          <button onClick={handleRefresh} className="bg-gray-200 text-gray-700 px-2 py-2 rounded-md">
              <RefreshCw size={24} />
            </button>
            <button 
              className="bg-blue-700 text-white px-2 py-2 rounded-md"
              onClick={toggleDialog}
            >
              + Add Widget 
            </button>
          </div>
        </div> 
        <div className="space-y-4 text-gray-600">
          {renderCategories()}
        </div>

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
                <div className="flex space-x-4 my-4">
                  <button
                    className={`px-4 py-2 ${activeTab === 'CSPM' ? 'bg-blue-700 text-white rounded-md' : 'bg-gray-100'}`}
                    onClick={() => handleTabChange('CSPM')}
                  >
                    CSPM
                  </button>
                  <button
                    className={`px-4 py-2 ${activeTab === 'CWPP' ? 'bg-blue-700 text-white rounded-md' : 'bg-gray-100'}`}
                    onClick={() => handleTabChange('CWPP')}
                  >
                    CWPP
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === 'RegistryScan' ? 'bg-blue-700 text-white rounded-md' : 'bg-gray-100'
                    }`}
                    onClick={() => handleTabChange('RegistryScan')}
                  >
                    Registry Scan
                  </button>
                </div>

                <div className="mb-4">
                  {filteredWidgets[activeTab].map(widget => (
                    <div key={widget} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedWidgets[activeTab].includes(widget)}
                        onChange={() => handleCheckboxChange(widget)}
                        className="mr-2"
                      />
                      <label>{widget}</label>
                    </div>
                  ))}
                </div>

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
      </div>
    </div>
  );
};

export default Dashboard;