from flask import Flask, json
from flask import request
from flask import render_template
import datetime
import os
import time
import glob
import requests

api = Flask(__name__)


def check_dir(directory_name):
  if not os.path.exists(directory_name):
    os.makedirs(directory_name)


@api.route('/stock_notes', methods=['GET'])
def post_companies():
    directory_name = "stock_notes/"
    check_dir(directory_name)
    files = sorted(glob.glob("{}*.json".format(directory_name)))
    results = []
    print(files)
    for i in range(len(files)):
        with open(files[i], 'r') as myfile:
            print(files[i])
            results.append(myfile.read())


    return json.dumps(results), 200

@api.route('/lookup_symbol', methods=['GET'])
def lookup_symbol():
    directory_name = "stock_notes/"
    check_dir(directory_name)
    symbol = request.args.get('symbol')
    if(symbol):
        page = requests.get('https://api.filingspro.com/sec?ticker=' + symbol)

        stock_data = json.loads(page.content)

        check_dir(directory_name)
        file_name = "{}/{}-{}.json".format(directory_name, datetime.datetime.now().strftime("%Y-%m-%d"), symbol)

        with open(file_name, 'w') as json_file:
            json.dump(stock_data, json_file)

        return json.dumps({'status': 'OK'}), 200
    else:
        return json.dumps({'status': 'No Symbol'}), 400




@api.route('/', methods=['GET'])
def index():
    return render_template("index.html")
    
if __name__ == '__main__':
    api.run()