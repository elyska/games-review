Feature: Viewing all games
    As a user
    I want to be able to see all games
    so that I can read their name and release year

@seeGames
Scenario: Added game appears on the home page
    Given I am logged in
    And I am on the "Add Game" form page
    When I fill in "name" with "New Game"
    And I fill in "publisher" with "Atari, Inc."
    And I select "1981" from "year"
    And I fill in "description" with "Game *description*"
    And I click the "Submit" button
    Then I should be redirected to the "Home" page
    And I should see a "New Game" heading