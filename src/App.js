import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Box from '@material-ui/core/Box';
import Grid from '@mui/material/Grid';


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    Axios.get(apiUrl).then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  };

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Box>
        <Typography variant="p" component="h1" sx={{fontSize: 19}} align='center' marginTop={2}>
          Search fora currency
        </Typography>
        <Box marginTop={1} align='center'>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
          />
        </form>
        </Box>
      </Box>

      <Container>
        <Grid container spacing={2} marginTop={3}>
          {filteredCoins.map(coin => (
            <Grid item key={coin.id} xs={12} md={6} lg={4}>
              <Box marginBottom={1} align="center">
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="p">Name: {coin.name}</Typography>
                    <Box>
                      <Avatar
                      alt="Coin Logo"
                      src={coin.image}
                      sx={{ width: 56, height: 56 }}
                      />
                    </Box>
                    <Box sx={{color: 'success.main'}}>
                      <Typography variant="h6" component="p">
                        <Box component="span" sx={{fontSize: 18}}>Price: </Box>
                        <Box component="span" sx={{fontWeight: 'bold'}}>$</Box>{coin.current_price}
                        <Box component="span" marginLeft={1} sx={{fontSize: 13}} className={coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}>{(coin.price_change_percentage_24h).toFixed(2)}%</Box>
                      </Typography>
                      <Typography variant="p" component="p">Symbol: {coin.symbol}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
