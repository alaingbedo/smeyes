'use strict';

app
    // Dashboard Box controller 
    .controller('MyDashboardCtrl', [
        '$rootScope', '$scope', 'MyDashboardService', 'MyService', '$http', function($rootScope, $scope, MyDashboardService, MyService, $http) {


        	$scope.barChartData;
        	$scope.roomsAvailability = [];
        	$scope.rooms = [];
        	$scope.percents = [];
        	$scope.DataTransferChartData = [];
        	$scope.DataTransferChartOptions = [];
            $scope.connectedList = [];





            MyService.getConnected().then(function(resp) {
                $scope.connectedList = resp;
                $scope.lineChartData = {
                    labels: [resp[0].day, resp[1].day, resp[2].day, resp[3].day, resp[4].day, resp[5].day, resp[6].day, resp[7].day + " (today)"],
                    datasets: [
                        {
                            fillColor: "rgba(93, 178, 255,.4)",
                            strokeColor: "rgba(93, 178, 255,.7)",
                            pointColor: "rgba(93, 178, 255,.7)",
                            pointStrokeColor: "#fff",
                            data: [resp[0].total, resp[1].total, resp[2].total, resp[3].total, resp[4].total, resp[5].total, resp[6].total, resp[7].total]
                        }
                    ]

                };
                new Chart(document.getElementById("line").getContext("2d")).Line($scope.lineChartData);
            }, function(err) {
                console.log(err);
            });

            



        	MyDashboardService.getPercent().then(function(response) {
        		$scope.roomsAvailability = response;
        		angular.forEach($scope.roomsAvailability, function(value, key) {
        			$scope.rooms.push(value.room);
        		});

        		angular.forEach($scope.roomsAvailability, function(value, key) {
        			$scope.percents.push(Math.round(value.availability));
        		});
        		$scope.barChartData = {
        		    labels: $scope.rooms,
        		    datasets: [
        		        {
        		            fillColor: $rootScope.settings.color.themeprimary,
        		            strokeColor: $rootScope.settings.color.themeprimary,
        		            data: $scope.percents
        		        }
        		    ]
        		};
        		new Chart(document.getElementById("bar").getContext("2d")).Bar($scope.barChartData, {scaleBeginAtZero : true});




        		$scope.DataTransferChartData = [
        		    {
        		        label: "Rooms",
        		        data: $scope.percents,
        		        bars: {
        		            show: true,
        		            order: 1,
        		            fillColor: { colors: [{ color: $rootScope.settings.color.themethirdcolor }, { color: $rootScope.settings.color.themethirdcolor }] }
        		        },
        		        color: $rootScope.settings.color.themethirdcolor
        		    }
        		];

        		$scope.DataTransferChartOptions = {
        		    bars: {
        		        barWidth: 0.2,
        		        lineWidth: 1,
        		        borderWidth: 0,
        		        fillColor: { colors: [{ opacity: 0.6 }, { opacity: 1 }] }
        		    },
        		    xaxis: {
        		        ticks: [[1, 'Pasteur'], [2, 'Cisco'], [3, 'MidLab'], [4, 'LabSR'], [5, 'SM 14']],
        		        color: '#eee'
        		    },
        		    yaxis: {
        		        color: '#eee'
        		    },
        		    grid: {
        		        hoverable: true,
        		        clickable: false,
        		        borderWidth: 0,
        		        aboveData: false
        		    },
        		    legend: true,
        		    tooltip: true,
        		    tooltipOpts: {
        		        defaultTheme: false,
        		        content: "<b>%s</b> : <span>%x</span> : <span>%y</span>",
        		    }
        		};



        	});












































            $scope.boxWidth = $('.box-tabbs').width() - 20;

            $scope.visitChartData = [
                {
                    color: $rootScope.settings.color.themesecondary,
                    label: "Direct Visits",
                    data: [
                        [3, 2], [4, 5], [5, 4], [6, 11], [7, 12], [8, 11], [9, 8], [10, 14], [11, 12], [12, 16], [13, 9],
                        [14, 10], [15, 14], [16, 15], [17, 9]
                    ],

                    lines: {
                        show: true,
                        fill: true,
                        lineWidth: .1,
                        fillColor: {
                            colors: [
                                {
                                    opacity: 0
                                }, {
                                    opacity: 0.4
                                }
                            ]
                        }
                    },
                    points: {
                        show: false
                    },
                    shadowSize: 0
                },
                {
                    color: $rootScope.settings.color.themeprimary,
                    label: "Referral Visits",
                    data: [
                        [3, 10], [4, 13], [5, 12], [6, 16], [7, 19], [8, 19], [9, 24], [10, 19], [11, 18], [12, 21], [13, 17],
                        [14, 14], [15, 12], [16, 14], [17, 15]
                    ],
                    bars: {
                        order: 1,
                        show: true,
                        borderWidth: 0,
                        barWidth: 0.4,
                        lineWidth: .5,
                        fillColor: {
                            colors: [
                                {
                                    opacity: 0.4
                                }, {
                                    opacity: 1
                                }
                            ]
                        }
                    }
                },
                {
                    color: $rootScope.settings.color.themethirdcolor,
                    label: "Search Engines",
                    data: [
                        [3, 14], [4, 11], [5, 10], [6, 9], [7, 5], [8, 8], [9, 5], [10, 6], [11, 4], [12, 7], [13, 4],
                        [14, 3], [15, 4], [16, 6], [17, 4]
                    ],
                    lines: {
                        show: true,
                        fill: false,
                        fillColor: {
                            colors: [
                                {
                                    opacity: 0.3
                                }, {
                                    opacity: 0
                                }
                            ]
                        }
                    },
                    points: {
                        show: true
                    }
                }
            ];
            $scope.visitChartOptions = {
                legend: {
                    show: false
                },
                xaxis: {
                    tickDecimals: 0,
                    color: '#f3f3f3'
                },
                yaxis: {
                    min: 0,
                    color: '#f3f3f3',
                    tickFormatter: function(val, axis) {
                        return "";
                    },
                },
                grid: {
                    hoverable: true,
                    clickable: false,
                    borderWidth: 0,
                    aboveData: false,
                    color: '#fbfbfb'

                },
                tooltip: true,
                tooltipOpts: {
                    defaultTheme: false,
                    content: " <b>%x May</b> , <b>%s</b> : <span>%y</span>",
                }
            };

            //---Visitor Sources Pie Chart---//
            $scope.visitorSourcePieData = [
                {
                    data: [[1, 21]],
                    color: '#fb6e52'
                },
                {
                    data: [[1, 12]],
                    color: '#e75b8d'
                },
                {
                    data: [[1, 11]],
                    color: '#a0d468'
                },
                {
                    data: [[1, 10]],
                    color: '#ffce55'
                },
                {
                    data: [[1, 46]],
                    color: '#5db2ff'
                }
            ];
            $scope.visitorSourcePieOptions = {
                series: {
                    pie: {
                        innerRadius: 0.45,
                        show: true,
                        stroke: {
                            width: 4
                        }
                    }
                }
            };
        }
    ]);