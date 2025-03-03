// Photos.js
import React, { useState, useEffect } from "react";
import "./photos.css";
import app from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Photos = () => {
  const db = getFirestore(app); //파이어스토어 데이터베이스 연결
  const storage = getStorage(app); //storage(이미지 저장)
  const navigate = useNavigate();

  const [displayList, setDisplayList] = useState([]); //디스플레이할 객체들
  const [docId, setDocId] = useState([]); //문서 id(여행 에디팅(수정)시 사용

  useEffect(() => {
    //   getData();
    const getData = async () => {
      //아래는 콜렉션의 모든 내용을 읽어들이는 구문
      const querySnapshot = await getDocs(collection(db, "tourMemo")); //콜렉션명:tourMemo

      setDisplayList([]); //초기화
      setDocId([]); //초기화
      querySnapshot.forEach((doc) => {
        // doc.data()[실제 저장된 객체] is never undefined for query doc snapshots
        //doc.data().속성명 을 작성한 템플릿에 맵핑시켜서 완성하면 됨.

        console.log(doc.id, " => ", doc.data());
        setDocId((preId) => [...preId, doc.id]);
        let ob = doc.data(); //저장한 데이터 객체
        setDisplayList((arr) => [...arr, ob]);
      });
    };

    getData();
  }, [db]); //종속성(의존성) 배열에 넣는게 맞음.

  const deleteHandle = async (docId, photoURL) => {
    //이미지 파일의 참조 주소를 얻음
    const photoImageRef = ref(storage, photoURL);
    // 이미지 파일 지우기(url인데 정상 동작하는지 확인...)
    deleteObject(photoImageRef)
      .then(() => {
        // File deleted successfully
        console.log("이미지 지우기가 성공하였습니다.");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("이미지 지우기에 실패하였습니다.");
      });

    //database에서 제거하기
    await deleteDoc(doc(db, "tourMemo", docId));

    //제거 완료 후 경고창에 보여주기
    alert("데이터가 제거되었습니다.");
    navigate("/photos");
  };

  return (
    <div>
      <h2>firestore db에서 불러오는 중입니다.</h2>

      <section className="cards">
        {displayList.map((item, index) => {
          return (
            <div className="card" key={docId[index]}>
              <img
                className="cardImage"
                src={item.photoURL}
                alt="추억의 사진"
              />
              <div className="cardContent">
                <h2 className="cardTitle">{item.location}</h2>
                <p className="cardText">{item.comment}</p>
                <p className="cardDate">{item.date}</p>
              </div>
              <div className="buttons">
                {/* /editTrip/:docId => 에디팅 Route(파라미터:docId) */}
                <Link to={"/editTrip/" + docId[index]} className="editButton">
                  {" "}
                  Edit{" "}
                </Link>
                {/* database와 storage 폴더의 내용을 지워야 한다. */}
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() => deleteHandle(docId[index], item.photoURL)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Photos;
