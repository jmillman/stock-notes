from flask import Flask, json
from flask import request
from flask import render_template
import datetime
import os
import time
import glob

def check_dir(directory_name):
  if not os.path.exists(directory_name):
    os.makedirs(directory_name)

api = Flask(__name__)

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


@api.route('/', methods=['GET'])
def index():
    return render_template("index.html")
    
if __name__ == '__main__':
    api.run()