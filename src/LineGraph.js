import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

// options is pre defined in chart.js documentation, it is needed for the
// design that we see in the graph
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    // when u hover over graph it will show value
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: 'll'
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}

function LineGraph({ casesType='cases', ...props}) {
    const [data, setData] = useState({});
    // "https://disease.sh/v3/covid-19/historical/all?lastdays=120"

    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;

        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    // total cases today - total cases yesterday = jump in cases
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                // clever stuff here
                let chartData = buildChartData(data, casesType);
                setData(chartData);
            })
        }
        
        fetchData();

    }, [casesType])

    return (
        <div className= {props.className}>
            {/* if data exist */}
            {data?.length > 0 && (
            <Line 
                options={options}
                data= {{
                    datasets: [
                        {
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data: data,
                        }
                    ]
                }}
            />
            )}      
        </div>
    )
}

export default LineGraph
