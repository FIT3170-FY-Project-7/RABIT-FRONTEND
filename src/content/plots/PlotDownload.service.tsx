import downloadjs from 'downloadjs'
import html2canvas from 'html2canvas'
import * as d3 from 'd3'

const PlotDownloadService = {
    downloadAsPNG: async function () {
        const cornerPlotElmt = document.querySelector<HTMLElement>('.corner-plot')
        if (!cornerPlotElmt) return
        changeColours('white', 'black')

        const canvas = await html2canvas(cornerPlotElmt)
        const dataURL = canvas.toDataURL('image/png')
        downloadjs(dataURL, 'corner-plot.png', 'image/png')

        changeColours('#070C27', 'white')
    },
    downloadAsSVG: function () {
        const cornerPlotElmt = document.querySelector<HTMLElement>('.corner-plot')
        changeColours('white', 'black')
        var serializer = new XMLSerializer()
        var source = serializer.serializeToString(cornerPlotElmt)

        //add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
        }

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source

        //convert svg source to URI data scheme.
        var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)

        var downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = 'corner-plot.svg'
        downloadLink.click()
        changeColours('#070C27', 'white')
    }
}

const changeColours = (backgroundColour, labelsColour) => {
    const cornerPlotElmt = document.querySelector<HTMLElement>('.corner-plot')
    cornerPlotElmt.style.backgroundColor = backgroundColour

    let svg = d3.select('#corner-plot-id')
    svg.selectAll('foreignObject').style('color', labelsColour)

    d3.selectAll('.axis-lines').style('stroke', labelsColour)
    d3.selectAll('.axis-labels').style('fill', labelsColour)
}

export default PlotDownloadService
