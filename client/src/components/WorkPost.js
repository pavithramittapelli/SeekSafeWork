import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, FormHelperText, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Navigate } from 'react-router-dom';
// import { UserContext } from './userContext';
import Header from './Header';
import { useTheme } from '@mui/material/styles';


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

function getStyles(value, selectedValues, theme) {
  return {
    fontWeight:
      selectedValues && selectedValues.indexOf(value) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}
const workingHoursPerDay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const categories = ['Barber', 'Carpenter', 'Cashier', 'Chef', 'Courier', 'DishWasher', 'Doemstic Worker', 'Driver', 'Electrician', 'Fashion Designer', 'Fitness Trainer', 'Food Server', 'Gardener', 'HairStylist', 'House Keeper', 'Labourer', 'Massage Therapist', 'Mechanic', 'Office Clerk', 'Painter', 'Photographer', 'Plumber', 'SalesPerson', 'Security Gaurd', 'Shoemaker', 'Tailor', 'Truck Driver', 'Tutor', 'Waiter', 'Welder', 'Yoga Instructor', 'Other'];

const WorkPost = () => {
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
  // const { userInfo, setUserInfo, isLoading } = useContext(UserContext);

  const handleWorkTitleChange = (event) => {
    const value = event.target.value;
    setWorkTitle(value);
    setWorkTitleError('');
  };
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory([selectedCategory]);
    // setError(false);
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
    event.preventDefault();
    console.log({ workTitle, category, location, majorCity, pincode, workingHours, numOfWorkers, duratoionOfWork, salary, phoneNumber, description })
    try {
      const response = await fetch('https://seek-safe-work.vercel.app/workpost', {
        method: 'POST',
        body: JSON.stringify({ workTitle, category: category[0], location, majorCity, pincode, workingHours: workingHours[0], numOfWorkers, duratoionOfWork, salary, phoneNumber, description }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setRedirect(true);
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
      }
    } catch (error) {
      console.error('Error during registration:', error);

    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }


  return (
    <>
      <Header />
      <Container component="main" sx={{ marginTop: '84px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '5px', padding: '10px' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center" xs={12} >
              <Grid item xs={12} >
                <Typography component="h1" variant="h5" style={{ color: '#3f51b5', fontWeight: 'bold', textAlign: 'center' }}>
                  Work Details
                </Typography>
                <ul>
                  GuideLines
                  <li>
                    WorkTitle: Enter a descriptive title for the work/job position.
                    Make sure the title clearly represents the nature of the work.. ex:Driver,Security.
                  </li>
                  <li>
                    Category: Select the category that best fits the type of work.
                    Choose from the provided list of categories.
                  </li>
                  <li>
                    Location: Enter the specific location where the work/job is located.
                  </li>
                  <li>
                    MajorCity: Specify the major city nearest to the work location.
                    This helps provide a general idea of the work's proximity to urban areas.
                  </li>
                  <li>
                    Pincode:Enter the 6-digit pincode corresponding to the work location.
                    Ensure the pincode is accurate for easy location identification.
                  </li>
                  <li>
                    Working Hours per Day: Select the number of hours per day a worker is expected to work(WorkingHours are from 1 to 12 hours only).
                  </li>
                  <li>Number of Workers:Specify the total number of workers needed for the job.
                    Enter a numerical value indicating the quantity required.(Min 1 Max:30)
                  </li>
                  <li>
                    Duration of Work: Enter the expected duration of the work in months(Enter in numbers only).
                    Provide an estimate of how long the work/job will last.(Min 1 month)
                  </li>
                  <li>
                    Salary: Specify the salary or compensation offered for the work per month.
                    Enter the amount in Indian Rupees (INR) (Min 1000Rs/-).
                  </li>
                  <li>
                    Phone Number: Enter a valid Indian phone number where interested applicants can contact.
                    Ensure the phone number is accurate and reachable.
                  </li>
                  <li>
                    Description:
                    Provide a detailed description of the work/job.
                    Include information such as job responsibilities, requirements, benefits and like accomodation is provided or not.
                    Use the provided text field to enter the description in multiple lines if needed.
                  </li>
                </ul>
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
                  sx={{ backgroundColor: '#ffffff' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '16px', border: 'none' }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    className='Noti'
                    // labelId="demo-multiple-category-label"
                    // id="demo-multiple-category"
                    placeholder='Category'
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
      </Container >
    </>
  );
};

export default WorkPost;
