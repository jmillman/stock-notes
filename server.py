from flask import Flask, json
from flask import request
from flask import render_template
import datetime
import os
import time
import glob
import requests
import re

api = Flask(__name__)

def check_dir(directory_name):
  if not os.path.exists(directory_name):
    os.makedirs(directory_name)

# @app.errorhandler(404)
# def errorhandler(e)
#     return xyz


@api.route('/stock_notes', methods=['GET'])
def get_stock_notes():
    directory_name = "stock_notes/"
    check_dir(directory_name)
    files = sorted(glob.glob("{}*.json".format(directory_name)))
    stock_notes = {}
    date=None
    for i in range(len(files)):
        with open(files[i], 'r') as myfile:
            r = re.compile('.*\/(.*)\-(.*).json')
            m = r.search(files[i])
            if m:
                date = m.group(1)
                symbol = m.group(2)
                file_contents = myfile.read()
                stock_note = json.loads(file_contents)
                stock_notes[symbol] = stock_note
    data = {
        date: stock_notes
    }
    return data, 200

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