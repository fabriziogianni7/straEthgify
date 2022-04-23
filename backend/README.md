# Backtester
Project to run the backtest
---

### Usage with docker
1. Build the image ```docker build -t backend-eth-amsterdam .  ```
2. Run the image ``` docker run -p 5000:5000 -e API_HOST=0.0.0.0 backend-eth-amsterdam  ```


### Running a backtest
Send a post request to 

http://127.0.0.1:5000/api/v1/backtest/symbol

with the parameters

{
    "asset":"bitcoin",
    "startingBalance": 10000,
    "period": 100,
    "startingDate": "01/01/2015"
}