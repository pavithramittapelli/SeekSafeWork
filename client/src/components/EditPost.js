import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, textarea, Snackbar } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from './userContext';
import Header from './Header';
import FormHelperText from '@mui/material/FormHelperText';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const workingHoursPerDay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const categories = ['Barber', 'Carpenter', 'Cashier', 'Chef', 'Courier', 'DishWasher', 'Doemstic Worker', 'Driver', 'Electrician', 'Fashion Designer', 'Fitness Trainer', 'Food Server', 'Gardener', 'HairStylist', 'House Keeper', 'Labourer', 'Massage Therapist', 'Mechanic', 'Office Clerk',  'Painter', 'Photographer', 'Plumber', 'SalesPerson', 'Security Gaurd', 'Shoemaker', 'Tailor', 'Truck Driver', 'Tutor', 'Waiter', 'Welder', 'Yoga Instructor','Other'];


function getStyles(value, selectedValues, theme) {
    return {
        fontWeight:
            selectedValues && selectedValues.indexOf(value) !== -1
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
    };
}

const EditPost = () => {
    const id = useParams()
    const [data, setData] = useState([])
    console.log(id.id);
    console.log(data);
    const theme = useTheme();
    const [workTitle, setWorkTitle] = useState('');
    const [workTitleError, setWorkTitleError] = useState('');

    const [workingHours, setWorkingHours] = useState([]);
    const [workingHoursError, setWorkingHoursError] = useState('');
    const [category, setCategory] = useState([]);
    const [numOfWorkers, setNumOfWorkers] = useState('');
    const [numOfWorkersError, setNumOfWorkersError] = useState('');
    const [duratoionOfWork, setDuratoionOfWork] = useState('');
    const [duratoionOfWorkError, setDuratoionOfWorkError] = useState('')
    const [salary, setSalary] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [majorCity, setMajorCity] = useState('');
    const [majorCityError, setMajorCityError] = useState('');
    const [pincode, setPincode] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [description, setDescription] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { userInfo,} = useContext(UserContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    useEffect(() => {
        fetch(`https://seek-safe-work.vercel.app/getpost/${id.id}`)
            .then(res => {
                res.json().then(data => {
                    setData(data);
                    setWorkTitle(data.workTitle);
                    setCategory(data.category);
                    setDescription(data.description);
                    setDuratoionOfWork(data.duratoionOfWork);
                    const selectedWorkingHours = data.workingHours;
                    const selectedIndex = workingHoursPerDay.findIndex(hour => hour === selectedWorkingHours);
                    console.log(selectedIndex);
                    if (selectedIndex !== -1) {
                        setWorkingHours([selectedIndex]);
                    }
                    setLocation(data.location);
                    setMajorCity(data.majorCity);
                    setPincode(data.pincode);
                    setNumOfWorkers(data.numOfWorkers);
                    setPhoneNumber(data.phoneNumber);
                    setSalary(data.salary);
                })
            })

    }, [])
    const handleWorkTitleChange = (event) => {
        const value = event.target.value;
        setWorkTitle(value);
        setWorkTitleError('');
    };
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory([selectedCategory]);
    };

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
        setLocationError('');
    };

    const handleMajorCityChange = (event) => {
        const value = event.target.value;
        setMajorCity(value);
        setMajorCityError('');
    };

    const handlePincodeChange = (event) => {
        let value = event.target.value.replace(/\D/, ''); // Remove non-numeric characters
        value = value.slice(0, 6); // Limit to 6 digits
        setPincode(value);
        setPincodeError(value.length === 6 ? '' : 'Please enter a 6-digit pincode');
    };
    const handleWorkHoursChange = (event) => {
        const selectedHour = event.target.value;
        setWorkingHours([selectedHour]);
        setWorkingHoursError('')
    };

    const handleNumOfWorkersChange = (event) => {
        const value = event.target.value;
        setNumOfWorkers(value);
        setNumOfWorkersError('')
    };

    const handleDuratoionOfWorkChange = (event) => {
        const value = event.target.value;
        setDuratoionOfWork(value);
        setDuratoionOfWorkError('')
    }
    const handleSalaryChange = (event) => {
        const value = event.target.value;
        setSalary(value);
        setSalaryError('');
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        let value = event.target.value.replace(/\D/, ''); // Remove non-numeric characters
        value = value.slice(0, 10); // Limit to 10 digits
        setPhoneNumber(value);
        setPhoneNumberError(value.length === 10 ? '' : 'Please enter a 10-digit phone number');
    };

    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValidKey = /^\d+$/.test(keyValue); // Check if the key pressed is a number
        if (!isValidKey) {
            event.preventDefault(); // Prevent non-numeric characters from being entered
        }
    };

    async function handleSubmit(event) {
        let authorId = userInfo?.id
        event.preventDefault();
        console.log({ workTitle, category, location, majorCity, pincode, workingHours, numOfWorkers, duratoionOfWork, salary, phoneNumber, description })
        try {
            const response = await fetch(`https://seek-safe-work.vercel.app/editpost/${id.id}`, {
                method: 'PUT',
                body: JSON.stringify({ workTitle, category: category[0], location, majorCity, pincode, workingHours: workingHours[0], numOfWorkers, duratoionOfWork, salary, phoneNumber, description, authorId }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                // setRedirect(true);
                setSnackbarMessage('Post Edited Sucessfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                setWorkTitleError(data.errors.workTitle);
                setCategoryError(data.errors.category);
                setLocationError(data.errors.location);
                setMajorCityError(data.errors.majorCity);
                setPincodeError(data.errors.pincode);
                setWorkingHoursError(data.errors.workingHours);
                setNumOfWorkersError(data.errors.numOfWorkers);
                setDuratoionOfWorkError(data.errors.duratoionOfWork);
                setSalaryError(data.errors.salary);
                setPhoneNumberError(data.errors.phoneNumber);
                setSnackbarMessage('Edit Post was unsuccessful');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error during registration:', error);

        }
    }
    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
        if (snackbarSeverity === 'success') {
            setRedirect(true);
        }
    };
    
    if (redirect) {
        return <Navigate to={'/profile'} />;
    }
    return (
        <>
            <Header />

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={
                    <Button size="small" onClick={handleCloseSnackbar}
                        sx={{
                            color: 'white', // Set color to white
                        }}
                    >
                        Close
                    </Button>
                }
                ContentProps={{
                    sx: { backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336' }
                }}
               
            />
            <Container component="main" sx={{ marginTop: '84px' }}>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '5px', padding: '10px' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center" xs={12} >
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Typography component="h1" variant="h5" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                                    Work Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="WorkTitle"
                                    label="Work Title"
                                    name="workTitle"
                                    autoFocus
                                    value={workTitle}
                                    onChange={handleWorkTitleChange}
                                    error={!!workTitleError}
                                    helperText={workTitleError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '16px' }}>
                                    <InputLabel id="demo-multiple-category-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-multiple-category-label"
                                        id="demo-multiple-category"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        MenuProps={MenuProps}
                                        required
                                        style={{ backgroundColor: 'white', border: 'none' }}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem
                                                key={category}
                                                value={category}
                                                style={getStyles(category, category, theme)}
                                            >
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {categoryError && <FormHelperText sx={{ color: 'red', fontSize: '20px' }}>{categoryError}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Location"
                                    label="Location"
                                    name="location"
                                    value={location}
                                    onChange={handleLocationChange}
                                    error={!!locationError}
                                    helperText={locationError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="MajorCity"
                                    label="Major City"
                                    name="majorCity"
                                    value={majorCity}
                                    onChange={handleMajorCityChange}
                                    error={!!majorCityError}
                                    helperText={majorCityError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="body2" color="textSecondary">
                 Pincode
                </Typography> */}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Pincode"
                                    label="Pincode"
                                    name="pincode"
                                    value={pincode}
                                    onChange={handlePincodeChange}
                                    onKeyPress={handleKeyPress}
                                    error={!!pincodeError}
                                    helperText={pincodeError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="body2" color="textSecondary">
                  Select No of hours work per day
                </Typography> */}
                                <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '16px' }}>
                                    <InputLabel id="demo-multiple-location-label">Working Hours per day</InputLabel>
                                    <Select
                                        labelId="demo-multiple-location-label"
                                        id="demo-multiple-location"
                                        value={workingHours}
                                        onChange={handleWorkHoursChange}
                                        MenuProps={MenuProps}
                                        required
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        {workingHoursPerDay.map((hour) => (
                                            <MenuItem
                                                key={hour}
                                                value={hour}
                                                style={getStyles(hour, workingHours, theme)}
                                            >
                                                {hour}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {workingHoursError && <FormHelperText sx={{ color: 'red', fontSize: '20px' }}>Please select working hours</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="body2" color="textSecondary">
                  Number of total workers needed
                </Typography> */}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="NumOfWorkers"
                                    label="Number of Workers"
                                    name="numOfWorkers"
                                    value={numOfWorkers}
                                    onChange={handleNumOfWorkersChange}
                                    onKeyPress={handleKeyPress}
                                    error={!!numOfWorkersError}
                                    helperText={numOfWorkersError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="body2" color="textSecondary">
                 work duration in months
                </Typography> */}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="DuratoionOfWork"
                                    label="Duratoion Of Work (Enter in months)"
                                    name="DuratoionOfWork"
                                    value={duratoionOfWork}
                                    onChange={handleDuratoionOfWorkChange}
                                    onKeyPress={handleKeyPress}
                                    error={!!duratoionOfWorkError}
                                    helperText={duratoionOfWorkError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="body2" color="textSecondary">
                  Salary in Indian Rupees
                </Typography> */}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Salary"
                                    label="Salary"
                                    name="Salary"
                                    value={salary}
                                    onChange={handleSalaryChange}
                                    onKeyPress={handleKeyPress}
                                    error={!!salaryError}
                                    helperText={salaryError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="body2" color="textSecondary">
                  Indian Phone number
                </Typography> */}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="PhoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    onKeyPress={handleKeyPress}
                                    error={!!phoneNumberError}
                                    helperText={phoneNumberError}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    aria-label="description"
                                    placeholder="Description"
                                    rows={5}
                                    multiline
                                    fullWidth
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default EditPost;
