# Pacman Ai



# What is this Project

Implemented three different agents, utility, simply-rule-based and learning agents for the game pac-man. 
![Demo](https://lamonkey.github.io/Pacman_AI/)
# Installation

clone the repo and open index.html using browser. All codes are in Vanilla JS 

# Credit

The PacMan game is forked form:

[adeyinkaezra123/Pacman](https://github.com/adeyinkaezra123/PacMan)

# Introduction

## Rule Based Agent

![rule_based.gif](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/rule_based.gif)

Only two rules

1. if no ghost are approaching then seeking pellet
2. else run evasion algorithm

### Seeking Pellest

Two strategies were considered. Chose the second approach due to better performance

1. Find a random pellet
- Within the food pellets list, return a random pellet to seek
- Pro: faster, since we just had to sample a random index in the array
- Con: Often made pacman seek a pellet in a far away corner, reducing the efficiency
- Mean 2203 Max 5480
1. Find the nearest pellet
- We utilize the manhattan distance from pacman to a tile to get the distance to food
- Return the pellet with minimum distance
- Pro: Have pacman be more efficient since he seeks the closest pellet
- Con: O(n) time where n is the number of pellets
- Mean 3936 Max: 7720

### Evasion

Used BFS to find the safest tile within x radius of pacman

The safest tile is the tile which has the max minimum distance between all ghost

The result shows as below

![Untitled](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/Untitled.png)

### Analysis

![Untitled](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/Untitled%201.png)

*Why we use 8 as the minimum distance*

The corner and long aisle is the easiest place for pacman to be flanked (And the length of those is around 8 )

Increasing the range for evasion can improve prediction result, but Pac-Man will spend more time escaping instead of seeking pellets.

## Utility Agent

- Generate a utility score for each available tiles adjacent to PacMan
- $u = \text{tile value} + \text{safety value}$
    - $\text{tile value} = -k * \text{distance to pellets}$
    - $k$  is a constant value for weighting the distance value
    - $\text{safety value} = max(f(\text{distance to ghost}))$ or $average(f\text{distance to ghost})$
- PacMan always move to the tile with max utilty
- I experimented different function for $f$
    - Linear scaled
    - exponential scaled
    - logarithmic scaled
    - Logistic scaled

## Mitigate Oscillation

![osicllation.gif](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/osicllation.gif)

When two tiles have same utility pacman man will oscillate between them as show above.

- It is not a problem when equal utility is caused by safety_value.
- It is a problem when equal utility is caused by tile_value

To mitigate I tried two methods

1. Give a penalty if pacman move backward,
2. Give a preference [0.1,0.2,0.3,0.4] for each direction, the preference will be shuffled when pacman move to a new tile.

### Going Back Penalty 1

![going back 1.gif](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/going_back_1.gif)

### Going Back Penalty 2

![going back 2.gif](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/going_back_2.gif)

### Shuffling Preference

![pref_shuffle.gif](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/pref_shuffle.gif)

I conclude the going back penalty and direction preference will not mess up the utility function as long as these value no larger than the derivative of tile value function.

However preference shuffle will be a better solution

### Pick of $f$

Three goals $f$ should achieve 

1. Don’t bump into ghost in order to pick up pellets
2. Can seek pellet even if it means we get closer to a ghost
3. Agent will collide with ghost if ghost is scared

**I will only show the analysis why I picked logistic function**

![Screenshot 2023-01-01 at 1.12.19 AM.png](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/Screenshot_2023-01-01_at_1.12.19_AM.png)

- Green derivative of utility function
- Red is utility function
- Purple is Y = 0.5, derivative of tile_value.
- Safe_distance where purple and green intercepted
- X < safe_distance risk averse.
- X >= safe_distance can be made as risk neutral by ignoring safety value below certain threshold, in this case 0.496
- Obviously goal 1 and goal 2 can be achieved.

and when ghost are in flee mode(PacMan obtain power pellet)

by simply negate the utilty function, pacman will prioritize to pursued ghost when within the safe distance.

![Untitled](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/Untitled%202.png)

here is the demo

![logistic_emo.gif](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/logistic_emo.gif)

## Learning Agent

I took a very naive approach on learning agent. 

- Based on Logistic Utility Agent I implemented an learning agent.
- Because the nature of vanilla javascript this is very rudimentary approach.
- Run 200 iteration and log every location pacman died.
- Add dead_count / (1+ghost_distance) to that tile to indicate those tiles are dangerous

![Untitled](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/Untitled%203.png)

## Result Comparision

![Screenshot 2023-01-01 at 1.19.15 AM.png](Pacman%20Ai%202ee97b96a7a74fd28d1fbd67586e3aba/Screenshot_2023-01-01_at_1.19.15_AM.png)
