import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/navbar";
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  //   query,
  updateDoc,
  //   where,
} from "firebase/firestore";

interface UserInterface {
  name: string;
  email: string;
  docId: string;
}
export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<UserInterface>({
    email: "",
    name: "",
    docId: "",
  });
  const [authId, setAuthId] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [canUpdate, setCanUpdate] = React.useState<boolean>(false);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setAuthId(uid);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const getUserData = React.useCallback(async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newData = querySnapshot.docs.map((doc:any) => ({
        ...doc.data(),
        id: doc.id,
        email: doc.get('user'),
        uid: doc.get('uid'),
        name: doc.get('name')
      }));
      
      for (let i = 0; i < newData.length; i++) {
        const user = newData[i]['user']
        if (user.uid == authId) {
          setUser({
            email: user.email,
            name:  user.name,
            docId: newData[i].id,
          });
          setCanUpdate(true);
        }
      }
    });
  }, [authId]);

  React.useEffect(() => {
    if (authId !== null && authId.length > 2) {
      //   const getUser = getDoc(authId);
      getUserData();
      
    }
  }, [authId, getUserData]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (canUpdate) {
        const docRef = doc(db, "users", user.docId);
        updateDoc(docRef, {
          user: {
            email: user.email,
            name: user.name,
            uid: authId,
          },
        })
          .then(() => {
            setError(null);
            setSuccess(true);
          })
          
        getUserData();
        setLoading(false);
      } else {
        await addDoc(collection(db, "users"), {
          user: {
            email: user.email,
            name: user.name,
            uid: authId,
          },
        });
        
        setError(null);
        setSuccess(true);
        setLoading(false);
      }
      
    } catch (e) {
      setError("Error updating profile");
      setSuccess(false);
      setLoading(false);
    }
    
  };
  return (
    <>
      <AppNavBar />
      <Card className="px-12 mx-12">
        {error && (
          <>
            <Alert color="failure" onDismiss={() => setError(null)}>
              <span className="font-medium">Error:</span> {error}
            </Alert>
          </>
        )}
        {success && (
          <>
            <Alert color="success" onDismiss={() => setSuccess(false)}>
              <span className="font-medium">Success:</span> Profile updated
              successfully
            </Alert>
          </>
        )}
        <h3 className="text-bold">Profile</h3>
        <p>Profile ID: {authId}</p>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Jane Doe"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              required
            />
          </div>
          <Button type="submit" isProcessing={isLoading}>
            Submit
          </Button>
        </form>
      </Card>
    </>
  );
}
