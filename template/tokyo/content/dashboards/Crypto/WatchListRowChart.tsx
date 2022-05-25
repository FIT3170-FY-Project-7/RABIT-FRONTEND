import { FC } from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { useTheme } from '@mui/material'
import 'chart.js/auto'
import type { ChartOptions } from 'chart.js'

interface WatchListRowChartProps {
    data: any[]
    labels: string[]
}

const WatchListRowChart: FC<WatchListRowChartProps> = ({ data: dataProp, labels, ...rest }) => {
    const theme = useTheme()

    const data = {
        datasets: [
            {
                data: dataProp,
                borderWidth: 3,
                backgroundColor: 'transparent',
                borderColor: theme.colors.primary.main,
                pointBorderWidth: 0,
                pointRadius: 0,
                pointHoverRadius: 0
            }
        ],
        labels
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: 5
        },

        scales: {
            xAxes: {
                grid: { display: false, drawBorder: false },
                ticks: { display: false }
            },
            yAxes: {
                grid: { display: false },
                ticks: { display: false }
            }
        },

        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false,
                caretSize: 6,
                displayColors: false,
                padding: {
                    top: 8,
                    bottom: 8,
                    left: 16,
                    right: 16
                },
                borderWidth: 4,
                borderColor: theme.palette.common.black,
                backgroundColor: theme.palette.common.black,
                titleColor: theme.palette.common.white,
                bodyColor: theme.palette.common.white,
                footerColor: theme.palette.common.white,
                callbacks: {
                    title: () => '',
                    label: (tooltipItem: any) => {
                        return `Price: $${tooltipItem.yLabel}`
                    }
                }
            }
        }
    }

    return (
        <div {...rest}>
            <Line data={data} options={options} />
        </div>
    )
}

WatchListRowChart.propTypes = {
    data: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired
}

export default WatchListRowChart
