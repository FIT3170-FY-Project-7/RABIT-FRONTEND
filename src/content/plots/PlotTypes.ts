export type PlotConfig = {
    plot_size: number
    subplot_size: number
    margin: {
        horizontal: number
        vertical: number
    }
    axis: {
        size: number
        tickSize: number
        ticks: number
    }
    background_color: string
}

export type DatasetConfig = {
    data: {
        [key: string]: number[]
    }
    bins: number
    sigmas: number[]
    quantiles: number[]
    color: string
    line_width: number
    blur_radius: number
}

export type ParameterConfig = {
    name: string
    display_text: string
    domain: [number, number]
}

export type ApiParameterConfig = {
    parameter_id: string
    parameter_name: string
    file_id: string
    domain: [number, number]
}
