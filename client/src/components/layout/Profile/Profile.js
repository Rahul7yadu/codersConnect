import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileById } from "../../../actions/profile";
import Spinner from "../Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProfileById(id));
  }, []);
console.log(profile)
  return (
    <>
      {profile.length>0 ? (
        <section className="container">
          <Link to="/profiles" className="btn btn-light">
            back
          </Link>
          {auth.isAuthenticated && auth.user._id === id && (
            <Link to="/edit-profile" className="btn btn-light">
              edit profile
            </Link>
          )}
          <ProfileTop />
          <ProfileAbout profile={profile[0]} />
          <div className="profile-exp bg-white p-2">
            {profile[0].experience.length > 0 ? (
              profile[0].experience.map((exp, index) => (
                <ProfileExperience exp={exp} key={exp._id} />
              ))
            ) : (
              <h2>no experience credentials</h2>
            )}
          </div>
          <div className="profile-edu bg-white p-2">
            {profile[0].education.length > 0 ? (
              profile[0].education.map((edu) => {
                return <ProfileEducation key={edu._id} education={edu} />;
              })
            ) : (
              <h2>no education found</h2>
            )}
          </div>
          <div className="profile-github">
              <ProfileGithub username = {profile[0].githubusername}/>
          </div>
          
        </section>
      ):<div className="container">no profile found for this user</div>}
    </>
  );
};

export default Profile;
