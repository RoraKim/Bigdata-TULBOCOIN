import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserAsync, putUserAsync } from "../store/accountSaga";
import Swal from "sweetalert2";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 5vw;
  height: 8vh;
  position: fixed;
  /* margin-top: 1vh;
  margin-left: 5vw; */
  display: inline;
  /* border: 3px red solid; */
`;

const StyledModal = styled.div`
  padding: 3vmin;
  width: 40vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  /* border: 1px solid black; */
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
`;
const StyledModalDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ProfileChangeHeadMsg = styled.div`
  /* border: 2px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: white;
    width: 3.5vw;
    height: 3vh;
    border: 2px solid red;
    border-radius: 5px;
    :hover {
      transform: scale(1.1);
    }
  }
`;

const ProfileImageSelect = styled.div`
  width: 35vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7vh;
`;

const BottomButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5vh;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  padding-top: 1vh;
  button {
    margin: 1vmin;
    width: 7vw;
    height: 4.5vh;
    border-radius: 5px;
    font-family: "Jua", sans-serif;
    font-size: 25px;
    :hover {
      transform: scale(1.1);
    }
  }
  /* border: 2px solid black; */
`;
const ErrorMsg = styled.div`
  color: red;
  margin-left: 5vw;
`;
const EmailChangeMsg = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  height: 5vh;
  button {
    /* justify-content: center;
    align-items: center; */
    width: 5vw;
    height: 4vh;
    padding: 0;
    border-radius: 5px;
    margin: 2vw;
    font-family: "Jua", sans-serif;
    font-size: 15px;
    :hover {
      transform: scale(1.1);
    }
  }
  input {
    width: 25vw;
    height: 3vh;
    /* margin-left: 1vw; */
    border-radius: 5px;
    font-family: "Jua", sans-serif;
    font-size: 25px;
  }
  label {
    width: 5vw;
  }
`;
function ChangeMyInfoModal({ user, handlePageToForm }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [error, setError] = useState({ email: "" });

  const imagePath = [
    { name: "?????????", value: "1" },
    { name: "?????????", value: "2" },
    { name: "?????????", value: "3" },
    { name: "?????????", value: "4" },
    { name: "????????????", value: "5" },
  ];

  useEffect(() => {
    setForm({
      email: user.email,
      imagePath: user.imagePath,
    });
  }, []);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const vaildate = () => {
    const error = {
      email: "",
    };
    if (!mail.test(form.email)) {
      error.email = "????????? ???????????? ??????????????????";
    }
    return error;
  };

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const error = vaildate();
    setError(error);
    if (Object.values(error).some((v) => v)) {
      return;
    } else {
      dispatch(
        putUserAsync({
          imagePath: form.imagePath,
          email: form.email,
          userId: user.userId,
          balance: user.balance,
        })
      );
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "????????? ???????????? ???????????????????",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "???!!!!",
      cancelButtonText: "?????????",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAsync());
      } else {
        Swal.fire({
          text: "??? ????????? ?????? ????????? ???????????? ??? ???????????????",
        });
      }
    });
  };

  return (
    <>
      <StyledModalDiv onClick={handlePageToForm}>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleChangeInfo}>
            <ProfileChangeHeadMsg>
              <h1>??????????????? ????????? ?????????.</h1>
              {/* <button onClick={handlePageToForm}>X</button> */}
            </ProfileChangeHeadMsg>
            <h2>????????? ????????? ????????? ???????????????.</h2>
            <ProfileImageSelect>
              {imagePath.map((item) => (
                <p key={item.value}>
                  <label htmlFor={item.name}>
                    <input
                      type="radio"
                      id={item.name}
                      value={item.value}
                      name="imagePath"
                      checked={item.value === form.imagePath}
                      onChange={handleForm}
                    />
                    <StyledImg
                      src={`${process.env.PUBLIC_URL}/profile/profile${item.value}.png`}
                      alt={`????????? ?????????${item.value}`}
                    />
                  </label>
                </p>
              ))}
            </ProfileImageSelect>
            <h2>???????????? ???????????????</h2>
            <EmailChangeMsg>
              <label htmlFor="email">????????? : </label>
              <input type="text" name="email" value={form.email} onChange={handleForm} />
            </EmailChangeMsg>
            <ErrorMsg>{error.email && <p>{error.email}</p>}</ErrorMsg>
            <BottomButton>
              <button>????????????</button>
            </BottomButton>
          </form>
          <BottomButton>
            <button onClick={handlePageToForm}>??????</button>
            <button onClick={handleDelete}>????????????</button>
          </BottomButton>
        </StyledModal>
      </StyledModalDiv>
    </>
  );
}

export default ChangeMyInfoModal;
