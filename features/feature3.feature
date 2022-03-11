Feature: Viewing game details
    As a user
    I want to be able to view game's details
    to learn more about a game

@details
Scenario: View Space Invaders datails page
    Given I am on the homepage
    When I click "Details" button next to the Space Invaders heading
    Then I should see "Space Invaders" heading
    And I should see "Atari, Inc." text 
    And I should see "1981" text 
    And I should see "Space Invaders is a fixed shooter." text 
    And I should see "Atari, Inc." text 
    And I should see "doej" text 
    And I should see "11/3/2022" text