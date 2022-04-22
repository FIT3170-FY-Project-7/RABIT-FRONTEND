import { FC, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { alpha, Theme, useTheme } from '@mui/material';
import 'chart.js/auto';
import type { ChartArea, ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

interface WatchListColumn1ChartProps {
  data: any[];
  labels: string[];
}

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea, theme: Theme): CanvasGradient {

  const primaryGradient = ctx.createLinearGradient(6, 6, 6, 150)

  primaryGradient.addColorStop(0, alpha(theme.colors.primary.light, 0.8))
  primaryGradient.addColorStop(0.8, theme.colors.alpha.white[10])
  primaryGradient.addColorStop(1, theme.colors.alpha.white[100])

  return primaryGradient
}

const WatchListColumn1Chart: FC<WatchListColumn1ChartProps> = ({
  data: dataProp,
  labels,
  ...rest
}) => {
  const theme = useTheme();
  const chartRef = useRef<ChartJS<"line">>(null)
  const [chartData, setChartData] = useState<ChartData<"line">>({ datasets: [] })

  const data = {
    datasets: [
      {
        data: dataProp,
        borderWidth: 1,
        /* backgroundColor: createGradient(chartRef.current.ctx, chartRef.current.chartArea, theme), */
        borderColor: theme.colors.primary.main,
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0
      }
    ],
    labels
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: 0
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
            return `Price: $${tooltipItem.yLabel}`;
          }
        }
      }
    }
  };

  useEffect(() => {
    const chart = chartRef.current

    if (!chart) return

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chartRef.current.ctx, chartRef.current.chartArea, theme),
      })),
    };

    setChartData(chartData)
  })

  return (
    <div {...rest}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

WatchListColumn1Chart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default WatchListColumn1Chart;
