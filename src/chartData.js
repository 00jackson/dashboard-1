export const doughnutChartData1 = {
    labels: ['Not Connected (2)', 'Connected (2)'],
    datasets: [
      {
        label: 'Votes',
        data: [2, 2],
        backgroundColor: [
        '#dee2e6',
          '#00bbf9',
        ],
        borderColor: [
            '#dee2e6',
            '#00bbf9',
        ],
        borderWidth: 0.5,
        hoverOffset: 4
      },
    ],
  };

  export const doughnutChartData2 = {
    labels: ['Failed (1689)', 'Warning (681)', 'Not Available (36)', 'Passed (7253)'],
    datasets: [
      {
        label: 'Compliance Status',
        data: [1689, 681, 36, 7253],
        backgroundColor: [
          '#ff6384',  
          '#ffcd56',  
          '#c9c9c9',  
          '#4bc0c0',  
        ],
        borderColor: [
          '#ff6384',
          '#ffcd56',
          '#c9c9c9',
          '#4bc0c0',
        ],
        borderWidth: 0.5,
        hoverOffset: 4,
      },
    ],
  };


  export const BarChartData1 = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Image Risk Assessment',
        data: [11, 16, 7, 3],
        backgroundColor: [
          'rgb(255, 99, 132)',  
          'rgb(75, 192, 192)',  
          'rgb(255, 205, 86)',  
          'rgb(201, 203, 207)', 
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  export const BarChartData2 = {
    labels: ['Passed', 'Failed', 'Warning', 'Not Scanned'],
    datasets: [
      {
        label: 'Image Security Issues',
        data: [14, 300, 100, 50],
        backgroundColor: [
          'rgb(54, 162, 235)',  
          'rgb(255, 99, 132)',  
          'rgb(255, 205, 86)', 
          'rgb(201, 203, 207)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };