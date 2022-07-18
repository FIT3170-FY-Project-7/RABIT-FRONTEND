import * as d3 from 'd3'

const sigma = n => 1 - Math.E ** (-0.5 * n ** 2)

const rectbin = (x: number[], y: number[], bins) => {
    const x_axis = d3.scaleLinear().domain(d3.extent(x)).range([0, bins])

    const y_axis = d3.scaleLinear().domain(d3.extent(y)).range([bins, 0])

    const data = d3.zip(x, y) as [number, number][]
    const values = Array((bins + 1) ** 2).fill(0)

    // Based on density estimation in d3-contour/density.js
    // https://github.com/d3/d3-contour/blob/b7a119dedb0e242e7823621b887422a6cf689fb6/src/density.js#L37
    data.forEach((d, i, data) => {
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

const create = (el, layout, x: number[], y: number[]) => {
    // const start = Date.now();

    const colors = ['#80c3ff', '#40a6ff', '#0088ff']
    const sigmas = [1, 2, 3].map(sigma)

    const svg = d3
        .select(el)
        .append('svg')
        .attr('class', 'd3')
        .attr('width', layout.width)
        .attr('height', layout.height)
        .attr('style', 'outline: thin solid black;')

    const data = d3.zip(x, y) as [number, number][]

    // *// Adds dot points to show each data point. Massively slows render speed, but could be a toggled functionality.

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

    const contour_bins = 50
    const bins = rectbin(x, y, contour_bins)
    const contours = d3
        .contours()
        .size([contour_bins, contour_bins])
        .thresholds((v: number[]) => {
            const v_sort = d3.sort(v)
            const v_cum = d3.cumsum(v_sort)
            const thresholds = sigmas.map(v => (1 - v) * v_cum[v_cum.length - 1])
            return thresholds.map(v => v_sort[v_cum.findIndex(v_c => v_c > v)])
        })(bins)

    const contour_x_scale = layout.width / contour_bins
    const contour_y_scale = layout.height / contour_bins
    const contour_transform = d3.geoTransform({
        point: function (x, y) {
            this.stream.point(contour_x_scale * x, contour_y_scale * y)
        }
    })

    svg.append('g')
        .selectAll('path')
        .data(contours)
        .join('path')
        .attr('stroke-width', layout.width * 0.01)
        .attr('stroke', colors[colors.length - 1])
        .attr('fill', (d, i) => colors[i])
        .attr('fill-opacity', 0.8)
        .attr('stroke-opacity', 0.8)
        .attr('d', d3.geoPath().projection(contour_transform))

    // console.log(`Contour in: ${(Date.now() - start) / 1000}s`);
}

const destroy = el => {
    d3.select(el).select('svg').remove()
}

export default { create, destroy }
