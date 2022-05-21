import * as d3 from 'd3';

const create = (el, layout, x: number[]) => {
    const start = Date.now();

    const svg = d3
        .select(el)
        .append('svg')
        .attr('class', 'd3')
        .attr('width', layout.width)
        .attr('height', layout.height)
        .attr('style', 'outline: thin solid black;');

    const x_axis = d3
        .scaleLinear()
        .domain(d3.extent(x))
        .range([0, layout.width]);

    const bins = d3.bin().thresholds(80)(x);

    const y_axis = d3
        .scaleLinear()
        .domain([0, d3.max(bins, (d) => d.length)])
        .range([layout.height, 0]);

    svg.selectAll('rect')
        .data(bins)
        .join('rect')
        .attr('x', 1)
        .attr('transform', function (d) {
            return `translate(${x_axis(d.x0)}, ${y_axis(d.length)})`;
        })
        .attr('width', function (d) {
            return x_axis(d.x1) - x_axis(d.x0) + 1;
        })
        .attr('height', function (d) {
            return layout.height - y_axis(d.length);
        })
        .style('fill', '#0088ff');

    // Suggest for big data sets we provide user ability to toggle quantiles off, since sorting data sets of this size
    // will be SLOW. 
    const quantiles = [0.16, 0.5, 0.84];
    const x_s = d3.sort(x);
    quantiles.forEach((quantile) => {
        const quantile_x = d3.quantileSorted(x_s, quantile);

        // draw vertical line
        svg.append('line')
            .attr('x1', x_axis(quantile_x))
            .attr('x2', x_axis(quantile_x))
            .attr('y1', 0)
            .attr('y2', layout.height)
            .attr('stroke', 'red');
    });

    console.log(`Histogram in: ${(Date.now() - start) / 1000}s`);
};

const destroy = (el) => {
    d3.select(el).select('svg').remove();
};

export default { create, destroy };
