Feature: Adding a New game
    As a user 
    I want to see Add game button on the homepage 
    So that I can add new game details

@gameForm
Scenario: Logged in user accessing the Add Game form page
    Given I am logged in
    And I am on the Home page
    When I click the "Add Game" button
    Then I should see a "name" field
    And I should see a "publisher" field
    And I should see a "year" slider input
    And I should see a "description" textbox
    And I should see an "image" file input

@notLoggedIn
Scenario: Accessing the Add Game form page without logging in
    Given I browse to /add-game
    And I am not logged in
    Then I should be redirected to the "Home" page
    But I should not see the "Add game" button

@addGame
Scenario: Adding a nęw game
    Given I am logged in
    And I am on the "Add Game" form page
    When I fill in "name" with "Space Invaders"
    And I fill in "publisher" with "Atari, Inc."
    And I select "1981" from "year"
    And I fill in "description" with "Space Invaders is a fixed shooter in which the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead."
    And I click the "Submit" button
    Then I should be redirected to the "Home" page