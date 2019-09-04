from flask import Flask, render_template,redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mission_app"
mongo = PyMongo(app)

@app.route("/")
def index():
    scrape_dict = mongo.db.scrape_dict.find_one()
    return render_template("index.html", scrape_dict=scrape_dict)
    # return render_template("index.html")

@app.route("/scrape")
def scrapeddata():
    scrape_dict = mongo.db.scrape_dict
    scrape_data = scrape_mars.scrape()
    scrape_dict.update({}, scrape_data, upsert=True)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run()
