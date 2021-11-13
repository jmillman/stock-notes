from flask import Flask, json
from flask import request
from flask import render_template
import datetime
import os
import time
import glob
import requests
from pathlib import Path
from bs4 import BeautifulSoup
from selenium import webdriver
import re
import csv
import pandas as pd
import numpy

api = Flask(__name__)
# driver = webdriver.Chrome("/usr/bin/chromedriver")
# driver = webdriver.Chrome()
driver = None


def check_dir(directory_name):
    if not os.path.exists(directory_name):
        os.makedirs(directory_name)


# @app.errorhandler(404)
# def errorhandler(e)
#     return xyz


@api.route("/get_notes", methods=["GET"])
def get_note():
    directory_name = "data_notes"
    check_dir(directory_name)
    file_name = "{}/my_notes.json".format(directory_name)
    notes = []
    if os.path.isfile(file_name):
        with open(file_name, "r+") as f:
            notes = json.load(f)
    return json.dumps({"status": "success", "data": notes}), 200


@api.route("/save_note", methods=["POST"])
def save_note():
    directory_name = "data_notes"
    check_dir(directory_name)
    file_name = "{}/my_notes.json".format(directory_name)

    if request.form.get("edit_id"):
        notes = []
        with open(file_name, "r") as f:
            notes = json.load(f)
            for note in notes:
                if note["date"] == request.form.get("edit_id"):
                    note["title"] = request.form.get("title")
                    note["body"] = request.form.get("body")
        with open(file_name, "w") as f:
            json.dump(notes, f, indent=4)

    else:
        note = {
            "symbol": request.form.get("symbol"),
            "title": request.form.get("title"),
            "body": request.form.get("body"),
            "date": request.form.get("date_stamp"),
        }
        if not os.path.isfile(file_name):
            with open(file_name, "w") as f:
                json.dump([note], f, indent=4)
        else:
            notes = []
            with open(file_name, "r") as f:
                notes = json.load(f)
                notes.append(note)
            with open(file_name, "w") as f:
                json.dump(notes, f, indent=4)

    return (
        json.dumps(
            {
                "status": "success",
                "message": "saved",
            }
        ),
        200,
    )


@api.route("/delete_note", methods=["POST"])
def delete_note():
    directory_name = "data_notes"
    check_dir(directory_name)
    file_name = "{}/my_notes.json".format(directory_name)
    edit_id = request.form.get("edit_id")

    if edit_id:
        notes = []
        with open(file_name, "r") as f:
            notes = json.load(f)
            for index, note in enumerate(notes):
                if note["date"] == edit_id:
                    notes.pop(index)
        with open(file_name, "w") as f:
            json.dump(notes, f, indent=4)

    return (
        json.dumps(
            {
                "status": "success",
                "message": "Note Deleted",
            }
        ),
        200,
    )


source = "finviz"
# source = "yahoo"
# source = 'data_filings_pro'
directory_name = source


@api.route("/get_data", methods=["GET"])
def get_data():
    file_name = "../quotes/summary/gapped_up-2021-11-06.csv"
    # file = pd.read_csv(file_name, header=0).head().to_json(orient="records")
    file = pd.read_csv(file_name, header=0).to_json(orient="records")
    print(file)
    data = []
    return (
        file,
        200,
    )


@api.route("/stock_notes", methods=["GET"])
def get_stock_notes():
    check_dir(directory_name)
    files = sorted(glob.glob("{}/*.json".format(directory_name)))
    stock_notes = {}
    search_date = request.args.get("date")
    for i in range(len(files)):
        with open(files[i], "r") as myfile:
            r = re.compile(".*\/(.*)\-(.*).json")
            m = r.search(files[i])
            if m:
                date = m.group(1)
                if search_date == "ALL" or search_date == date:
                    symbol = m.group(2)
                    file_contents = myfile.read()
                    stock_note = json.loads(file_contents)
                    stock_note["date"] = date
                    stock_notes[symbol] = stock_note
    return json.dumps({"status": "success", "data": stock_notes}), 200


@api.route("/daily_data", methods=["GET"])
def daily_data():
    symbol = request.args.get("symbol").upper()
    file_name = "../quotes/stock_history/2021/daily/{}.csv".format(symbol)
    # with open(file_name, "r") as myfile:
    file = pd.read_csv(file_name)
    data = []
    yesterdays_close = file.iloc[0]["close"]
    for index, row in file.iterrows():
        todays_open = row["open"]
        current_row = [
            row["datetime"],
            row["open"],
            row["high"],
            row["low"],
            row["close"],
            row["volume"],
            # gap up
            format((todays_open - yesterdays_close) / yesterdays_close * 100, ".2f")
            + "%",
        ]
        data.append(current_row)
        yesterdays_close = file.iloc[index]["close"]

    #     for row in reader:
    return json.dumps({"status": "success", "data": data}), 200


@api.route("/minute_data", methods=["GET"])
def minute_data():
    symbol = request.args.get("symbol").upper()
    date = request.args.get("date").upper()
    file_name = "../ameritradepython2020/trade_quotes/{}/{}.csv".format(date, symbol)
    # with open(file_name, "r") as myfile:
    file = pd.read_csv(file_name)
    data = []
    for index, row in file.iterrows():
        current_row = [
            row["datetime"],
            row["open"],
            row["high"],
            row["low"],
            row["close"],
            row["volume"],
        ]
        data.append(current_row)

    #     for row in reader:
    return json.dumps({"status": "success", "data": data}), 200


@api.route("/get_trades", methods=["GET"])
def get_trades():
    search_date = request.args.get("date", "ALL")

    files = sorted(glob.glob("{}/*.csv".format("trades")))
    r = re.compile(".*\/trades_(.*).csv")
    data = None
    result = None

    for i in range(len(files)):
        m = r.search(files[i])
        if m:
            date = m.group(1)
            if search_date == "ALL" or search_date == date:
                data = pd.read_csv(files[i])
                data["Date"] = date
                data["DateTime"] = data["Date"] + " " + data["Time"]
                if not isinstance(result, pd.DataFrame):
                    result = data
                else:
                    result = result.append(data)
    return (
        json.dumps({"status": "success", "data": result.to_json(orient="records")}),
        200,
    )


def get_data_filings_pro(symbol):
    page = requests.get("https://api.filingspro.com/sec?ticker=" + symbol)
    stock_data = json.loads(page.content)
    if stock_data["stockInfo"]["name"]:
        return stock_data
    return None


def scrape_yahoo_stats(soup, results, search_item):
    key = search_item[0]
    search_text = search_item[1]
    span_with_text = soup.find_all("span", text=re.compile(r".*" + search_text + ".*"))
    value = "Not Found"
    title = ""
    if span_with_text:
        # strip off the trailing space followed by a digit
        rex = re.compile("([0-9 ]+$)")
        title = rex.sub("", span_with_text[0].parent.parent.contents[0].get_text())
        value = span_with_text[0].parent.parent.contents[1].get_text()
    results[key] = {
        "title": title,
        "value": value,
    }
    return


search_items = {}
search_items["shares_outstanding"] = "Shares Outstanding"
search_items["float"] = "Float"
search_items["held_by_insiders"] = "Held by Insiders"
search_items["held_by_institutions"] = "Held by Institutions"
search_items["shares_short"] = "Shares Short"
search_items["52_week_change"] = "52-Week Change"
search_items["52_week_high"] = "52 Week High"
search_items["52_week_low"] = "52 Week Low"
search_items["50_day_moving_avg"] = "50-Day Moving Average"
search_items["200_day_moving_avg"] = "200-Day Moving Average"
search_items["shares_outstanding"] = "Shares Outstanding"
search_items["short_ratio"] = "Short Ratio"
search_items["short_percent_of_float"] = "Short % of Float"
search_items["short_percent_of_shares_outstanding"] = "Short % of Shares Outstanding"


def get_data_yahoo(symbol):
    results = {}

    url = "https://finance.yahoo.com/quote/" + symbol + "/key-statistics"
    driver.get(url)
    time.sleep(0)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    for search_item in search_items.items():
        scrape_yahoo_stats(soup, results, search_item)

    company_name = soup.select("h1")[0].text

    url = "https://finance.yahoo.com/quote/" + symbol
    driver.get(url)
    time.sleep(0)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    scrape_yahoo_stats(soup, results, ["market_cap", "Market Cap"])

    summary_profile = driver.execute_script(
        "return this.App.main.context.dispatcher.stores.QuoteSummaryStore.summaryProfile;"
    )
    summary_profile = summary_profile if summary_profile != None else {}
    results["profile"] = {
        "title": "Profile",
        "value": summary_profile.get("longBusinessSummary"),
    }
    results["fullTimeEmployees"] = {
        "title": "Profile",
        "value": summary_profile.get("fullTimeEmployees"),
    }
    results["sector"] = {
        "title": "Sector",
        "value": summary_profile.get("sector"),
    }
    results["industry"] = {
        "title": "Industry",
        "value": summary_profile.get("industry"),
    }
    results["company_name"] = {
        "title": "Company Name",
        "value": company_name,
    }

    return results


def get_data_finviz(symbol):
    results = {}

    url = "https://finviz.com/quote.ashx?t=" + symbol
    driver.get(url)
    time.sleep(0)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table", {"class": "snapshot-table2"})
    keys = [
        "Market Cap",
        "Short Float",
        "Shs Float",
        "SMA50",
        "SMA200",
        "Shs Outstand",
        "Prev Close",
        "Price",
        "Perf Week",
        "Perf Month",
        "Perf YTD",
    ]
    for key in keys:
        results[key] = table.findChildren("td", string=key)[0].next_sibling.string
    return results


@api.route("/lookup_symbol", methods=["GET"])
def lookup_symbol():
    symbols = request.args.get("symbol").upper()
    symbols = symbols.split(",")
    symbols_remaining = symbols.copy()
    allSuccessful = True
    # for loop to iterate over words array
    for symbol in symbols:
        try:
            print(symbol.strip().upper())
            data = None
            if source == "data_filings_pro":
                check_dir(directory_name)
                data = get_data_filings_pro(symbol)
            if source == "yahoo":
                check_dir(directory_name)
                data = get_data_yahoo(symbol)
            if source == "finviz":
                check_dir(directory_name)
                data = get_data_finviz(symbol)

            if data:
                check_dir(directory_name)
                file_name = "{}/{}-{}.json".format(
                    directory_name,
                    datetime.datetime.now().strftime("%Y-%m-%d"),
                    symbol,
                )
                with open(file_name, "w") as json_file:
                    json.dump(data, json_file, indent=4)
                symbols_remaining.remove(symbol)
            else:
                allSuccessful = False
        except Exception as err:
            # no data found
            allSuccessful = False

    if allSuccessful:
        return json.dumps({"status": "success", "message": "All Symbols Saved"}), 200
    else:
        return (
            json.dumps({"status": "error", "message": ",".join(symbols_remaining)}),
            200,
        )


@api.route("/", methods=["GET"])
def index():
    print('get /');
    return render_template("index.html")


if __name__ == "__main__":
    print('start app');
    # api.run()
    api.run(host='0.0.0.0')