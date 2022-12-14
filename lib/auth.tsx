import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase';

interface Auth
{
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  token: string | null;
}

interface AuthContext
{
  auth: Auth | null;
  loading: boolean;
  siginWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () =>
{
  return signInWithPopup(auth, provider).then((result) =>
  {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log(user);
  })
    .catch((error) =>
    {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    }
    );
};

export const signOut = () =>
{
  return auth.signOut();
};

// export const onAuthStateChanged = (callback: (user: firebaseConfig.User | null) => void) =>
// {
//   return auth.onAuthStateChanged(callback);
// };

// export const getIdToken = (user: firebaseConfig.User) =>
// {
//   return user.getIdToken();
// };

// export const formatAuthState = (user: firebaseConfig.User): Auth => ({
//   uid: user.uid,
//   email: user.email,
//   name: user.displayName,
//   photoUrl: user.photoURL,
//   token: null,
// });

// const authContext: Context<AuthContext> = createContext<AuthContext>({
//   auth: null,
//   loading: true,
//   siginWithGoogle: async () => { },
//   signOut: async () => { },
// });


// function useProvideAuth()
// {
//   const [ auth, setAuth ] = useState<Auth | null>(null);
//   const [ loading, setLoading ] = useState<boolean>(true);

//   const handleAuthChange = async (authState: firebaseConfig.User | null) =>
//   {
//     if (!authState)
//     {
//       setLoading(false);
//       return;
//     }
//     const formattedAuth = formatAuthState(authState);
//     formattedAuth.token = await authState.getIdToken();
//     setAuth(formattedAuth);
//     setLoading(false);
//   };

//   const signedIn = async (
//     response: firebaseConfig.auth.UserCredential,
//     provider: String = 'google'
//   ) =>
//   {
//     if (!response.user)
//     {
//       throw new Error('No User');
//     }
//     const authUser = formatAuthState(response.user);
//     await addUser({ ...authUser, provider });
//   };

//   const clear = () =>
//   {
//     setAuth(null);
//     setLoading(true);
//   };

//   const siginWithGoogle = async () =>
//   {
//     setLoading(true);
//     return firebase
//       .auth()
//       .signInWithPopup(new firebaseConfig.auth.GoogleAuthProvider())
//       .then(signedIn);
//   };
//   const signOut = async () =>
//   {
//     return firebaseConfig.auth().signOut().then(clear);
//   };

//   useEffect(() =>
//   {
//     const unsubscribe = firebaseConfig.auth().onAuthStateChanged(handleAuthChange);
//     return () => unsubscribe();
//   }, []);

//   return {
//     auth,
//     loading,
//     siginWithGoogle,
//     signOut,
//   };
// }

// export function AuthProvider({ children }: any)
// {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export const useAuth = () => useContext(authContext);
