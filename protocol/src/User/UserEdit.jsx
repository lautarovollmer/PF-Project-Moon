import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../ReduxToolkit/apiCalls/updateUserCall";
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '../assets/default_profile_photo.svg'
import { useImage } from "../hooks/useImage";

import styles from "./UserEdit.module.css";

export default function UserEdit() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user.currentUser)
    const user = useSelector(state => state.userData.currentUser)
    const { type: type1, value: image1, loading: loading1, onChange: onChange1 } = useImage({ type: 'file' })
    const { type: type2, value: image2, loading: loading2, onChange: onChange2 } = useImage({ type: 'file' })

    const [inputs, setInputs] = useState({
        username: user?.username,
        fullName: user?.fullName,
        profilePhoto: user?.profilePhoto || '',
        backgroundPhoto: user?.backgroundPhoto || '',
    });

    function handleInputChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        image1 && setInputs({
            ...inputs,
            profilePhoto: image1,
        });
    }, [image1])

    useEffect(() => {
        image2 && setInputs({
            ...inputs,
            backgroundPhoto: image2,
        });
    }, [image2])

    function handleSubmit(e) {
        e.preventDefault();
        updateUsers(dispatch, currentUser._id, inputs, currentUser.accessToken)
            .then(res => {
                navigate(`/users/${currentUser._id}`)
            })
        setInputs({
            username: "",
            fullName: "",
            profilePhoto: "",
            backgroundPhoto: ""
        });
    }

    return (
        <div id={styles.editCont}>
            <form id={styles.editForm} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.editShell}>
                    <label className={styles.editLabel} >Username: </label>
                    <input
                        className={styles.editInput}
                        name="username"
                        type="text"
                        placeholder={user?.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.editShell}>
                    <label className={styles.editLabel}>FullName: </label>
                    <input
                        className={styles.editInput}
                        name="fullName"
                        type="text"
                        placeholder={user?.fullName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.editShell}>
                    <label className={styles.editLabel}>Profile Photo: </label>
                    <div style={{ width: '150px', height: '150px', position: 'relative' }} >
                        {
                            loading1 ?
                                <img src="https://acegif.com/wp-content/uploads/loading-25.gif" style={{ width: "100%", height: '100%', objectFit: 'cover' }} /> :
                                <img src={!image1 ? inputs?.profilePhoto || DefaultProfile : image1} alt="profile" style={{ width: "100%", height: '100%', objectFit: 'cover', borderRadius: '100%', border: "5px solid #864879" }} />
                        }
                    </div>
                    <input
                        className={styles.editInput}
                        type={type1}
                        id="file1"
                        onChange={onChange1}
                    />
                </div>
                <div className={styles.editShell}>
                    <label className={styles.editLabel} >BackgroundPhoto: </label>
                    <div style={{ width: '300px', height: '150px', position: 'relative' }} >
                        {
                            loading2 ?
                                <img src="https://acegif.com/wp-content/uploads/loading-25.gif" style={{ width: "100%", height: '100%', objectFit: 'cover' }} /> :
                                <img src={!image2 ? inputs?.backgroundPhoto || DefaultProfile : image2} alt="profile" style={{ width: "100%", height: '100%', objectFit: 'cover', border: "5px solid #864879" }} />
                        }
                    </div>
                    <input
                        className={styles.editInput}
                        type={type2}
                        id="file2"
                        onChange={onChange2}
                    />
                </div>
                {!loading1 && !loading2 && <><button id={styles.editSubmit} type="submit" >SUBMIT</button></>}
            </form>
        </div>
    );
}
