const Structure = require('./structure');

const struct = new Structure();
struct.readStdIn(() => startProcessing(struct));

function startProcessing(structure) {
  // THIS IS WHERE WE DO THE COOL STUFF
  var iterations = 100;
  var largestResults = [];
  var largestScore = -1;
  for (var i = 0; i < iterations; i++) {
    var arr = getRandomArray(structure.images);
    var score = calculateScore(arr, structure);
    if (score > largestScore) {
      largestResults = arr;
      largestScore = score;
    }
  }
  consoleOutArray(largestResults);
  console.error(largestScore);
}

function consoleOutArray(results) {
  console.log(results.length);
  for (var i = 0; i < results.length; i++) {
    if (Array.isArray(results[i])) {
      console.log(results[i][0], results[i][1]);
    } else {
      console.log(results[i]);
    }
  }
}

function getRandomArray(images) {
  var result = [];

  var horzImages = images.filter(i => i.horz);
  var vertImages = images.filter(i => !i.horz);
  var pairedVertImages = [];
  for (var i = 0; i < vertImages.length / 2; i++) {
    pairedVertImages[i] = [vertImages[i], vertImages[vertImages.length - 1 - i]];
  }
  var allImages = horzImages.concat(pairedVertImages);

  for (var i = 0; i < allImages.length; i++) {
    var image = allImages[i];
    if (Array.isArray(image)) {
      result.push([image[0].index, image[1].index]);
    } else {
      result.push(image.index);
    }
  }
  var shuffledResults = shuffle(result);
  return shuffledResults;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function calculateScore(results, structure) {
  var score = 0;
  for (var i = 0; i < results.length - 2; i++) {
    var img1 = Array.isArray(results[i]) ? [structure.images[results[i][0]], structure.images[results[i][1]]] : structure.images[results[i]];
    var img2 = Array.isArray(results[i+1]) ? [structure.images[results[i+1][0]], structure.images[results[i+1][1]]] : structure.images[results[i+1]];
    score += interestFactor(img1, img2);
  }
  return score;
}

function interestFactor(img1, img2) {
  var commonTags=0;
  var in1only=0;
  var in2onlyMap={};

  var img1tags = Array.isArray(img1) ? img1[0].tags.concat(img1[1].tags) : img1.tags;
  var img2tags = Array.isArray(img2) ? img2[0].tags.concat(img2[1].tags) : img2.tags;

  img2tags.forEach(i => {
    in2onlyMap[i]=1;
  });
  img1tags.forEach((t1) => {
    if(img2tags.includes(t1)) {
      commonTags++;
    } else {
      in1only++;
    }
    delete in2onlyMap[t1]
  });
  var in2only=Object.keys(in2onlyMap).length;
  //console.error("common:",commonTags);
  //console.error("1only:",in1only);
  //console.error("2only:",in2only);
  return Math.min(commonTags, in1only, in2only);
}
