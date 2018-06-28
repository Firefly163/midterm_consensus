      $(document).ready(function() {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart(arg) {

        var x = [
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ];
        var data = google.visualization.arrayToDataTable(x);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
        // console.log(arg)
        // var x = [['Task', 'Hours per Day'],
        // [arg[0].choice, arg[0].points],
        // [arg[1].choice, arg[1].points]
        // ];



        // for (let elm of arg) {
        //   console.log(elm)
        //   let y = [elm.choice, elm.points];
        //   // console.log(y);
        //   x.push(y);
        // }
        // console.log(x);
        // var data = google.visualization.arrayToDataTable(x);

        // var options = {
        //   title: 'My Daily Activities'
        // };

        // var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        // chart.draw(data, options);
      }
  });

// drawChart()


