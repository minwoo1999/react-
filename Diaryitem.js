import { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  author,
  content,
  created_date,
  emotion,
  id,
  onRemove,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const togggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentinput = useRef();
  const handleRemove = () => {
    if (window.confirm("${id}번째 일기를 정말 삭제하시겠습니까?")) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      alert("글자수는 5자리 이상이여야합니다");
      localContentinput.current.focus();
      return;
    }
    if (window.confirm(id + "번째 일기를 수정하시겠습니가?")) {
      onEdit(id, localContent);
      togggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>

      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentinput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={togggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
