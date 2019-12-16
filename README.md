# MS-Financial-App

1. **Project Type:** Plan 1
2. **Group Member Name**: Michael Sadaghyani 
3.   Web Application : [https://msfinancial-app-react.herokuapp.com/](https://msfinancial-app-react.herokuapp.com/) API : [https://msad-api.herokuapp.com/](https://msad-api.herokuapp.com/)
4. [https://github.com/michaelsad10/ms-financial-app](https://github.com/michaelsad10/ms-financial-app)
5. ReactJs, Python Flask, SQLAlchemy, API to get Stock Prices: [https://www.alphavantage.co/documentation/](https://www.alphavantage.co/documentation/)


# 6

The project I created was one where users can enter in their expenses, taxes, investments. My web application would create graphs, pie charts, doughnut charts to display the information they entered to give a graphical idea. I used the API from alphavantage to get the prices of stocks over the past year.

**IMPORTANT**: Since I am using heroku the servers go to sleep. You must first let [https://msad-api.herokuapp.com/](https://msad-api.herokuapp.com/) load as it is my backend allowing the web application to function. When it is done loading it should show a 404 Not Found which is correct. Once it is loaded you can signup for an account on [https://msfinancial-app-react.herokuapp.com/](https://msfinancial-app-react.herokuapp.com/). Also the API I am using for getting stocks only allows 5 requests per minute. So if the stock graphs don't appear it is because the key has timed out and you will have to wait a minute and refresh.  

# 7

**Controllers**
 

/addUser : This is used to sign up new users it checks if the username exists or not if it does it displays an error. If not then it creates a new user.  

**/login**: This is used to login it checks if the username/password is correct if not it will display an error message.  

 **/user/<user_id>**: This is used to get the information about a user such as the username and Id.  

**/taxes**: This endpoint checks to see if there exists any tax information related to the user. If there is it will update it with the new values otherwise it will create a new tax for that user   

**/taxes/<user_id>**: This endpoint finds taxes for users based on their user_id  

**/expenses**: This endpoint inserts all the information entered if it can't find any existing. If it finds existing information it will update it.   

**/expenses/<user_id>**: This endpoint finds the expenses for a user by it's user_id

**/investments** : This endpoint creates a new investments object or it updates an existing one based on the user_id 

**/investments/<user_id>**: This endpoint gets the investments entered by a user by their user_id 

# 8
**VIEWS**

**Login**: This a basic login page where you can enter the login information or click a link to signup 
**SignUp**: This is a basic sign up page where it allows a user to enter information to sign up for a new account 
**Investments**: This is a page that allows you to enter values and when you click the calculate button it will calculate the balance you would have. If the save button is clicked the information is stored in the database. It also has some graphs that show the stock prices over the last year of 4 companies. 
**Expenses**: This is a page that allows you to enter values of your expense. It has an automatically updating doughnut chart and when you click calculate it will generate a total amount. When you click save it will save and store all that information to the database. 
**Taxes**: This is a page that allows you to enter values related to your taxes. It has a pie chart that will show the different percentages of how much tax is taken from the inputted amount. 


# 9
**TABLES**
**User** : id*, username, password - Stores user information its id used to connect all the tables 
**Taxes**: id*, income, federal, state, user_id(foreign key) - Stores the taxes information and is foreign keyed to the User id
**Investments**: id*, principal, rate, years, balance, user_id(foreign key) - Stores the investments and is foreign keyed to the User id 
**Expenses**:: id*, shopping, gas, food_drink, entertainment, bills, automotive, travel, total, user_id(foreign key) - Stores the expenses and is foreign keyed to the User id 



# 10
**Resources**
[https://material-ui.com/](https://material-ui.com/)
[https://reactjs.org/](https://reactjs.org/)
[https://flask-sqlalchemy.palletsprojects.com/en/2.x/](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
[https://stackoverflow.com/](https://stackoverflow.com/)