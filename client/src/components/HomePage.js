import React, { useEffect, useState } from 'react';
import Header from './Header';
import CardUpdated from './CardUpdated';
import Footer from './Footer';
import { Grid } from '@mui/material';

function HomePage() {
  const [cardData, setCardData] = useState([]);
  const [sortedCardData, setSortedCardData] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://seek-safe-work.vercel.app/workpost');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCardData(data);
        setSortedCardData(data.slice()); // Initialize with a copy for sorting
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortCardData = (data, sortBy) => {
    const sortFunction = (a, b) => {
      switch (sortBy) {
        case 'salaryHighToLow':
          return b.salary - a.salary; // Descending order
        case 'salaryLowToHigh':
          return a.salary - b.salary; // Ascending order
        case 'hoursHighToLow':
          return b.workingHours - a.workingHours; // Descending order
        case 'hoursLowToHigh':
          return a.workingHours - b.workingHours; // Ascending order
        default:
          return 0; // No sorting (maintain original order)
      }
    };

    return data.slice().sort(sortFunction); // Ensure sorting doesn't mutate original data
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (searchInput) {
      // If there is search input, filter the data based on the search input and then sort
      const filteredData = cardData.filter(card => card.workTitle.toLowerCase().includes(searchInput.toLowerCase()));
      const sortedFilteredData = sortCardData(filteredData, sortBy);
      setSortedCardData(sortedFilteredData);
    } else {
      // If there is no search input, sort the entire data
      const sortedData = sortCardData(cardData, sortBy);
      setSortedCardData(sortedData);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleFormSubmit} style={{ marginTop: '90px', display: 'flex', alignItems: 'center', marginLeft: '7%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* <label htmlFor="sortSelect" style={{ marginRight: '10px', }}>Sort By:</label> */}
            <select id="sortSelect" value={sortBy} onChange={handleSortChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}>
              <option value="">None</option>
              <option value="salaryHighToLow">Salary (High to Low)</option>
              <option value="salaryLowToHigh">Salary (Low to High)</option>
              <option value="hoursLowToHigh">Working Hours (Low to High)</option>
              <option value="hoursHighToLow">Working Hours (High to Low)</option>
            </select>
            <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Sort</button>
          </Grid >
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
            <input type="text" placeholder="Search for " value={searchInput} onChange={handleSearchInputChange} style={{  padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" onClick={handleFormSubmit} style={{ marginLeft: '10px', padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Search</button>
          </Grid>
        </Grid>
      </form>
      {sortedCardData.length === 0 ? (
        <h3 style={{ marginLeft: '5%', marginTop: '2%', }}>OOPS!! No Data available for your search</h3>
      ) : (
        <>
          <CardUpdated cardData={sortedCardData} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomePage;
