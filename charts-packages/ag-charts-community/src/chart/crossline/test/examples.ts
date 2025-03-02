import { AgCartesianChartOptions } from "../../agChartOptions"
import { DATA_MEAN_SEA_LEVEL } from "../../test/data";
import { loadExampleOptions } from "../../test/utils";


export const GROUPED_BAR_CHART_EXAMPLE: AgCartesianChartOptions = loadExampleOptions('grouped-bar');
export const GROUPED_COLUMN_EXAMPLE: AgCartesianChartOptions = loadExampleOptions('grouped-column');
export const LINE_GRAPH_WITH_GAPS_EXAMPLE: AgCartesianChartOptions = loadExampleOptions('line-with-gaps');
export const XY_HISTOGRAM_WITH_MEAN_EXAMPLE: AgCartesianChartOptions = loadExampleOptions('xy-histogram-with-mean-aggregation');
export const AREA_GRAPH_WITH_NEGATIVE_VALUES_EXAMPLE: AgCartesianChartOptions = loadExampleOptions('area-with-negative-values');


const xAxisCrossLineStyle = {
    fill: 'rgba(0,118,0,0.5)',
    fillOpacity: 0.2,
    stroke: 'green',
    strokeWidth: 1,
}

const yAxisCrossLineStyle = {
    fill: 'pink',
    fillOpacity: 0.2,
    stroke: 'red',
    strokeWidth: 1,
}

export const SCATTER_CROSSLINES: AgCartesianChartOptions = {
    title: {
        text: 'Mean Sea Level (mm)',
    },
    data: DATA_MEAN_SEA_LEVEL,
    padding: {
        top: 40,
        right: 60
    },
    series: [
        {
            type: 'scatter',
            xKey: 'time',
            yKey: 'mm',
        },
    ],
    axes: [
        {
            position: 'left',
            type: 'number',
            crossLines: [
                {
                    type: 'range',
                    range: [10, 30],
                    label: {
                        text: '10 - 30',
                        position: 'right',
                    },
                    ...yAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 60,
                    label: {
                        text: '60',
                        position: 'right',
                    },
                    ...yAxisCrossLineStyle
                },
            ],
        },
        {
            position: 'bottom',
            type: 'number',
            crossLines: [
                {
                    type: 'range',
                    range: [2001, 2003],
                    label: {
                        text: '2001 - 2003',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'range',
                    range: [2013, 2014],
                    label: {
                        text: '2013 - 20014',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 2008,
                    label: {
                        text: '2008',
                    },
                    ...xAxisCrossLineStyle
                },
            ],
        },
    ],
    legend: {
        enabled: true,
        position: "right"
    },
}

export const LINE_CROSSLINES: AgCartesianChartOptions = {
    ...LINE_GRAPH_WITH_GAPS_EXAMPLE,
    padding: {
        top: 30,
        right: 30
    },
    axes: [
        {
            type: 'category',
            position: 'bottom',
            title: {
                text: 'Week',
            },
            label: {
                formatter: (params) => (params.index % 3 ? '' : params.value),
            },
            crossLines: [
                {
                    type: 'range',
                    range: ['1', '13'],
                    label: {
                        text: '1 - 13',
                        position: 'top'
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'range',
                    range: ['34', '45'],
                    label: {
                        text: '34 - 45',
                        position: 'top'
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: '27',
                    label: {
                        text: '27',
                        position: 'top'
                    },
                    ...xAxisCrossLineStyle
                },
            ],
        },
        {
            type: 'number',
            position: 'left',
            title: {
                text: '£ per kg',
            },
            nice: false,
            min: 0.2,
            max: 1,
            crossLines: [
                {
                    type: 'range',
                    range: [0.25, 0.33],
                    label: {
                        text: '0.25 - 0.33',
                        position: 'insideLeft',
                        padding: 10
                    },
                    ...yAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 0.87,
                    label: {
                        text: '0.87',
                        position: 'topRight',
                    },
                    ...yAxisCrossLineStyle
                },
            ],
        },
    ]
}

export const AREA_CROSSLINES: AgCartesianChartOptions = {
    ...AREA_GRAPH_WITH_NEGATIVE_VALUES_EXAMPLE,
    padding: {
        top: 30,
        right: 30
    },
    axes: [
        {
            type: 'category',
            position: 'bottom',
            crossLines: [
                {
                    type: 'range',
                    range: ['Q1', 'Q2'],
                    label: {
                        text: 'Q1 - Q2',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'range',
                    range: ['Q3', 'Q4'],
                    label: {
                        text: 'Q3 - Q4',
                    },
                    ...xAxisCrossLineStyle
                },
            ],
        },
        {
            type: 'number',
            position: 'left',
            title: {
                text: 'Thousand tonnes of oil equivalent',
            },
            crossLines: [
                {
                    type: 'range',
                    range: [800, 1000],
                    label: {
                        text: '800 - 1000',
                        position: 'insideBottomLeft'
                    },
                    ...yAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: -700,
                    label: {
                        text: '-700',
                        position: 'topLeft'
                    },
                    ...yAxisCrossLineStyle
                },
            ],
        },
    ],
}

export const COLUMN_CROSSLINES: AgCartesianChartOptions = {
    ...GROUPED_COLUMN_EXAMPLE,
    padding: {
        top: 30,
        right: 30
    },
    axes: [
        {
            position: 'bottom',
            type: 'category',
            crossLines: [
                {
                    type: 'range',
                    range: ['2015', '2016'],
                    label: {
                        text: '2015 - 2016',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'range',
                    range: ['2017', '2019'],
                    label: {
                        text: '2017 - 2019',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: '2012',
                    label: {
                        text: '2012',
                    },
                    ...xAxisCrossLineStyle
                },
            ],
        },
        {
            position: 'left',
            type: 'number',
            crossLines: [
                {
                    type: 'range',
                    range: [7000, 8000],
                    label: {
                        text: '7000 - 8000',
                        position: 'right',
                        rotation: -90
                    },
                    ...yAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 3500,
                    label: {
                        text: '3500',
                        position: 'right',
                        rotation: -90
                    },
                    ...yAxisCrossLineStyle
                },
            ],
        },
    ],
}

export const BAR_CROSSLINES: AgCartesianChartOptions = {
    ...GROUPED_BAR_CHART_EXAMPLE,
    padding: {
        top: 30,
        right: 30
    },
    axes: [
        {
            position: 'left',
            type: 'category',
            crossLines: [
                {
                    type: 'range',
                    range: ['Whole economy', 'Public sector'],
                    label: {
                        text: 'Whole economy - Public sector',
                        position: 'right',
                        rotation: -90
                    },
                    ...yAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 'Manufacturing',
                    label: {
                        text: 'Manufacturing',
                        position: 'right',
                        rotation: -90
                    },
                    ...yAxisCrossLineStyle
                },
            ],
        },
        {
            position: 'bottom',
            type: 'number',
            crossLines: [
                {
                    type: 'range',
                    range: [0.5, 1.4],
                    label: {
                        text: '0.5 - 1.4',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'range',
                    range: [2.3, 2.5],
                    label: {
                        text: '2.3 - 2.5',
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 3.6,
                    label: {
                        text: '3.6',
                    },
                    ...xAxisCrossLineStyle
                }
            ],
        },
    ],
}

export const HISTOGRAM_CROSSLINES: AgCartesianChartOptions = {
    ...XY_HISTOGRAM_WITH_MEAN_EXAMPLE,
    padding: {
        top: 30,
        right: 30
    },
    axes: [
        {
            position: 'bottom',
            type: 'number',
            title: {
                enabled: true,
                text: 'Engine Size (Cubic inches)',
            },
            crossLines: [
                {
                    type: 'range',
                    range: [70, 100],
                    label: {
                        text: '70 - 100'
                    },
                    ...xAxisCrossLineStyle,
                },
                {
                    type: 'range',
                    range: [200, 285],
                    label: {
                        text: '200 - 285'
                    },
                    ...xAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 300,
                    label: {
                        text: '300'
                    },
                    ...xAxisCrossLineStyle
                },
            ],
        },
        {
            position: 'left',
            type: 'number',
            title: {
                text: 'Highway MPG',
            },
            crossLines: [
                {
                    type: 'range',
                    range: [10, 15],
                    label: {
                        text: '70 - 100',
                        position: 'insideTopRight',
                        color: 'orange'
                    },
                    ...yAxisCrossLineStyle
                },
                {
                    type: 'line',
                    value: 50,
                    label: {
                        text: '50',
                        position: 'bottomRight',
                        color: 'orange'
                    },
                    ...yAxisCrossLineStyle
                },
            ],
        },
    ],
}