// Contour Plots created using D3

import * as d3 from 'd3'
import { PlotConfig, DatasetConfig, ParameterConfig } from '../PlotTypes'

const sigma = n => 1 - Math.E ** (-0.5 * n ** 2)

const rectbin = (x: number[], y: number[], bins, x_axis, y_axis) => {
    const data = d3.zip(x, y) as [number, number][]
    const values = Array((bins + 1) ** 2).fill(0)

    // Based on density estimation in d3-contour/density.js
    // https://github.com/d3/d3-contour/blob/b7a119dedb0e242e7823621b887422a6cf689fb6/src/density.js#L37
    data.forEach(d => {
        const x_pos = x_axis(d[0])
        const y_pos = y_axis(d[1])

        const x_index = Math.floor(x_pos)
        const y_index = Math.floor(y_pos)
        const x_percent = x_pos - x_index - 0.5
        const y_percent = y_pos - y_index - 0.5

        values[x_index + y_index * bins] += (1 - x_percent) * (1 - y_percent)
        values[x_index + 1 + y_index * bins] += x_percent * (1 - y_percent)
        values[x_index + 1 + (y_index + 1) * bins] += x_percent * y_percent
        values[x_index + (y_index + 1) * bins] += (1 - x_percent) * y_percent
    })

    // // Simpler binning method
    // data.forEach((d, i, data) => {
    //     const x_pos = x_axis(d[0]);
    //     const y_pos = y_axis(d[1]);
    //     const x_index = Math.floor(x_pos);
    //     const y_index = Math.floor(y_pos);
    //     values[x_index + y_index * bins] += 1
    // });

    return values
}

const create = (
    el: HTMLElement,
    dataset: DatasetConfig,
    parameter_x: ParameterConfig,
    parameter_y: ParameterConfig,
    config: PlotConfig
) => {
    const sigmas = dataset.sigmas.map(sigma)

    // Select main svg element
    const svg = d3.select(el)

    // *// Adds dot points to show each data point. Massively slows render speed, but could be a toggled functionality.

    // const data = d3.zip(x, y) as [number, number][]

    // // Add X axis
    // const x_axis = d3
    //     .scaleLinear()
    //     .domain(d3.extent(x))
    //     .range([0, layout.width]);

    // // Add Y axis
    // const y_axis = d3
    //     .scaleLinear()
    //     .domain(d3.extent(y))
    //     .range([layout.height, 0]);

    // // Add dots
    // svg.append('g')
    //     // .attr('opacity', 0.5)
    //     .selectAll('dot')
    //     .data(data)
    //     .join('circle')
    //     .attr('cx', function (d) {
    //         return x_axis(d[0]);
    //     })
    //     .attr('cy', function (d) {
    //         return y_axis(d[1]);
    //     })
    //     .attr('r', 1);
    // *//

    // Extract x and y values from dataset
    const x_data = dataset.data[parameter_x.name]
    const y_data = dataset.data[parameter_y.name]
    const x_axis = d3.scaleLinear().domain(parameter_x.domain).range([0, dataset.bins])
    const y_axis = d3.scaleLinear().domain(parameter_y.domain).range([dataset.bins, 0])

    // Calculate and smooth bins
    const bins = rectbin(x_data, y_data, dataset.bins, x_axis, y_axis)
    d3.blur2({ data: bins, width: dataset.bins }, dataset.blur_radius)

    // Calculate the contours
    const contours = d3
        .contours()
        .size([dataset.bins, dataset.bins])
        .thresholds((v: number[]) => {
            const v_sort = d3.sort(v)
            const v_cum = d3.cumsum(v_sort)
            const thresholds = sigmas.map(v => (1 - v) * v_cum[v_cum.length - 1])
            return thresholds.map(v => v_sort[v_cum.findIndex(v_c => v_c > v)])
        })(bins)

    // Transform contours to the correct size for the svg
    const contour_x_scale = config.subplot_size / dataset.bins
    const contour_y_scale = config.subplot_size / dataset.bins
    const contour_transform = d3.geoTransform({
        point: function (x, y) {
            this.stream.point(contour_x_scale * x, contour_y_scale * y)
        }
    })

    // Add contours to svg element
    svg.append('g')
        .selectAll('path')
        .data(contours)
        .join('path')
        .attr('stroke-width', dataset.line_width)
        .attr('stroke', dataset.color)
        .attr('fill', dataset.color)
        .attr('fill-opacity', (_, i) => (i + 1) / contours.length / 2)
        .attr('stroke-opacity', 1)
        .attr('d', d3.geoPath().projection(contour_transform))
}

const destroy = el => {
    d3.select(el).selectAll('*').remove()
}

export default { create, destroy }
