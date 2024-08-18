import {create} from 'zustand';

const useWidgetStore = create((set) => ({
  widgets: JSON.parse(localStorage.getItem('widgets')) || {
    CSPM: ['Cloud Accounts', 'Risk Management'],
    CWPP: ['Top 5 Namespace Specific Alerts', 'Workload Alerts'],
    RegistryScan: ['Image Risk Assessment', 'Image Security Issues'],
  },
  addWidget: (category, widgetName) =>
    set((state) => {
      const updatedWidgets = {
        ...state.widgets,
        [category]: [...state.widgets[category], widgetName],
      };
      localStorage.setItem('widgets', JSON.stringify(updatedWidgets));
      return { widgets: updatedWidgets };
    }),
  removeWidget: (category, widgetName) =>
    set((state) => {
      const updatedWidgets = {
        ...state.widgets,
        [category]: state.widgets[category].filter(
          (widget) => widget !== widgetName
        ),
      };
      localStorage.setItem('widgets', JSON.stringify(updatedWidgets));
      return { widgets: updatedWidgets };
    }),
}));

export default useWidgetStore;