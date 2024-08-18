import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { doughnutChartData1, doughnutChartData2 } from '../chartData';
import AddWidgetButton from './AddWidgetButton';
import useWidgetStore from '../Store/store'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const Category = ({ name }) => {
  const widgets = useWidgetStore((state) => state.widgets[name]);
  const removeWidget = useWidgetStore((state) => state.removeWidget);

  return (
    <div className="rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="grid grid-cols-3 gap-4">
        {name === 'CSPM' && (
          <>
            {widgets.includes('Cloud Accounts') && (
              <div className="relative flex flex-col bg-white border-2 p-4 rounded-lg h-60 gap-2">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={() => removeWidget('CSPM', 'Cloud Accounts')}
                >
                  &times;
                </button>
                <span className="text-sm font-semibold mb-4">
                  Cloud Accounts
                </span>
                <div className="flex gap-10">
                  <div className="w-2/5">
                    <Doughnut
                      data={doughnutChartData1}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start w-1/3 ml-4 space-y-1">
                    {doughnutChartData1.labels.map((label, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <span
                          className="inline-block w-3 h-3"
                          style={{
                            backgroundColor:
                              doughnutChartData1.datasets[0].backgroundColor[
                                index
                              ],
                          }}
                        />
                        <span className="text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {widgets.includes('Risk Management') && (
              <div className="relative flex flex-col bg-white border-2 p-4 rounded-lg h-60 gap-2">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={() => removeWidget('CSPM', 'Risk Management')}
                >
                  &times;
                </button>
                <span className="text-sm font-semibold mb-4">
                  Risk Management
                </span>
                <div className="flex gap-10">
                  <div className="w-2/5">
                    <Doughnut
                      data={doughnutChartData2}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start w-1/3 ml-4 space-y-1">
                    {doughnutChartData2.labels.map((label, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <span
                          className="inline-block w-3 h-3"
                          style={{
                            backgroundColor:
                              doughnutChartData2.datasets[0].backgroundColor[
                                index
                              ],
                          }}
                        />
                        <span className="text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {widgets
          .filter(
            (widget) =>
              widget !== 'Cloud Accounts' && widget !== 'Risk Management'
          )
          .map((widget, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white border-2 p-4 rounded-lg h-60 gap-2"
            >
              <button
                className="absolute top-2 right-2 text-red-500"
                onClick={() => removeWidget(name, widget)}
              >
                &times;
              </button>
              <span className="text-sm font-semibold mb-4">{widget}</span>
              <p>Newly added widget content</p>
            </div>
          ))}

        <AddWidgetButton activeCategory={name} />
      </div>
    </div>
  );
};

export default Category;