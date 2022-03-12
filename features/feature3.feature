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

@invalidId
Scenario: Browse to invalid game
    Given I am on the "Home" page
    When I browse to "/games/abc"
    Then I should see "404" heading
    And I should see "PAGE NOT FOUND" text

@markdown
Scenario: Add and view a game with markdown formatting
    Given I am logged in
    And I am on the "Add Game" form page
    When I fill in "name" with "Microsoft Solitaire"
    And I fill in "publisher" with "Microsoft Casual Games"
    And I select "1990" from "year"
    And I fill in "description" with "When a [game](https://en.wikipedia.org/wiki/Microsoft_Solitaire) is **won**, the cards appear to fall off each stack and *bounce off* the screen."
    And I click the "Submit" button
    And I click "Details" button next to "Microsoft Solitaire" heading
    Then I should see a "https://en.wikipedia.org/wiki/Microsoft_Solitaire" link
    And I should see "won" text in a strong element
    And I should see "bounce off" text in an em element