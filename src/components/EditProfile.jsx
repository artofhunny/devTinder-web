import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const skill = useRef(null);
  const [error, setError] = useState(null);
  const [skillArr, setSkillArr] = useState([...user.skills]);

  const dispatch = useDispatch();

  const handleAddSkill = () => {
    const newSkill = skill.current.value;
    const newSkillArr = [...skillArr, newSkill];
    setSkillArr(newSkillArr);
  };

  const handleRemoveSkill = (i) => {
    const newSkillArr = [...skillArr];
    newSkillArr.splice(i, 1);
    setSkillArr(newSkillArr);
  };

  const handleUpdateProfile = async () => {
    if(firstName === "" || lastName === "" || age === "" || gender === "" || about === "" || photoUrl === "") {
      setError("Every fields are required");
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
          skills: skillArr,
        },
        { withCredentials: true }
      );
      setError(null);
      dispatch(addUser(res?.data.data));
      console.log(res.data);

      document.getElementById("my_modal_1").showModal()

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" w-full md:w-[40%] bg-base-100 px-4 py-4 sm:px-4 sm:py-6 md:py-6 md:px-5 lg:py-6 lg:px-8 rounded-2xl">
      <h1 className=" font-bold text-2xl sm:text-2xl pb-8">Edit Profile</h1>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="first-name"
            className="font-medium text-sm text-zinc-700"
          >
            First Name
          </label>
          <input
            type="text"
            className="border-2 outline-none text-sm border-zinc-300 py-1 px-3 rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="last-name"
            className="font-medium text-sm text-zinc-700"
          >
            Last Name
          </label>
          <input
            type="text"
            className="border-2 outline-none text-sm border-zinc-300 py-1 px-3 rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="photo-url"
            className="font-medium text-sm text-zinc-700"
          >
            Photo URL
          </label>
          <input
            type="text"
            className="border-2 outline-none text-sm border-zinc-300 py-1 px-3 rounded-lg"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="age" className="font-medium text-sm text-zinc-700">
            Age
          </label>
          <input
            type="text"
            className="border-2 outline-none text-sm w-[80%] border-zinc-300 py-1 px-3 rounded-lg"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="gender" className="font-medium text-sm text-zinc-700">
            Gender
          </label>
          <select
            name=""
            className="border-2 outline-none text-sm w-[80%] border-zinc-300 py-1 px-3 rounded-lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="age" className="font-medium text-sm text-zinc-700">
            About
          </label>
          {/* <input type="text"  /> */}
          <textarea
            className="border-2 outline-none text-sm w-[80%] border-zinc-300 py-1 px-3 rounded-lg"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="age" className="font-medium text-sm text-zinc-700">
            Skills
          </label>
          <input
            type="text"
            className="border-2 outline-none text-sm w-[60%] border-zinc-300 py-1 px-3 rounded-lg"
            // value={skill}
            ref={skill}
            // onChange={(e) => setAge(e.target.value)}
          />
          <button
            onClick={() => handleAddSkill()}
            className="bg-gray-600 px-3 rounded py-[2px] text-white"
          >
            Add
          </button>
        </div>
        <div className="text-xs flex gap-2 flex-wrap">
          {skillArr.map((skill, i) => {
            return (
              <p
                key={skill}
                className="px-2 py-[2px] bg-pink-500 text-white rounded"
                onClick={() => handleRemoveSkill(i)}
              >
                {skill}
              </p>
            );
          })}
        </div>
      </div>

      {error && <p className="bg-red-600 text-white font-medium w-full mt-5 pl-2 rounded">{error}</p>}
      <button
        onClick={() => handleUpdateProfile()}
        className="px-8 mt-3 text-center py-2 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition duration-200"
      >
        Save Profile
      </button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Your profile edit successfully
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfile;
