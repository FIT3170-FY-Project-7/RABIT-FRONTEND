import * as d3 from 'd3'
import { PlotConfig, ParameterConfig } from '../PlotTypes'

const create = (el: HTMLElement, parameter: ParameterConfig, config: PlotConfig) => {
    // Append SVG
    const svg = d3
        .select(el)
        .append('svg')
        .attr('class', 'd3')
        .attr('width', config.axis.size)
        .attr('height', config.subplot_size)
        .style('overflow', 'visible')

    // Labeling
    svg.append('foreignObject')
        .attr('width', config.subplot_size)
        .attr('height', config.axis.size)
        .append('xhtml:div')
        .style('height', '100%')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .html(parameter.display_text)

    // Create scale
    const scale = d3
        .scaleLinear()
        .domain(parameter.domain)
        .range([0, config.subplot_size - 1])

    // Add scales to axis
    const x_axis = d3.axisBottom(scale).ticks(config.axis.ticks).tickSize(config.axis.tickSize)

    // Append group and insert axis
    svg.append('g').call(x_axis)
}

const destroy = el => {
    // Destroy
    d3.select(el).select('svg').remove()
}

export default { create, destroy }
