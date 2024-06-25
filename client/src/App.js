// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signin from './components/Signin';
import Trash from './components/Trash';
import HomePage from './components/HomePage';
import WorkPost from './components/WorkPost';
import Bookmarked from './components/Bookmarked';
import ProfilePage from './components/ProfilePage';
import MyPosts from './components/MyPosts';
import EditPost from './components/EditPost';
import Notifications from './components/Notifications';
import AboutUs from './components/AboutUs';
import { UserContext, UserContextProvider } from './components/userContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css'
const theme = createTheme({
  palette: {
    primary: {
      main: '#265073', // Change the primary color to the provided hashcode
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider> {/* Wrap the Router with UserContextProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signin />} />
            <Route path="/workpost" element={<WorkPost />} />
            <Route path="/myBookmarks" element={<Bookmarked />} />
            <Route path="/trash" element={<Trash />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/myPosts' element={<MyPosts />} />
            <Route path='/editPost/:id' element={<EditPost />} />
            <Route path='/notification' element={<Notifications />} />
            <Route path='/aboutus' element={<AboutUs />}/>
          </Routes>
        </Router>
      </UserContextProvider>
    </ThemeProvider>
  );
}

function ConditionalRender() {
  const { userInfo, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading ..... </div>;
  }

  const isLoggedIn = !!userInfo?.userName;

  return isLoggedIn ? <></> : <></>;
}

export default App;
