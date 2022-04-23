from backtester.utils import get_token_dataset, get_year_daily_yield
import numpy as np


def backtest_single_asset(asset, starting_balance, start_date, period):
    year_yield = get_year_daily_yield()
    df_prices = get_token_dataset(asset)
    df_prices = df_prices.loc[start_date:]

    df_prices['return'] = df_prices['close'] / df_prices['open']
    df_prices['benchmark'] = starting_balance * df_prices['return'].cumprod()
    df_prices['benchmark_peak'] = df_prices['benchmark'].cummax()
    df_prices['benchmark_dd'] = df_prices['benchmark'] - \
        df_prices['benchmark_peak']
    df_prices['sma'] = df_prices['close'].rolling(window=period).mean()

    df_prices['long'] = df_prices['close'] > df_prices['sma']
    df_prices['strategy_return'] = np.where(
        df_prices['long'].shift(1) == True,
        df_prices['return'],
        1.0)

    df_prices['return_yearn'] = np.where(
        df_prices['long'].shift(1) == True,
        df_prices['return'],
        1.0 + year_yield)

    df_prices['strategy'] = starting_balance * \
        df_prices['strategy_return'].cumprod()
    df_prices['strategy_peak'] = df_prices['strategy'].cummax()
    df_prices['strategy_dd'] = df_prices['strategy'] - \
        df_prices['strategy_peak']

    df_prices['strategyWYearn'] = starting_balance * \
        df_prices['return_yearn'].cumprod()

    benckmark_return = round(
        (df_prices['benchmark'][-1] / df_prices['benchmark'][1]) * 100,
        2)

    benckmark_max_drawdown = (
        df_prices['benchmark_dd'] / df_prices['benchmark_peak']).min() * 100

    strategy_return = round(
        (df_prices['strategy'][-1] / df_prices['strategy'][1]) * 100,
        2)

    strategy_max_drawdown = (
        df_prices['strategy_dd'] / df_prices['strategy_peak']).min() * 100

    df_prices.reset_index(inplace=True)
    df_prices['date'] = df_prices['date'].apply(
        lambda x: x.strftime('%Y-%m-%d'))

    df_strategy = df_prices[['date', 'strategy']]
    df_strategy.rename(columns = {'strategy':'value'}, inplace = True)
    df_benchmark = df_prices[['date', 'benchmark']]
    df_benchmark.rename(columns = {'benchmark':'value'}, inplace = True)
    df_strategyWYearn = df_prices[['date', 'strategyWYearn']]
    df_strategyWYearn.rename(columns = {'strategyWYearn':'value'}, inplace = True)

    return {
        "benchmarkReturn": benckmark_return,
        "benchmarkMaxDrawdown": benckmark_max_drawdown,
        "strategyReturn": strategy_return,
        "strategyMaxDrawdown": strategy_max_drawdown,
        "strategy": df_strategy[['date', 'value']].to_dict(orient='records'),
        "benchmark": df_benchmark[['date', 'value']].to_dict(orient='records'),
        "strategyWithYearn": df_strategyWYearn[['date', 'value']].to_dict(orient='records')
    }
