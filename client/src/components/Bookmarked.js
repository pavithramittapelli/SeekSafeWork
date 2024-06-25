import React, { useEffect, useState } from 'react';
import Header from './Header';
import CardUpdate2 from './CardUpdate2';
import { UserContext } from './userContext';

function Bookmarked() {
    const [cardData, setCardData] = useState([]);
    const { userInfo } = React.useContext(UserContext);
    console.log(userInfo)
    useEffect(() => {
        const fetchData = async () => {
            // if (userInfo) {
                console.log(userInfo)
                try {
                    const response = await fetch(`https://seek-safe-work.vercel.app/myBookmarks/${userInfo.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    setCardData(data);
                    
                    console.log(`from bookmarked ${data}`)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            // }
        };

        fetchData();
    }, [userInfo]); // Fetch data when userInfo.userName changes
    console.log(`Card data from bookmards ${cardData}`);
    return (
        <div>
            <Header />
            {cardData.length === 0 ? (
                <div style={{ marginTop: '84px', textAlign:'center', fontSize:'1.5rem', fontWeight:'bold' }}>OOPS!! No bookmarked data available</div>
            ) : (
                <CardUpdate2 cardData={cardData} />
            )}
        </div>
    );
}

export default Bookmarked;
