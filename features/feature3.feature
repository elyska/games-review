Feature: Viewing game details
    As a user
    I want to be able to view game's details
    to learn more about a game

@details
Scenario: View Chrome Dino datails page
    Given I am on the homepage
    When I click "Details" button next to the "Space Invaders" heading
    Then I should see "Chrome Dino" heading
    And I should see "Google" text 
    And I should see "2014" text 
    And I should see "The player guides a pixelated Tyrannosaurus rex across a side-scrolling landscape, avoiding obstacles to achieve a higher score." text 
    And I should see "doej" text 
    And I should see "11/3/2022" text