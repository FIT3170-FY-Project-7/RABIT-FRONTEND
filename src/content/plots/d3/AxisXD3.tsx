import * as d3 from 'd3'

const create = (el, layout, domain, label) => {
    // Append SVG
    const svg = d3
        .select(el)
        .append('svg')
        .attr('class', 'd3')
        .attr('width', layout.width)
        .attr('height', layout.axis.size)

    // Labeling
    svg.append('foreignObject')
        .attr('width', layout.width)
        .attr('height', layout.axis.size)
        .style('color', 'white')
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
        .range([0, layout.width - 1])

    // Add scales to axis
    const x_axis = svg.append('g').call(d3.axisBottom(scale).ticks(layout.axis.ticks).tickSize(layout.axis.tickSize))

    // Explicitly colour the axis so they display correctly when downloaded
    x_axis.selectAll('line').style('stroke', 'white').classed('axis-lines', true)
    x_axis.selectAll('path').style('stroke', 'white').classed('axis-lines', true)
    x_axis.selectAll('text').style('fill', 'white').classed('axis-labels', true)
}

const destroy = el => {
    // Destroy
    d3.select(el).select('svg').remove()
}

export default { create, destroy }
