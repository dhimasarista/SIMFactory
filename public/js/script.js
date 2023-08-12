window.onload = function() {
    if (window.location.pathname === '/login') {
      // Mengalihkan kembali ke root path saat tombol reload ditekan
      window.location.href = '/';
    }
  };

  /* global Chart:false */

$(function () {
  'use strict'
  var salesChartCanvas = $('#salesChart').get(0).getContext('2d')

  var salesChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4',],
    datasets: [
      {
        label: 'Model1',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [8000, 5323, 3894, 7340, 0]
      },
      {
        label: 'Model2',
        backgroundColor: 'rgba(19,156,117,1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [6172, 7373, 7218, 5698, 0]
      },
      {
        label: 'Model3',
        backgroundColor: 'rgba(255, 200, 0, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [7438, 5343, 6873, 6291, 0]
      },
      {
        label: 'Model4',
        backgroundColor: 'rgba(255, 0, 64, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [7838, 5694 , 5963, 8000, 0]
      }
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: true
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  // eslint-disable-next-line no-unused-vars
  var salesChart = new Chart(salesChartCanvas, {
    type: 'bar',
    data: salesChartData,
    options: salesChartOptions
  }
  )
  })

// lgtm [js/unused-local-variable]
