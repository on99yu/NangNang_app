import classes from './MyInfo.module.css';
import { useState, useEffect } from 'react';
import { userDataDB } from '../../../../databasefunction/UserDataCRUD';

const MyInfoContents = () => {
    const [inputDisable, setInputDisable] = useState(false);
    const [ableToUpdate, setAbleToUpdate] = useState(false);
    const [userData, setUserData] = useState({
        consumer_or_not: undefined,
        email: '',
        id: '',
        password: '',
        phone_number: '',
        real_name: '',
        resident_registration_number: '',
    });

    const handleRead = async () => {
        const data = await userDataDB.readUserData(userData.id);
        if (data) {
            setUserData((prevUserData) => {
                if (prevUserData !== null) {
                    return {
                        ...prevUserData,
                        id: data.id,
                        password: data.password,
                        consumer_or_not: data.consumer_or_not,
                        email: data.email,
                        real_name: data.real_name,
                        phone_number: data.phone_number,
                        resident_registration_number: data.resident_registration_number,
                    };
                }
                return data;
            });
            setInputDisable(true);
            console.log(userData);
        } else {
            alert('사용자 데이터를 읽어오는데 실패했습니다.');
        }
    };

    const handleUpdateButtons = () => {
        setInputDisable(false);
        setAbleToUpdate(true);
    };

    const handleUpdate = async () => {
        const result = await userDataDB.updateUserData(
            userData.id,
            userData.password,
            userData.email,
            userData.real_name,
            userData.phone_number
        );
        if (result) {
            alert('사용자 데이터가 성공적으로 수정되었습니다.');
            setAbleToUpdate(false);
        } else {
            alert('사용자 데이터 수정에 실패했습니다.');
        }
    };

    const handleUpdateCancel = () => {
        setAbleToUpdate(false);
        setInputDisable(true);
    };

    const handleDelete = async () => {
        const result = await userDataDB.deleteUserData(userData.id);
        if (result === 1) {
            console.log('사용자 데이터가 성공적으로 삭제되었습니다.');
        } else {
            console.log('사용자 데이터 삭제에 실패했습니다.');
        }
    };

    useEffect(() => {
        // 초기 데이터 로드 등 필요한 작업 수행
    }, []);

    return (
        <form className={classes.walleview_component_form}>
            <label>
                <span className={classes.formtext}>아이디&nbsp;&nbsp;</span>
                <input
                    disabled={inputDisable}
                    type="text"
                    value={userData.id}
                    onChange={(e) =>
                        setUserData((prevUserData) => ({
                            ...prevUserData,
                            id: e.target.value,
                        }))
                    }
                />
            </label>
            <br />
            {userData.password && (
                <div className={classes.walleview_component_form_input}>
                    <label>
                        <span className={classes.formtext}>비밀번호&nbsp;&nbsp;</span>
                        <input
                            disabled={inputDisable}
                            type="password"
                            value={userData.password}
                            onChange={(e) =>
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <br />
                    <label>
                        <span className={classes.formtext}>
                            판매자/구매자&nbsp;&nbsp;
                        </span>
                        <select
                            disabled="disabled"
                            value={userData.consumer_or_not}
                            onChange={(e) =>
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    consumer_or_not: Number(e.target.value),
                                }))
                            }
                        >
                            <option value={0}>판매자</option>
                            <option value={1}>소비자</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <br />
                    <label>
                        <span className={classes.formtext}>이메일&nbsp;&nbsp;</span>
                        <input
                            disabled={inputDisable}
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <br />
                    <label>
                        <span className={classes.formtext}>이름&nbsp;&nbsp;</span>

                        <input
                            disabled="disabled"
                            type="text"
                            value={userData.real_name}
                            onChange={(e) =>
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    real_name: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <br />
                    <label>
                        <span className={classes.formtext}>전화번호&nbsp;&nbsp;</span>
                        <input
                            disabled={inputDisable}
                            type="text"
                            value={userData.phone_number}
                            onChange={(e) =>
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    phone_number: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <br />
                    <label>
                        <span className={classes.formtext}>
                            주민등록번호&nbsp;&nbsp;
                        </span>

                        <input
                            disabled="disabled"
                            type="text"
                            value={userData.resident_registration_number}
                            onChange={(e) =>
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    resident_registration_number: e.target.value,
                                }))
                            }
                        />
                    </label>
                </div>
            )}
            <br />
            <div className={classes.form_button_div}>
                {userData.password ? (
                    <div className={classes.button2and3wrap}>
                        {ableToUpdate ? (
                            <div className={classes.button2and3wrap}>
                                <button
                                    type="button"
                                    className={classes.button2}
                                    onClick={handleUpdate}
                                >
                                    수정완료
                                </button>
                                <button
                                    type="button"
                                    className={classes.button3}
                                    onClick={handleUpdateCancel}
                                >
                                    취소
                                </button>
                            </div>
                        ) : (
                            <div className={classes.button2and3wrap}>
                                <button
                                    type="button"
                                    onClick={handleUpdateButtons}
                                    className={classes.button2}
                                >
                                    수정
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className={classes.button3}
                                >
                                    탈퇴
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleRead}
                        className={classes.button1}
                    >
                        확인
                    </button>
                )}
            </div>
        </form>
    );
};


export default MyInfoContents;