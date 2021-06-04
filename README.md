# Project-02
Yelp Metadata

For our project revolving around yelp, and what factors have influences on restaurant rating, we will mainly be using this Kaggle dataset.
https://www.kaggle.com/yelp-dataset/yelp-dataset?select=yelp_academic_dataset_business.json

The goal of our project will be to create a flask dashboard that will respond to specific user interaction and allow them to find the trends they would like to see. We plan on using d3, to create a plot allowing for the user to view how specific restaurant attributes affect rating and price, and leaflet plots to allow the user to find correlations between locations and rating.

Also to serve as practice, the data will be stored in a database after being uploaded from a csv file. 

These are the images we are using to serve as inspiration for our visualizations

Map of US States using a scale to identify certain polygons. We would use this on a more local base, using scaled polygons to show median income in neighborhoods, to allow the user to see if they can see any trends for the restaurants and income.
![image](https://user-images.githubusercontent.com/78449256/120745279-aae01600-c4b1-11eb-8786-e99b2b357479.png)

This plot shows markers which we would like to use to contain additional information about each restaurant, this will be able to be toggled on and off.
![image](https://user-images.githubusercontent.com/78449256/120745473-13c78e00-c4b2-11eb-9da8-7552b07d0dee.png)

Finally, this d3 plot shows a trend that can be observed by the users, but also allows them to look specifically at certain teams. In our case we would use a general trend, such as Rating vs. Price point, and allow the user to see how specific attributes of each restaurant (like outdoor seating, wifi, etc.) are influenced by the trend.
https://files.slack.com/files-pri/T01KR1BQWKX-F02409JPM3M/screen_shot_2021-06-03_at_9.18.01_pm.png

