const winningConditions = {}

winningConditions[String([])] = 0;
winningConditions[String([5])] = 50;
winningConditions[String([1])] = 100;
winningConditions[String([1, 1])] = 200;
winningConditions[String([1, 1, 5])] = 250;
winningConditions[String([5, 5])] = 100;

winningConditions[String([1, 5])] = 150;
winningConditions[String([1, 5, 5])] = 200;
winningConditions[String([1, 1, 5])] = 250;
winningConditions[String([1, 1, 5, 5])] = 300;

winningConditions[String([1, 1, 1])] = 1000; 
winningConditions[String([1, 1, 1, 1])] = 2000;
winningConditions[String([1, 1, 1, 1, 1])] = 3000;
winningConditions[String([1, 1, 1, 1, 1, 1])] = 4000;

winningConditions[String([2, 2, 2])] = 200;
winningConditions[String([2, 2, 2, 2])] = 400;
winningConditions[String([2, 2, 2, 2, 2])] = 600;
winningConditions[String([2, 2, 2, 2, 2, 2])] = 800;

winningConditions[String([3, 3, 3])] = 300;
winningConditions[String([3, 3, 3 ,3])] = 600;
winningConditions[String([3, 3, 3, 3, 3])] = 900;
winningConditions[String([3, 3, 3, 3, 3, 3])] = 1200;

winningConditions[String([4, 4, 4])] = 400;
winningConditions[String([4, 4, 4, 4])] = 800;
winningConditions[String([4, 4, 4, 4, 4])] = 1200;
winningConditions[String([4, 4, 4, 4, 4, 4])] = 1600;

winningConditions[String([5, 5, 5])] = 500;
winningConditions[String([5, 5, 5, 5])] = 1000;
winningConditions[String([5, 5, 5, 5, 5])] = 1500;
winningConditions[String([5, 5, 5, 5, 5, 5])] = 2000;

winningConditions[String([6, 6, 6])] = 600;
winningConditions[String([6, 6, 6, 6])] = 1200;
winningConditions[String([6, 6, 6, 6, 6])] = 1800;
winningConditions[String([6, 6, 6, 6, 6, 6])] = 2400;
winningConditions[String([1, 2, 3, 4, 5 ,6])] = 1500;

// Any three pairs = 750 points

export default winningConditions;