export const getFlagImage = (cuisine) => {
  console.log('getFlagImage received:', JSON.stringify(cuisine, null, 2));

  const flagImages = {
    italian: require('../assets/flags/italian.png'),
    vietnamese: require('../assets/flags/vietnamese.png'),
    chinese: require('../assets/flags/chinese.png'),
    japanese: require('../assets/flags/japanese.png'),
    lebanese: require('../assets/flags/lebanese.png'),
    irish: require('../assets/flags/irish.png'),
    mexican:require('../assets/flags/mexican.png')
  };
  if (Array.isArray(cuisine) && cuisine.length > 0) {
    const primaryCuisine = cuisine[0].name || cuisine[0];
    // console.log('Primary cuisine:', primaryCuisine);
    return flagImages[primaryCuisine.toLowerCase()] || require('../assets/flags/default.png');
  } 
  else if (typeof cuisine === 'object' && cuisine !== null) {
    // console.log('Cuisine object:', cuisine.name);
    return flagImages[cuisine.name.toLowerCase()] || require('../assets/flags/default.png');
  }
  else if (typeof cuisine === 'string') {
    // console.log('Cuisine string:', cuisine);
    return flagImages[cuisine.toLowerCase()] || require('../assets/flags/default.png');
  }
  // console.log('Using default flag');
  return require('../assets/flags/default.png');
};