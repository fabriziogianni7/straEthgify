import datetime
from pycoingecko import CoinGeckoAPI
import pandas as pd
from backtester.constants import Constants


def to_datetime(unixtimestamp):
    t = datetime.datetime.fromtimestamp(unixtimestamp)
    return t.date()


def get_token_dataset(token):
    cg = CoinGeckoAPI()
    history = cg.get_coin_market_chart_by_id(
        id=token,
        vs_currency='usd',
        days='max'
    )

    df = pd.DataFrame(history['prices'])
    df = df.rename(columns={0: 'date', 1: 'close'})
    df['date'] = df['date'] / 1000
    df['date'] = df['date'].apply(to_datetime)
    df['open'] = df['close'].shift(1)
    df.set_index('date', inplace=True)

    return df


def get_year_daily_yield():
    return Constants.YEARN_YIELD / 365 / 100
