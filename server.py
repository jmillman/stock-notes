from flask import Flask, json
from flask import request
from flask import render_template
import datetime
import os
import time
import glob
import requests
import re
import time
from pathlib import Path


api = Flask(__name__)

def check_dir(directory_name):
  if not os.path.exists(directory_name):
    os.makedirs(directory_name)

# @app.errorhandler(404)
# def errorhandler(e)
#     return xyz


@api.route('/get_notes', methods=['GET'])
def get_note():
    directory_name = 'data_notes'
    check_dir(directory_name)
    file_name = "{}/my_notes.json".format(directory_name)
    notes = []
    if(os.path.isfile(file_name)):
        with open(file_name, 'r+') as f:
            notes = json.load(f)
    return json.dumps({'status': 'success', 'data': notes}), 200


@api.route('/save_note', methods=['POST'])
def save_note():
    directory_name = 'data_notes'
    check_dir(directory_name)
    file_name = "{}/my_notes.json".format(directory_name)
    note = {
        'symbol': request.form.get('symbol'),
        'title': request.form.get('title'),
        'body': request.form.get('body')
         }

    if(not os.path.isfile(file_name)):
        with open(file_name, 'w') as f:
            json.dump([note], f)
    else:
        notes = []
        with open(file_name, 'r') as f:
            notes = json.load(f)
            notes.append(note)
        with open(file_name, 'w') as f:
            json.dump(notes, f)

    return json.dumps(
        {
            'status': 'success',
            'message': 'saved',
            
        }
        ), 200

@api.route('/stock_notes', methods=['GET'])
def get_stock_notes():
    directory_name = 'data_filings_pro'
    check_dir(directory_name)
    files = sorted(glob.glob("{}/*.json".format(directory_name)))
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
    return json.dumps({'status': 'success', 'data': stock_notes}), 200


@api.route('/lookup_symbol', methods=['GET'])
def lookup_symbol():
    try:
        directory_name = 'data_filings_pro'
        check_dir(directory_name)
        symbol = request.args.get('symbol')
        if(symbol):
            page = requests.get('https://api.filingspro.com/sec?ticker=' + symbol)

            stock_data = json.loads(page.content)

            if(stock_data['stockInfo']['name']):
                check_dir(directory_name)
                file_name = "{}/{}-{}.json".format(directory_name, datetime.datetime.now().strftime("%Y-%m-%d"), symbol)

                with open(file_name, 'w') as json_file:
                    json.dump(stock_data, json_file)

                return json.dumps({'status': 'success', 'message': 'Symbol Saved'}), 200
            else:
                return json.dumps({'status': 'error', 'message': 'Symbol not found'}), 200
        else:
            return json.dumps({'status': 'error', 'message': 'No Symbol'}), 200
    except Exception as err:
        return json.dumps({'status': 'error', 'message': repr(err)}), 200




@api.route('/', methods=['GET'])
def index():
    return render_template("index.html")
    
if __name__ == '__main__':
    api.run()