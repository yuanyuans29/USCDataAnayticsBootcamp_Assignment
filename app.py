from flask import Flask, render_template,redirect
from flask_pymongo import PyMongo
import test

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

@app.route("/")
def index():
    mars = mongo.db.mars.find()
    return render_template("index.html",mars=mars)


@app.route("/scrape")
def scrapeddata():
    mars = mongo.db.mars
    mars_data = test.scrape()
    mars.update({}, mars_data, upsert=True)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run()
