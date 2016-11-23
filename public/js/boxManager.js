var Data = {};

$(function() {
    // There is a bug occurs when two Multiselectors in one page.
    // I give it a public increment for specify selector.
    Data.SelectorIndex = 0;
});

// $(function() {
//     var canvas = document.createElement("canvas");
//     canvas.width = 24;
//     canvas.height = 24;
//     // document.body.appendChild(canvas);
//     var ctx = canvas.getContext("2d");
//     ctx.fillStyle = "#d9534f";
//     ctx.font = "24px FontAwesome";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText("\uf1f8", 12, 12);
//     var dataURL = canvas.toDataURL('image/png');
//     $('.delete-cursor').css('cursor', 'url('+dataURL+'), auto');
    
//     var canvas2 = document.createElement("canvas");
//     canvas2.width = 24;
//     canvas2.height = 24;
//     // document.body.appendChild(canvas2);
//     var ctx = canvas2.getContext("2d");
//     ctx.fillStyle = "#3c763d";
//     ctx.font = "24px FontAwesome";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText("\uf07a", 12, 12);
//     var dataURL = canvas2.toDataURL('image/png');
//     $('.cart-cursor').css('cursor', 'url('+dataURL+'), auto');
    
//     var canvas3 = document.createElement("canvas");
//     canvas3.width = 24;
//     canvas3.height = 24;
//     // document.body.appendChild(canvas3);
//     var ctx = canvas3.getContext("2d");
//     ctx.fillStyle = "#31708f";
//     ctx.font = "24px FontAwesome";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText("\uf02c", 12, 12);
//     var dataURL = canvas3.toDataURL('image/png');
//     $('.tag-cursor').css('cursor', 'url('+dataURL+'), auto');
// });

$(function() {
    $("#source-selector").treeMultiselect({
        allowBatchSelection: true,
        sortable: false,
        collapsible: true,
        freeze: false,
        hideSidePanel: true,
        onlyBatchSelection: false,
        sectionDelimiter: '/',
        showSectionOnSelected: true,
        startCollapsed: true,
        enableSelectAll: false
    });
    $("#tag-selector").treeMultiselect({
        allowBatchSelection: true,
        sortable: false,
        collapsible: true,
        freeze: false,
        hideSidePanel: true,
        onlyBatchSelection: false,
        sectionDelimiter: '/',
        showSectionOnSelected: true,
        startCollapsed: true,
        enableSelectAll: false
    });
    $("#tagger-selector").treeMultiselect({
        allowBatchSelection: false,
        sortable: false,
        collapsible: true,
        freeze: false,
        hideSidePanel: true,
        onlyBatchSelection: false,
        sectionDelimiter: '/',
        showSectionOnSelected: true,
        startCollapsed: true,
        enableSelectAll: false
    });
});

$(function() {
    $("#file-inputer").fileinput({
        uploadUrl: '#',
        allowedFileExtensions : ['jpg', 'png'],
        overwriteInitial: false,
        maxFileSize: 1000,
        maxFilesNum: 10,
        //allowedFileTypes: ['image', 'video', 'flash'],
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
	});
});

$(function() {
  'use strict';
  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
  var pieChart = new Chart(pieChartCanvas);
  var PieData = [
    {
      value: 700,
      color: "#f56954",
      highlight: "#f56954",
      label: "#f56954"
    },
    {
      value: 500,
      color: "#00a65a",
      highlight: "#00a65a",
      label: "#00a65a"
    },
    {
      value: 400,
      color: "#f39c12",
      highlight: "#f39c12",
      label: "#f39c12"
    },
    {
      value: 600,
      color: "#00c0ef",
      highlight: "#00c0ef",
      label: "#00c0ef"
    },
    {
      value: 300,
      color: "#3c8dbc",
      highlight: "#3c8dbc",
      label: "#3c8dbc"
    },
    {
      value: 100,
      color: "#d2d6de",
      highlight: "#d2d6de",
      label: "#d2d6de"
    }
  ];
  var pieOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,
    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth: 1,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout: 50, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps: 80,
    //String - Animation easing effect ex:easeOutBounce
    animationEasing: "easeOutQuad",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: false,
    //Boolean - whether to make the chart responsive to window resizing
    responsive: true,
    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: false,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
    //String - A tooltip template
    tooltipTemplate: "<%=label%> : <%=value %>"
  };
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  pieChart.Doughnut(PieData, pieOptions);
  //-----------------
  //- END PIE CHART -
  //-----------------

});

function legendClicker(info) {
    alert(info);
};

// Flot stacked line chart,stacked bar chart - With Data
$(function() {
    var css_id = "#flot-stacked-chart";
    var day1 = new Date("2016/07/01 9:00:00");
    var day2 = new Date("2016/07/02 9:00:00");
    var day3 = new Date("2016/07/03 9:00:00");
    var day4 = new Date("2016/07/04 9:00:00");
    var day5 = new Date("2016/07/05 9:00:00");
    var data = [
        {label: '255, 0, 0', data: [[day1,300], [day2,300], [day3,300], [day4,300], [day5,300]], color: "red"},
        {label: '255, 255, 0', data: [[day1,800], [day2,600], [day3,400], [day4,200], [day5,0]], color: "yellow"},
        {label: '0, 255, 0', data: [[day1,100], [day2,200], [day3,300], [day4,400], [day5,500]], color: "green"}
    ];
    // var data = [
    //     {label: '255, 0, 0', data: [[day1,300]], color: "red"},
    //     {label: '255, 255, 0', data: [[day1,800]], color: "yellow"},
    //     {label: '0, 255, 0', data: [[day1,100]], color: "green"}
    // ];
    var options = {
        series: {
            stack: true,
            lines: {
                show: false,
                steps: false
            },
            bars: {
                show: true,
                barWidth: 12 * 60 * 60 * 1000,
                align: 'center'
            },
            grow: {
                active: true,
                duration: 1500
            }
        },
        xaxis: {
            mode: "time",
            tickSize: [1, "day"],
            timeformat: "%y/%m/%d",
            min: (new Date("2016/06/30 9:00:00")).getTime(),
            max: (new Date("2016/07/06 9:00:00")).getTime()
        },
        grid: {
            hoverable: true,
            clickable: true,
            borderWidth: 1
        },
        tooltip: true,
        tooltipOpts: {
            content: "RGB(%s): %y",
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    };

    $.plot($(css_id), data, options);

    $(css_id).bind("plotclick", function(event, pos, obj) {
        if (!obj) {
            return;
        }
        legendClicker('stack is clicked:'+obj.series.label+'|'+obj.series.data[obj.dataIndex][1]);
    });
});

$(function() {
    $('img.lazy').lazyload();

    var $container = $('#main-galary');
    $container.imagesLoaded(function() {
        $container.masonry({
            itemSelector: '.picture-box'
        });
        $('.picture-box img').addClass('not-loaded');
        $('.picture-box img.not-loaded').lazyload({
            load: function() {
                $(this).removeClass("not-loaded");
                $container.masonry('reloadItems');
                $container.masonry('layout');
            }
        });
        $('.picture-box img.not-loaded').trigger('scroll');
    });
});

function beginTag() {
    //
};
