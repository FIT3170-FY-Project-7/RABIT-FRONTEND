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

console.log("Hello")

export default function UploadPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [enableDescription, setEnableDescription] = useState(false);
	const [enableUpload, setenableUpload] = useState(false);
	const [buttonMessage, setButtonMessage] = useState("Select a file");
	const [textFieldVariant, setTextFieldVariant] = useState("filled");

	const updateSelectedFile = (state) => {
		setSelectedFile(state);
		setFileName(state.name);
		setTitle(state.name);
		setTextFieldVariant("standard");
		setEnableDescription(true);
	};

	useEffect(() => {
		if (description != "" && title != "") {
			setenableUpload(true);
		} else {
			setenableUpload(false);
		}
	}, [title, description]);

	return (
		<OverviewWrapper>
			<Container maxWidth="sm">
				<Box display="flex" justifyContent="center" py={5} alignItems="center">
					<Logo />
				</Box>
				<Box display="flex" justifyContent="center" py={5} alignItems="center">
					<Card sx={{ p: 8, mb: 10, borderRadius: 8, width: 10000 }}>
						<Box display="flex" justifyContent="center" alignItems="center">
							<h1 style={{ lineHeight: "1rem" }}>Upload Data</h1>
						</Box>
						<h2>Step 1</h2>

						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
							}}
						>
							<FileSelectButton
								updateSelectedFile={updateSelectedFile}
							></FileSelectButton>
						</div>
						<p>{fileName}</p>
						<h2>Step 2</h2>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								rowGap: "1rem",
							}}
						>
							<TextField
								defaultValue={fileName}
								disabled={!enableDescription}
								onChange={(e) => setTitle(e.target.value)}
								required
								label="Title"
								variant={textFieldVariant}
							/>
							<TextField
								fullWidth
								disabled={!enableDescription}
								onChange={(e) => setDescription(e.target.value)}
								label="Description"
								required
								variant={textFieldVariant}
								multiline
								rows={5}
							/>
							<FileUploadButton
								enableButton={enableUpload}
								selectedFile={selectedFile}
								buttonMessage="Upload"
							></FileUploadButton>
						</div>
					</Card>
				</Box>
			</Container>
		</OverviewWrapper>
	);
}
