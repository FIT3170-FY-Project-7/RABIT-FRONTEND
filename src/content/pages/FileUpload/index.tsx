import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Card,
	TextField,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Button,
	Input,
	Divider,
	Typography,
	Grid,
} from "@mui/material";
import FileSelectButton from "./FileSelectButton";
import FileUploadButton from "./FileUploadButton";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import Logo from "../../../components/LogoSign";
import { Link } from "react-router-dom";

const OverviewWrapper = styled(Box)(
	() => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

export default function UploadPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [enableDescription, setEnableDescription] = useState(false);
	const [enableUpload, setEnableUpload] = useState(false);
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const updateSelectedFile = (state) => {
		setSelectedFile(state);
		setFileName(state.name);
		setTitle(state.name);
		setEnableDescription(true);
	};

	useEffect(() => setEnableUpload(title != ""), [title]);

	return (
		<Box style={{ display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					display: "grid",
					minWidth: "80vh",
					gap: 2,
					gridTemplateColumns: "repeat(1, 1fr)",
					marginTop: "2rem",
					margin: "1rem",
				}}
			>
				<Typography variant="h2">Step 1</Typography>
				<FileSelectButton updateSelectedFile={updateSelectedFile} />
				<Typography variant="h6">{fileName}</Typography>
				<Divider />
				<Typography variant="h2">Step 2</Typography>
				<TextField
					fullWidth
					defaultValue={fileName}
					disabled={!enableDescription}
					onChange={(e) => setTitle(e.target.value)}
					required
					label="Title"
					variant={enableDescription ? "outlined" : "filled"}
				/>
				<TextField
					fullWidth
					disabled={!enableDescription}
					onChange={(e) => setDescription(e.target.value)}
					label="Description"
					variant={enableDescription ? "outlined" : "filled"}
					multiline
					rows={5}
				/>
				<FileUploadButton
					enableButton={enableUpload}
					selectedFile={selectedFile}
					buttonMessage="Upload"
					uploadPercentage={uploadPercentage}
				/>
			</Box>
		</Box>
	);
}
