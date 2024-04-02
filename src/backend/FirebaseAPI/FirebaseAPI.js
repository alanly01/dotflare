// Firebase (Cloud Firestore) backend initialization
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/storage';
import firebaseConfig from "./FirebaseConfig";
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Checks if the given token is unique in the database.
// token: a six digit integer
// return: true if six digit integer is unique and false otherwise
async function isTokenUnique(token) {
  const db = firebase.firestore();
  const docRef = db.collection('sessions').doc(token.toString());
  const doc = await docRef.get();
  return !doc.exists;
}

// Generates a unique session token
// return: a random six digit token
async function getUniqueToken() {
  var token = Math.floor(100000 + Math.random() * 900000);
  while (!(await isTokenUnique(token))) { // This is quite inefficient, but will suffice for small scale
    token = Math.floor(100000 + Math.random() * 900000);
  }
  return token
}

// Generates initial session data to upload to Firebase
// sessionToken: the token which we are generating data for
// tokenPair: is cooresponding token to the sessionToken
// isSender: true if sessionToken is for sender and false if it is for receiver
// return: data for given sessionToken
function getTokenData(sessionToken, tokenPair, isSender) {
  if (isSender) {
    return {
      isSender: true,
      uploadedImages: false,
      selectedCategories: false,
      tokenPair: tokenPair
    }
  }
  return {
    isSender: false,
    isVisible: false,
    tokenPair: tokenPair
  }
}

// Adds a sender and receiver session with unique 6-digit tokens.
// This addition occurs atomically, either both tokens are added or none are.
// return: the list [senderToken, receiverToken] on success and null on failure
async function createSession() {
  // NOTE: FOR TESTING WE ARE USING SET KEYS INSTEAD
  // const senderToken = await getUniqueToken()
  // const receiverToken = await getUniqueToken()

  const senderToken = 111111
  const receiverToken = 222222

  const senderData = getTokenData(senderToken, receiverToken, true);
  const receiverData = getTokenData(receiverToken, senderToken, false);

  try {
    await db.runTransaction(async (transaction) => {
      const senderTokenRef = db.collection('sessionTokens').doc(senderToken.toString());
      const receiverTokenRef = db.collection('sessionTokens').doc(receiverToken.toString());

      const senderDoc = await transaction.get(senderTokenRef);
      const receiverDoc = await transaction.get(receiverTokenRef);

      if (!senderDoc.exists && !receiverDoc.exists) {
        transaction.set(senderTokenRef, senderData);
        transaction.set(receiverTokenRef, receiverData);
        console.log('Session tokens added to Firestore atomically:', senderData, receiverData);
      } else {
        throw new Error('Session tokens already exist in Firestore');
      }
    });
  } catch (error) {
    console.error('Error adding session tokens to Firestore:', error);
    return null
  }

  return [senderToken, receiverToken]
}

// THIS FUNCTION IS NOT COMPLETE FOR NOW, BUT THIS IS ALL WE NEED FOR THE MOMENT
// Gets the session data based on given session token
// sessionToken: the token to get the session data from
// return: 1 for sender tokens, 0 for receiver tokens, and -1 for invalid token or error
async function joinSession(sessionToken) {
  const sessionTokenRef = db.collection('sessionTokens').doc(sessionToken.toString());

  try {
    const doc = await sessionTokenRef.get();
    if (doc.exists) {
      const data = doc.data();
      console.log('Session token data:', data);
      return (data.isSender) ? 1 : 0 // THIS NEEDS TO BE CHANGED TO RETURN FULL DATA
    } else {
      console.log('Session token not found in Firestore');
      return -1;
    }
  } catch (error) {
    console.error('Error getting session token data from Firestore:', error);
    return -1;
  }
}


// Adds the list of images and numImgs to the current session in Firebase
// senderToken: the session token of the sender
// receiverToken: the session token of the receiver
// imageList: a list of image files to upload
// return: true on success and false on failure
async function addImages(senderToken, receiverToken, imageList) {
  const sessionDataToken = `${senderToken}_${receiverToken}`;
  const sessionDataDocRef = db.collection('dataDocs').doc(sessionDataToken);
  const storageRef = firebase.storage().ref();

  try {
    await Promise.all(imageList.map(async (imageFile, index) => {
      const imagePath = `${sessionDataToken}/img${index}`;
      const imageRef = storageRef.child(imagePath);
      await imageRef.put(imageFile);
    }));

    console.log('Images uploaded to Firebase Storage successfully.');
  } catch (error) {
    console.error('Error uploading images to Firebase Storage:', error);
    return false;
  }

  try {
    await sessionDataDocRef.update({
      numImgs: imageList.length
    })
    console.log('numImgs added to Firestore successfully');
    return true;
  } catch (error) {
    console.error('Error adding numImgs to Firestore: ', error);
    return false;
  }
}

// Gets the list of images urls from the current session in Firebase
// senderToken: the session token of the sender
// receiverToken: the session token of the receiver
// return: a list of image urls on success and null on failure
async function getImages(senderToken, receiverToken) {
  const sessionDataToken = `${senderToken}_${receiverToken}`;
  const sessionDataDocRef = db.collection('dataDocs').doc(sessionDataToken);
  const storageRef = firebase.storage().ref();
  const imageList = [];

  try {
    const doc = await sessionDataDocRef.get();
    if (!doc.exists) {
      console.error('Document does not exist');
      return null;
    }
    
    const numImgs = doc.data().numImgs;
    if (numImgs === undefined) {
      console.error('numImgs field not found');
      return null;
    }

    for (let i = 0; i < numImgs; i++) {
      const imagePath = `${sessionDataToken}/img${i}`;
      const imageRef = storageRef.child(imagePath);
      const imageUrl = await imageRef.getDownloadURL();
      imageList.push(imageUrl);
    }

    console.log('Images retrieved from Firebase Storage successfully:', imageList);
    return imageList;
  } catch (error) {
    console.error('Error retrieving images from Firebase Storage:', error);
    return null;
  }
}

// Adds the list of categories to the current session in Firebase
// senderToken: the session token of the sender
// receiverToken: the session token of the receiver
// categoryList: a list of strings with each representing a category name
// return: true on success and false on failure
async function addCategories(senderToken, receiverToken, categoryList) {
  const sessionDataToken = `${senderToken}_${receiverToken}`;
  const sessionDataDocRef = db.collection('dataDocs').doc(sessionDataToken);

  try {
    await sessionDataDocRef.update({
      categories: categoryList
    })
    console.log('categories added to Firestore successfully');
    return true;
  } catch (error) {
    console.error('Error adding categories to Firestore: ', error);
    return false;
  }
}

// Gets the list of categories from the current session in Firebase
// senderToken: the session token of the sender
// receiverToken: the session token of the receiver
// return: a list of strings with each representing a category name on success and null on failure
async function getCategories(senderToken, receiverToken) {
  const sessionDataToken = `${senderToken}_${receiverToken}`;
  const sessionDataDocRef = db.collection('dataDocs').doc(sessionDataToken);

  try {
    const doc = await sessionDataDocRef.get();
    if (doc.exists) {
      const categories = doc.data().categories;
      console.log('categories retrieved from Firestore:', categories);
      return categories;
    } else {
      console.log('No categories found in Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error getting categories from Firestore:', error);
    return null;
  }
}


// Adds the feedback for the image to the current session in Firebase
// senderToken: the session token of the sender
// receiverToken: the session token of the receiver
// imgIndex: the index of the image being given feedback
// x: the x-coordinate of the dot as an integer
// y: the y-coordinate of the dot as an integer
// name: the name of the critiquer as a string
// element: the focus/subject of the feedback as a string
// description: description of the element as a string
// effect: the effect the properties of the element has on the image as a string
// sentiment: true if feedback is positive and false if feedback is negative
// category: the index of the category the feedback is related to as an integer
// return: true on success and false on failure
async function addFeedback(senderToken, receiverToken, imgIndex, x, y, name, element, description, effect, sentiment, category) {
  const sessionDataToken = `${senderToken}_${receiverToken}`;
  const feedbackRef = db.collection('feedback').doc(sessionDataToken);

  try {
    const doc = await feedbackRef.get();
    let feedbackData = doc.exists ? doc.data() : {};

    const imgData = feedbackData[`img${imgIndex}`] || { numDots: 0 };

    const dotData = {
      x: x,
      y: y,
      name: name,
      element: element,
      description: description,
      effect: effect,
      sentiment: sentiment,
      category: category
    }
    imgData[`dot${imgData.numDots}`] = dotData;
    imgData.numDots++;

    feedbackData[`img${imgIndex}`] = imgData;

    await feedbackRef.set(feedbackData);

    console.log('Feedback added to Firestore successfully');
    return true;
  } catch (error) {
    console.error('Error adding feedback to Firestore:', error);
    return false;
  }
}

// Gets all the feedback for the image from the current session in Firebase
// senderToken: the session token of the sender
// receiverToken: the session token of the receiver
// imgIndex: the index of the image being given feedback
// return: a list of dot objects on success and null on failure
async function getFeedback(senderToken, receiverToken, imgIndex) {
  const sessionDataToken = `${senderToken}_${receiverToken}`;
  const imageDocRef = db.collection('feedback').doc(sessionDataToken);

  try {
    const doc = await imageDocRef.get();
    if (!doc.exists) {
      console.error('Document does not exist');
      return null;
    }

    const imgData = doc.data()[`img${imgIndex}`];
    if (!imgData || imgData.numDots === 0) {
      console.log(`No dots found for image index ${imgIndex}`);
      return [];
    }

    const dots = [];
    for (let i = 0; i < imgData.numDots; i++) {
      const dotKey = `dot${i}`;
      const dotObject = imgData[dotKey];
      if (dotObject) {
        dots.push(dotObject);
      } else {
        console.error(`Dot object ${dotKey} not found in image data`);
      }
    }

    console.log('Feedback dots retrieved from Firestore:', dots);
    return dots;
  } catch (error) {
    console.error('Error retrieving feedback dots from Firestore:', error);
    return null;
  }
}


export { createSession, joinSession, addImages, getImages, addCategories, getCategories, addFeedback, getFeedback }