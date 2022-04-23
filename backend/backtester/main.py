from flask import (
    Flask,
    abort,
    request,
    jsonify
)
from dotenv import load_dotenv
from flask_cors import CORS
import os
import datetime

from backtester.controllers.strategies import (
    backtest_single_asset
)

load_dotenv()
app = Flask(__name__)
CORS(app)


@app.route('/api/v1/backtest/symbol', methods=['POST'])
def calculate_backtest():

    request_values = request.json

    return jsonify(backtest_single_asset(
        asset=request_values['asset'],
        starting_balance=request_values['startingBalance'],
        period=request_values['period'],
        start_date=datetime.datetime.strptime(request_values['startingDate'], "%d/%m/%Y").date()
    ))


if __name__ == '__main__':
    app.run(host=os.getenv('API_HOST'), port=os.getenv('API_PORT'))
