// The Y axis created using D3

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
  svg
    .append('foreignObject')
    .attr('width', config.subplot_size)
    .attr('height', config.axis.size)
    .attr('transform', `rotate(-90), translate(${-config.subplot_size}, 0)`)
    .style('color', 'white')
    .append('xhtml:div')
    .style('height', '100%')
    .style('display', 'flex')
    .style('justify-content', 'center')
    .style('align-items', 'center')
    .style('word-break', 'break-word')
    .html(parameter.display_text)

  // Create scale
  const scale = d3
    .scaleLinear()
    .domain(parameter.domain)
    .range([config.subplot_size - 1, 0])

  // Add scales to axis
  const y_axis = svg
    .append('g')
    .attr('transform', `translate(${config.axis.size}, 0)`)
    .call(
      d3
        .axisLeft(scale)
        .ticks(config.axis.ticks)
        .tickSize(config.axis.tickSize)
        .tickSizeOuter(0)
        .tickFormat(d3.format('.3'))
    )

  // Rotate axis labels
  y_axis
    .selectAll('text')
    .style('text-anchor', 'end')

    .attr('dy', '-1em')
    .attr('transform', 'rotate(-45)')

  // Explicitly colour the axis so they display correctly when downloaded
  y_axis.selectAll('line').style('stroke', 'white').classed('axis-lines', true)
  y_axis.selectAll('path').style('stroke', 'white').classed('axis-lines', true)
  y_axis.selectAll('text').style('fill', 'white').classed('axis-labels', true)
}

const destroy = el => {
  // Destroy
  d3.select(el).select('svg').remove()
}

export default { create, destroy }
