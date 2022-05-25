import { FC } from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import { useTheme } from '@mui/material'
import 'chart.js/auto'
import type { ChartOptions, TooltipItem } from 'chart.js'

interface ChartProps {
    data: any
}

const AccountBalanceChart: FC<ChartProps> = ({ data: dataProp, ...rest }) => {
    const theme = useTheme()

    const data = {
        datasets: dataProp.datasets.map(dataset => ({
            ...dataset,
            borderWidth: 10,
            borderColor: theme.colors.alpha.white[100],
            hoverBorderColor: theme.colors.alpha.white[30]
        })),
        labels: dataProp.labels
    }

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,

        layout: { padding: 0 },

        plugins: {
            legend: { display: false },

            tooltip: {
                enabled: true,
                caretSize: 6,
                displayColors: false,
                mode: 'index', // Index replaces label, see https://www.chartjs.org/docs/2.7.3/general/interactions/modes.html.
                intersect: true,
                padding: {
                    top: 8,
                    bottom: 8,
                    left: 16,
                    right: 16
                },
                borderWidth: 2,
                bodySpacing: 10,
                borderColor: theme.colors.alpha.black[30],
                backgroundColor: theme.palette.common.white,
                titleColor: theme.palette.common.black,
                bodyColor: theme.palette.common.black,
                footerColor: theme.palette.common.black,
                callbacks: {
                    label: (tooltipItem: TooltipItem<'doughnut'>) =>
                        `${tooltipItem.label}: ${tooltipItem.dataset.data[tooltipItem.dataIndex]}%`
                }
            }
        },

        cutout: '60%'
    }

    return <Doughnut data={data} options={options} {...rest} />
}

AccountBalanceChart.propTypes = {
    data: PropTypes.object.isRequired
}

export default AccountBalanceChart
