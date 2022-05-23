import { useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import Footer from "../../components/Footer";
import { styled } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
// mui component imports
import {
	Tabs,
	Tab,
	Grid,
	Box,
	Divider,
	IconButton,
	Drawer,
	AppBar,
	Toolbar,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";

// Tab imports from other files (same folder)
import PlotsPage from "../plots/PlotsPage";
import CommentsTab from "./CommentsTab";

// Icon imports
import ShareIcon from "@mui/icons-material/Share";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

// Variable for variable drawer width
const drawerWidth = 240;

const DrawerSpacing = styled(Box)(
	({ theme }) => `
		  height: ${theme.header.height};
  `
);

const TabsWrapper = styled(Tabs)(
	() => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {
	// state variable and function setter for tab
	const [currentTab, setCurrentTab] = useState<string>("data");

	const tabs = [
		{ value: "data", label: "Data" },
		{ value: "comments", label: "Comments" },
	];

	// function for state change of tabs
	const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
		setCurrentTab(value);
	};

	// state variable and function setter for variables drawer
	const [open, setOpen] = React.useState(false);

	// open and close functions for variables drawer
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// state variable and function setter for variables check list within drawer
	const [checked, setChecked] = React.useState([0]);

	// function for handling toggling of check box for check list within drawer.
	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	// variable for rows within variables checklist
	const [variables, setArray] = useState([]);

	// function for adding and removing rows to checklist when clicking plus icon in drawer
	const addVariable = () => {
		const variablesArray = [...variables];
		const arraySize = variables.length;

		// if list empty, initialise with 1 element
		if (arraySize == 0) {
			variablesArray.push(0);
		}
		// else add to list by getting highest, and adding 1
		else {
			variablesArray.push(variables[arraySize-1] + 1);
		}

		setArray(variablesArray);
	};

	const removeVariable = (value: number)=> () =>  {
		const variablesArray = [...variables];

		// if list has 1 item, need to pop as splice wont remove it.
		if (variables.length == 1) {
			variablesArray.pop();
		}
		// else use splice to get the exact element being removed.
		else {
			variablesArray.splice(variables.indexOf(value), 1);
		}

		setArray(variablesArray);

	};

	return (
		<>
			<Helmet>
				<title>User Settings - Applications</title>
			</Helmet>
			
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="stretch"
				sx={{marginTop:"2rem"}}
			>
				<Grid item xs={3} />
				<Grid item xs={3}>
					<PageHeader />
					<Box sx={{marginTop:"2rem"}}>
						<TabsWrapper
							onChange={handleTabsChange}
							value={currentTab}
							textColor="primary"
							indicatorColor="primary"
						>
							{tabs.map((tab) => (
								<Tab key={tab.value} label={tab.label} value={tab.value} />
							))}
						</TabsWrapper>
					</Box>
				</Grid>
				<Grid item xs={1}>
					<IconButton>
						<EditIcon />
					</IconButton>
					<IconButton>
						<ShareIcon />
					</IconButton>
				</Grid>
				<Grid item xs={5}>
					<Grid container direction="row-reverse">
						<IconButton onClick={handleDrawerOpen}>
							<KeyboardDoubleArrowLeftIcon
								fontSize="large"
								
							/>
						</IconButton>
					</Grid>
					<Drawer
						sx={{
							width: drawerWidth,
							flexShrink: 0,
							"& .MuiDrawer-paper": {
								width: drawerWidth,
								boxSizing: "border-box",
							},
						}}
						variant="persistent"
						anchor="right"
						open={open}
					>
						<DrawerSpacing />
						<AppBar position="static">
							<Toolbar>
								<IconButton onClick={handleDrawerClose}>
									<KeyboardDoubleArrowRightIcon
										fontSize="large"
										
									/>
								</IconButton>
								<Grid container direction="row-reverse">
									<IconButton onClick={addVariable}>
										<AddIcon fontSize="large"  />
									</IconButton>
								</Grid>
							</Toolbar>
						</AppBar>
						<List
							sx={{
								width: "100%",
								maxWidth: 360,
								bgcolor: "background.paper",
							}}
						>
							{variables.map((value) => {
								const labelId = `checkbox-list-label-${value}`;

								return (
									<ListItem
										key={value}
										disablePadding
										secondaryAction={
											<IconButton onClick={removeVariable(value)}>
												<CloseIcon  />
											</IconButton>
										}
									>
										<ListItemButton
											role={undefined}
											onClick={handleToggle(value)}
											dense
										>
											<ListItemIcon>
												<Checkbox
													edge="start"
													checked={checked.indexOf(value) !== -1}
													tabIndex={-1}
													disableRipple
													inputProps={{ "aria-labelledby": labelId }}
												/>
											</ListItemIcon>
											<ListItemText
												id={labelId}
												primary={`Line item ${value + 1}`}
											/>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Drawer>
				</Grid>
				<Grid item xs={12}>
					<Divider />
					<Box sx={{ height: 30 }}></Box>
				</Grid>

				<Grid item xs={10}>
					<Box>
						{currentTab === "data" && <PlotsPage />}
						{currentTab === "comments" && <CommentsTab />}
					</Box>
				</Grid>
			</Grid>

			<Footer />
		</>
	);
}

export default ManagementUserSettings;
