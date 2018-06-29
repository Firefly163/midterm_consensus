

function renderChart (data, elmID){
  console.log(data);
  if (data.filter(elm => elm.points > 0).length === 0) {
    document.getElementById(elmID).innerHTML = 'No Data';
    return;
  }
  const dataTable = [
    ['Task', 'Hours per Day']
    ]
    .concat(data.map(elm => [elm.choice, elm.points]))
  google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var chartData = google.visualization.arrayToDataTable(dataTable);
      var options = {
        title: 'My choices'
      };
      var chart = new google.visualization.PieChart(document.getElementById(elmID));
      chart.draw(chartData, options);
    }
}
