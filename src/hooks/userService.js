import { 
    doc, getDoc, setDoc 
  } from "firebase/firestore";
  import { 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider 
  } from "firebase/auth";
  import { db, auth } from "../config/firebaseConfig";
  
  // Function to generate a username from email
  const generateUsername = (email) => {
    return email.split("@")[0]; // Takes the part before '@'
  };
  
  // ✅ Register user with Email/Password
  export const registerUser = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update Firebase Auth profile (display name)
      await updateProfile(user, { displayName: userData.firstName });
  
      // Store user details in Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: generateUsername(user.email),
        phoneNum: userData.phone || "Not Provided",
        numRides: 0,
        profilePicture: "",
        provider: "email",
        createdAt: new Date(),
      };
  
      await setDoc(doc(db, "users", user.uid), userDoc);
  
      return { success: true, message: "User registered successfully", userId: user.uid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Login user with Email/Password
export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      return { success: true, message: "Login successful", userId: user.uid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  // ✅ Google Login / Signup
  export const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        const userDoc = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          firstName: user.displayName.split(" ")[0] || "Google User",
          lastName: user.displayName.split(" ")[1] || "",
          username: generateUsername(user.email),
          phoneNum: "Not Provided",
          numRides: 0,
          profilePicture: user.photoURL || "",
          provider: "google",
          createdAt: new Date(),
        };
  
        await setDoc(userRef, userDoc);
      }
  
      return { success: true, message: "Google sign-in successful", userId: user.uid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  // ✅ Facebook Login / Signup
  export const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        const userDoc = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          firstName: user.displayName.split(" ")[0] || "Facebook User",
          lastName: user.displayName.split(" ")[1] || "",
          username: generateUsername(user.email),
          phoneNum: "Not Provided",
          numRides: 0,
          profilePicture: user.photoURL || "",
          provider: "facebook",
          createdAt: new Date(),
        };
  
        await setDoc(userRef, userDoc);
      }
  
      return { success: true, message: "Facebook sign-in successful", userId: user.uid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  // ✅ Apple Login / Signup
  export const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        const userDoc = {
          uid: user.uid,
          email: user.email || "", // Apple sometimes hides emails
          emailVerified: user.emailVerified,
          firstName: user.displayName ? user.displayName.split(" ")[0] : "Apple User",
          lastName: user.displayName ? user.displayName.split(" ")[1] : "",
          username: generateUsername(user.email || `apple_${user.uid.slice(-4)}`),
          phoneNum: "Not Provided",
          numRides: 0,
          profilePicture: user.photoURL || "",
          provider: "apple",
          createdAt: new Date(),
        };
  
        await setDoc(userRef, userDoc);
      }
  
      return { success: true, message: "Apple sign-in successful", userId: user.uid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  