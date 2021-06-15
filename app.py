# Dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/Yelp"
mongo = PyMongo(app)


# Route to render index.html template using data from Mongo
@app.route("/")
def index():

    # Find one record of data from the mongo database

    yelp_dict = mongo.db.yelp_vegas.find()
    income_data_mongo = mongo.db.income_data.find()
    # Return template and data
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)