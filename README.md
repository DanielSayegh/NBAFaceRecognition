# NBAFaceRecognition
 This program uses haar cascade in order to create an accurate model that can classify an NBA player by a picture of their face. The model folder contains
 "NBA_Player_Classification" which is the program in which the dataset is cleaned and the model is trained. 

'''
 pip install -r requirements.txt 
'''

The dataset folder contains all the images the program will run through as well as the cropped folder containing the cropped images of all images with a clear face and two eyes that will be created after the program is run.

The server folder contains a simple python flask server which is necessary to run for the backend classification to work within the UI. The folder also contains "artificats" which is the class dictionary.json and trained model
'''
 pip install -r requirements.txt 
'''

The UI folder is necessary for the frontend portion of the project. This folder contains all the necessary code and files to create the website in which any user can input an image and the model will predict which NBA player that image contains. Furthermore, this UI will also print out the current stats within the 2021-2022 NBA season of that player as well. This is used in conjuction with the NBA Dataset Scrape program to obtain the dataset used to display the stats.
