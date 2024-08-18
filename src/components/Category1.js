import React from 'react';
import { ChartNoAxesCombined } from 'lucide-react'; 
import AddWidgetButton from './AddWidgetButton';
import useWidgetStore from '../Store/store'; 

const Category = ({ name }) => {
  const widgets = useWidgetStore((state) => state.widgets[name]);
  const removeWidget = useWidgetStore((state) => state.removeWidget);

  return (
    <div className="rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="grid grid-cols-3 gap-4">
        {name === "CWPP" && (
          <>
            {widgets.includes('Top 5 Namespace Specific Alerts') && (
              <div className="relative flex flex-col bg-white border-2 p-4 rounded-lg h-60 gap-2 justify-center items-center">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={() => removeWidget('CWPP', 'Top 5 Namespace Specific Alerts')}
                >
                  &times;
                </button>
                <span className='absolute top-4 left-4 text-sm font-semibold'>Top 5 Namespace Specific Alerts</span>
                <ChartNoAxesCombined className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600 mt-2">No graph data available</span>
              </div>
            )}

            {widgets.includes('Workload Alerts') && (
              <div className="relative flex flex-col bg-white border-2 p-4 rounded-lg h-60 gap-2 justify-center items-center">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={() => removeWidget('CWPP', 'Workload Alerts')}
                >
                  &times;
                </button>
                <span className='absolute top-4 left-4 text-sm font-semibold'>Workload Alerts</span>
                <ChartNoAxesCombined className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600 mt-2">No graph data available</span>
              </div>
            )}

            {widgets
              .filter(
                (widget) =>
                  widget !== 'Top 5 Namespace Specific Alerts' && widget !== 'Workload Alerts'
              )
              .map((widget, index) => (
                <div
                  key={index}
                  className="relative flex flex-col bg-white border-2 p-4 rounded-lg h-60 gap-2"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={() => removeWidget('CWPP', widget)}
                  >
                    &times;
                  </button>
                  <span className="text-sm font-semibold mb-4">{widget}</span>
                  <p>Newly added widget content</p>
                </div>
              ))}
          </>
        )}

        <AddWidgetButton activeCategory={name} />
      </div>
    </div>
  );
};

export default Category;