import * as d3 from 'd3'
import { PLOT_CONFIG } from './constants'

const create = (el, layout, x: number[]) => {
    // Generate svg element within containing div element
    const svg = d3
        .select(el)
        .append('svg')
        .attr('class', 'd3')
        .attr('width', layout.width)
        .attr('height', layout.height)
        .attr('style', 'outline: thin solid black;')

    const raw_bins = d3
        .bin()
        .thresholds(PLOT_CONFIG.bins)(x)
        .map(bin => ({ value: bin.length, x0: bin.x0, x1: bin.x1 }))

    // Smooth bin values
    const bin_values = raw_bins.map(bin => bin.value)
    d3.blur(bin_values, PLOT_CONFIG.blur_radius)
    const bins = d3.zip(raw_bins, bin_values).map(([old_bin, new_value]) => ({
        ...old_bin,
        value: new_value
    }))

    const x_axis = d3.scaleLinear().domain(d3.extent(x)).range([0, layout.width])
    const y_axis = d3
        .scaleLinear()
        .domain([0, d3.max(bins, d => d.value) * 1.1]) // * 1.1 to add space above maximum peak
        .range([layout.height, 0])

    // Add histogram rectangles to svg
    svg.selectAll('rect')
        .data(bins)
        .join('rect')
        .attr('x', 1)
        .attr('transform', function (d) {
            return `translate(${x_axis(d.x0)}, ${y_axis(d.value)})`
        })
        .attr('width', function (d) {
            return x_axis(d.x1) - x_axis(d.x0) + 1
        })
        .attr('height', function (d) {
            return layout.height - y_axis(d.value)
        })
        .style('fill', '#0088ff')

    // If there are quantiles, calculate and add to svg
    if (PLOT_CONFIG.quantiles) {
        const x_s = d3.sort(x)
        PLOT_CONFIG.quantiles.forEach(quantile => {
            const quantile_x = d3.quantileSorted(x_s, quantile)

            // draw vertical line
            svg.append('line')
                .attr('x1', x_axis(quantile_x))
                .attr('x2', x_axis(quantile_x))
                .attr('y1', 0)
                .attr('y2', layout.height)
                .attr('stroke', 'red')
        })
    }
}

const destroy = el => {
    d3.select(el).select('svg').remove()
}

export default { create, destroy }
