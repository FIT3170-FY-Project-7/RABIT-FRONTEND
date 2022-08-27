// Histogram plots created using D3

import * as d3 from 'd3'
import { PlotConfig, DatasetConfig, ParameterConfig } from '../PlotTypes'

const create = (el: HTMLElement, dataset: DatasetConfig, parameter: ParameterConfig, config: PlotConfig) => {
    // Select main svg element
    const svg = d3.select(el)

    // Extract data from dataset
    const data = dataset.data[parameter.name]

    const equalThresholds = (data, min, max) => d3.range(dataset.bins).map(t => min + (t / dataset.bins) * (max - min))
    const raw_bins = d3
        .bin()
        .domain(parameter.domain)
        .thresholds(equalThresholds)(data)
        .map(bin => ({ value: bin.length, x0: bin.x0, x1: bin.x1 }))

    // Smooth bin values
    const bin_values = raw_bins.map(bin => bin.value)
    d3.blur(bin_values, dataset.blur_radius)
    const bins = d3.zip(raw_bins, bin_values).map(([old_bin, new_value]) => ({
        ...old_bin,
        value: new_value
    }))

    const x_axis = d3.scaleLinear().domain(parameter.domain).range([0, config.subplot_size])
    const y_axis = d3
        .scaleLinear()
        .domain([0, d3.max(bins, d => d.value) * 1.1]) // * 1.1 to add space above maximum peak
        .range([config.subplot_size, 0])

    // Create list of line points that will form the path of the histogram.
    // Each point is a [x, y] pair.
    const line_points = bins.reduce((acc, d) => {
        // Add left side of bar
        acc.push([x_axis(d.x0), y_axis(d.value)])
        // Add right side of bar
        acc.push([x_axis(d.x1), y_axis(d.value)])
        return acc
    }, [])

    // Render this list of points as a path.
    svg.append('path')
        .attr('d', d3.line()(line_points))
        .attr('fill', 'none')
        .attr('stroke', dataset.color)
        .style('stroke-width', dataset.line_width)

    // If there are quantiles, calculate and add to svg
    if (dataset.quantiles) {
        const x_s = d3.sort(data)
        dataset.quantiles.forEach(quantile => {
            const quantile_x = d3.quantileSorted(x_s, quantile)

            // draw vertical line
            svg.append('line')
                .attr('x1', x_axis(quantile_x))
                .attr('x2', x_axis(quantile_x))
                .attr('y1', 0)
                .attr('y2', config.subplot_size)
                .attr('stroke', dataset.color)
                .style('stroke-width', dataset.line_width)
                .style('stroke-dasharray', '5, 5')
        })
    }
}

const destroy = el => {
    d3.select(el).selectAll('*').remove()
}

export default { create, destroy }
