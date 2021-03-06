# meet-app

The objective of this app is to build a serverless, progressive web application with React using a test driven development technique. This app uses Google Calendar API to fetch upcoming events.

## Features

- Feature 1: Fitler Events by City
  User Story: As a User, I should be able to filter events by city so that I can see lists of events by city.

      - Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
      Given user hasn't serached for any city
      When the user opens the app
      Then the user should see a list of all upcoming events

      - Scenario 2: User should see a list of suggestions when they search for a city
      Given the main page is open
      When user starts typing in a city name
      Then the user should see a list of cities(suggestions) that match what they've typed

      - Scenario 3: User can select a city from the suggested list.
      Given the user was typing "Berlin" in the city textbox
      and the list of suggested cities is showing
      When the user selects a city(e.g., "Berlin, Germany") from the list
      Then their city should be changed to that city("Berlin, Germany")
      and the user should receive a list of upcoming events in that city

- Feature 2: Show/Hide an Event’s details
  User Story: As a User, I should be able to show and hide event details so that I can see the details of various events.

      - Scenario 1: An event element is collapsed by default
      Given the user is on the main page
      When an event is displayed
      Then the event details will be collapsed

      - Scenario 2: User can expand an event to see its details
      Given the user is shown a list of events
      	When the user clicks on an individual event
      	Then the event details will be displayed

      - Scenario 3: User can collapse an event to hide its details
      Given The user has clicked on an event to display details
      	When the user clicks on “close” button
      	Then the event details will be hidden

- Feature 3: Specify number of events
  User Story: As a User, I should be able to specify the number of events are shown so that I can view the specified number of events.

      - Scenario 1: When user hasn’t specified a number, 32 is the default number
      Given a user is on the main page
      When a user hasn't specified a number of events
      Then the default number of events displayed will be 32

      - Scenario 2: User can change the number of events they want to see
      Given the user is on the main page
      When the user set a number of events in the “Number of Events” field
      Then the specified number of events should be displayed

- Feature 4: Use the App when offline
  User Story: As a user, I should be to use the App when offline so that I can view event info when I am not connected to the internet.

      - Scenario 1: Show cached data when there’s no internet connection
      Given the app cached the data
      When there is no internet connection
      Then the app should show cached data

      - Scenario 2: Show error when user changes the settings (city, time, range)
      Given the app is offline
      When the user changes the settings (city, time, range)
      Then the app should display an error message

- Feature 5: Data Visualization
  User Story: As a User, I should be able to view a chart with the number of upcoming events so that I can see upcoming events in each city.

      - Scenario 1: Show a chart with the number of upcoming events in each city
      Given the user is on the main page
      When viewing the main page
      Then a chart should display the upcoming events in each city
