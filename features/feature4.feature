Feature: Adding reviews
    As a user 
    I want to be able to add a game's review 
    so that other people can see my opinion on the game

@newReview
Scenario: Review Pac-Man
    Given I am logged in as "user2"
    And I am on the "Pac-Man" details page
    When I select "5" from "rating"
    And I fill in "review" with "Fun game"
    And I click "Submit" button
    Then I should be on the "Pac-Man" details page
    And I should see "user2" text
    And I should see "Rating: 5 out of 5" text
    And I should see "Fun game" text

@loggedOut
Scenario: Logged out user
    Given I am logged out
    When I browse to "/games/1"
    Then I should not see a form