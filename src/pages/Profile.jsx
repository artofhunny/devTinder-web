import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import { useState } from "react";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  // const [firstName, setFirstName] = useState(user.firstName);
  // const [lastName, setLastName] = useState(user.lastName);
  // const [age, setAge] = useState(user.age);
  // const [gender, setGender] = useState(user.gender);
  // const [about, setAbout] = useState(user.about);
  // const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  

  return user && (
    <div className="h-full flex-1">
      <div className="flex flex-col flex-col-reverse md:justify-center md:flex-row gap-4 md:gap-5 lg:gap-10 mx-2 sm:mx-5 
      
      rounded-2xl">

        {/* p-2 sm:px-4 sm:py-6 md:py-6 md:px-5 lg:py-6 lg:px-8  */}

        {user && <EditProfile user={user} />}

        {/* profile card */}
        {user && <ProfileCard user={user} />}
      </div>
    </div>
  );
};

export default Profile;
