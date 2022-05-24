import { useState, useEffect, useSyncExternalStore } from "react";
import { MathJaxContext } from "better-react-mathjax";
import CornerPlot from "./CornerPlot";
import ParameterSelector from "./ParameterSelector";
import axios from "axios";
import CheckboxDropdown from "../pages/FileUpload/CheckboxDropdown";

function PlotsPage() {
    /* 

    This is the skeleton component for our plots page. It hosts all relevant components for the user to create plots
    including the parameter selectors and the corner plot itself. 

    */
    const [data, setData] = useState({});
    const [parameters, setParameters] = useState([]);
    const [defaultParameters, setDefaultParameters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/uploads")
            .then(async function (response) {
                // console.log(response.data);
                // console.log(Object.keys(response.data));
                console.log("hello");
                console.log(response.data.selected_keys);
                await setData(response.data["posterior"]["content"]);
                await setParameters(response.data.selected_keys);
                await setDefaultParameters(response.data.selected_keys);
                setLoading(false);
                console.log(defaultParameters);
            });
    }, []);

    const updateParameters = (_, active) => {
        setParameters(active);
    };

    // Config for MathJax rendering of mathematical symbols
    const config = {
        tex: {
            inlineMath: [
                ["$", "$"],
                ["\\(", "\\)"],
            ],
        },
        startup: {
            typeset: false,
        },
    };

    return (
        <div>
            {!loading && (
                <MathJaxContext config={config}>
                    <CheckboxDropdown
                        defaultChecked={defaultParameters}
                        keys={Object.keys(data)}
                        setSelectedKeys={setParameters}
                        sx={{ margin: "1rem" }}
                    />
                    <CornerPlot data={data} parameters={parameters} />
                </MathJaxContext>
            )}
        </div>
    );
}

export default PlotsPage;
