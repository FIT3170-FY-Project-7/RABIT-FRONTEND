import * as d3 from 'd3'
import MathJax from 'better-react-mathjax'

const create = (el, layout, domain, label) => {
    // Append SVG
    const svg = d3
        .select(el)
        .append('svg')
        .attr('class', 'd3')
        .attr('width', layout.axis.size)
        .attr('height', layout.height)

    // Labeling
    svg.append('foreignObject')
        .attr('width', layout.height)
        .attr('height', layout.axis.size)
        .attr('transform', `rotate(-90), translate(${-layout.height}, 0)`)
        .append('xhtml:div')
        .style('height', '100%')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .html(label)

    // Create scale
    const scale = d3
        .scaleLinear()
        .domain(domain)
        .range([layout.height - 1, 0])

    // Add scales to axis
    const y_axis = d3.axisLeft(scale).ticks(layout.axis.ticks).tickSize(layout.axis.tickSize)

    // Append group and insert axis
    svg.append('g').attr('transform', `translate(${layout.axis.size}, 0)`).call(y_axis)
}

const destroy = el => {
    // Destroy
    d3.select(el).select('svg').remove()
}

export default { create, destroy }
