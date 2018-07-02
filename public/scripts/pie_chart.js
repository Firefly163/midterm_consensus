const pinkArray = ["#e57e77", "#b2625d", "#ff9891", "#7f4642", "#331c1a", "#ffbab5"];
const tealArray = ["#49c5b6", "#2b766d", "#153b36", "#41b1a3", "#7fd6cb", "#a4e2da"];

function renderChart (data, elmID){
  if (data.filter(elm => elm.points > 0).length === 0) {
    document.getElementById(elmID).innerHTML = " ";
    return;
  }
  const dataTable = [
    ["Task", "Hours per Day"]
    ]
    .concat(data.map(elm => [elm.choice, elm.points]))
    google.charts.load("current", {"packages":["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var chartData = google.visualization.arrayToDataTable(dataTable);
      var options   = {
        title:            "",
        colors:           tealArray,
        backgroundColor:  '#ffc6c2',
        pieSliceBorderColor: '#ffc6c2',
        chartArea:        {width:'75%',height:'75%'},
        fontName:         "Quicksand",
        legend:           {position: "bottom"
        }
      };
      var chart = new google.visualization.PieChart(document.getElementById(elmID));
      chart.draw(chartData, options);
    };
};
