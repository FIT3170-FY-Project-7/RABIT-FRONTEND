// The X axis created using D3

import * as d3 from 'd3'
import { colours } from '../constants/Colours'
import { PlotConfig, ParameterConfig } from '../PlotTypes'
import { latex_translations, default_translation } from '../constants/LaTeX'

const create = (el: HTMLElement, parameter: ParameterConfig, config: PlotConfig) => {
  // Append SVG
  const svg = d3
    .select(el)
    .append('svg')
    .attr('class', 'd3')
    .attr('width', config.subplot_size)
    .attr('height', config.axis.size)
    .style('overflow', 'visible')

  // Labeling
  svg
    .append('foreignObject')
    .attr('width', config.subplot_size)
    .attr('height', config.axis.size)
    .style('color', 'white')
    .append('xhtml:div')
    .style('height', '100%')
    .style('display', 'flex')
    .style('justify-content', 'center')
    .style('align-items', 'center')
    .style('word-break', 'break-word')
    .html(latex_translations[parameter.display_text] ?? default_translation(parameter.display_text))

  // Create scale
  const scale = d3
    .scaleLinear()
    .domain(parameter.domain)
    .range([0, config.subplot_size - 1])

  // Add scales to axis
  const x_axis = svg
    .append('g')
    .call(
      d3
        .axisBottom(scale)
        .ticks(config.axis.ticks)
        .tickSize(config.axis.tickSize)
        .tickSizeOuter(0)
        .tickFormat(d3.format('.3'))
    )

  // Rotate axis labels
  x_axis
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-0.5em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-45)')

  x_axis.style('position', 'relative')

  // Explicitly colour the axis so they display correctly when downloaded
  x_axis.selectAll('line').style('stroke', colours.axesColour).classed('axis-lines', true)
  x_axis.selectAll('path').style('stroke', 'black')
  x_axis.selectAll('text').style('fill', colours.axesColour).classed('axis-labels', true)
}

const destroy = el => {
  // Destroy
  d3.select(el).select('svg').remove()
}

export default { create, destroy }
