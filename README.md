# Vietnam_Internship

This repo contains 3 distinct parts of the acomplished work. The models, the application and the API for the application. 

## The models

The first one, models contains our models to recognize famous places from Vietnam. It has been trained on 15 classes and about 1500 images. The accuracy using VGG-19 is 94% and 85% when using our own model. 

## The API

The API is used in the application to know in real time what location you are in front of, and to get informations about it. Normally, it should be running all the time on a server, but since we don't have one it must be manually launch. That creates another issue, althought the predictions are correct, the interpretation of the app of the class number can be wrong as the numbers can be randomised at the first launch of the API. Normally this must only be calibrated once at the first start of the API by changing the id of the classes in the application constants desc.

## The Application

How to launch and use it can be found in the readme of the application file. The applications provides differents locations with some informations. You can browse to find the one you're looking for on the locations screen using the search bar. The main screen allows you to take pictures directly or from you gallery and analyse it, it then automatically redirects you to the location it corresponds to. The last screen is "work in progress", as it was supposed to be used to switch between models but a compatibility error across packages blocked the possibility to put a model directly in the application. 
