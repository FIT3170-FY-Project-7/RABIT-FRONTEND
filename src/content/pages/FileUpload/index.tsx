import React, { useState, useEffect } from "react";
import { Box, TextField, Divider, Typography } from "@mui/material";
import FileSelectButton from "./FileSelectButton";
import FileUploadButton from "./FileUploadButton";
import { styled } from "@mui/material/styles";
import CheckboxDropdown from "./CheckboxDropdown";
import * as $ from "jquery";

export default function UploadPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [enableDescription, setEnableDescription] = useState(false);
	const [enableUpload, setEnableUpload] = useState(false);
	const [file, setFile] = useState("");
	const [searchParamKeys, setSearchParamKeys] = useState({
		key: "search_parameter_keys",
		params: [],
	});
	const [fixedParamKeys, setFixedParamKeys] = useState({
		key: "fixed_parameter_keys",
		params: [],
	});
	const [constraintParamKeys, setConstraintParamKeys] = useState({
		key: "constraint_parameter_keys",
		params: [],
	});

	const [posteriorKeys, setPosteriorKeys] = useState([]);

	const updateSelectedFile = (state) => {
		setSelectedFile(state);
		setFileName(state.name);
		setTitle(state.name);
		setEnableDescription(true);

		const fileReader = new FileReader();
		fileReader.readAsText(state);

		fileReader.onload = (e) => {
			const json = JSON.parse(e.target.result as string);
			setPosteriorKeys(Object.keys(json["posterior"]["content"]));
		};

		console.log(posteriorKeys);
	};

	useEffect(() => setEnableUpload(title != ""), [title]);

	return (
		<Box style={{ display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					display: "grid",
					minWidth: "80vh",
					gap: 4,
					gridTemplateColumns: "repeat(1, 1fr)",
					marginTop: "2rem",
					margin: "1rem",
				}}
			>
				<Box>
					<Typography variant="h2">Step 1</Typography>
					<FileSelectButton updateSelectedFile={updateSelectedFile} />
					<Typography sx={{ marginTop: "1rem" }} variant="h6">
						{fileName}
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						display: "grid",
						gap: 2,
						gridTemplateColumns: "repeat(1, 1fr)",
					}}
				>
					<Typography variant="h2">Step 2</Typography>
					<TextField
						fullWidth
						defaultValue={fileName}
						onChange={(e) => setTitle(e.target.value)}
						required
						label="Title"
						variant="filled"
					/>
					<TextField
						fullWidth
						onChange={(e) => setDescription(e.target.value)}
						label="Description"
						variant="filled"
						multiline
						rows={5}
					/>
				</Box>
				<Divider />
				<Box
					sx={{
						display: "grid",
						gap: 2,
						gridTemplateColumns: "repeat(1, 1fr)",
					}}
				>
					<Typography variant="h2">Step 3</Typography>
					<Typography variant="h6">Select parameters</Typography>
					{enableDescription && (
						<>
							<CheckboxDropdown keys={posteriorKeys} />
						</>
					)}
				</Box>
				<FileUploadButton
					enableButton={enableUpload}
					selectedFile={selectedFile}
					buttonMessage="Upload"
				/>
			</Box>
		</Box>
	);
}
