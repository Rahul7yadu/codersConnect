import React from "react";
import {useDispatch} from 'react-redux'
import Moment from 'react-moment'
import {deleteEducation} from '.././../actions/profile'
const Education = ({ education }) => {
  const dispatch = useDispatch()
  const educations = education.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td className="hide-sm">{exp.degree}</td>
      <td className="hide-sm">{exp.fieldofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td><button className="btn btn-danger" onClick={()=>dispatch(deleteEducation(exp._id))}>Delete</button></td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className = 'table'>
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Tittle</th>
            <th className="hide-sm">field of study</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;