import React from 'react'

const ProfileAbout = ({profile}) => {
  return (

        <div className="profile-about bg-light p-2">
          {profile.bio&&
          <><h2 className="text-primary">{profile.user.name}'s Bio</h2>
          <p>
            {profile.bio}
          </p>
          <div className="line"></div></>
          
          }

          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
          {profile.skills.map((skill,index)=>{return (<div className='p-1' key={index}><i className="fas fa-check"/>{skill}</div>)})}
          </div>
        </div>
  )
}

export default ProfileAbout