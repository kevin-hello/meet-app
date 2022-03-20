Feature: Specify number of events

  Scenario: When user hasn’t specified a number, 32 is the default number.
    Given the user is on the main page
    When the user hasn’t specified a number of events
    Then the default number of events displayed will be 32 (2 for local test)

  Scenario: User can change the number of events they want to see.
    Given the user is on the main page
    When the user set a number of events in the “Number of Events” field
    Then the specified number of events will be displayed