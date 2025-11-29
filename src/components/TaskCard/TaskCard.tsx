import { useEffect, useState } from 'react';
import type { TaskType } from '../../types';
import * as S from './TaskCard.styles';


type Props = {
  task: TaskType;
  onSubmitEditTask: (newTask:TaskType) => void;
  onSubmitDeleteTask :(id:number) => void
};

export const TaskCard = ({ task,onSubmitEditTask,onSubmitDeleteTask }: Props) => {
  const { title, detail } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDetail, setEditedDetail] = useState(detail);
  const [submitDisabled,setSubmitDisabled] = useState(true);
  const [isExceedTitleCharCount,setIsExceedTitleCharCount] = useState(false);
  const [isExceedDetailCharCount,setIsExceedDetailCharCount] = useState(false);
  const [isEmptyTextExsist,setIsEmptyTextExsist] = useState(false);

  const titleCharLimit :number = 50;
  const detailCharLimit :number = 200;
  //
  useEffect(()=>{
    if(editedDetail.length === 0 || editedTitle.length === 0){
      setIsEmptyTextExsist(true);
      setSubmitDisabled(true);return;
    }else{
      setIsEmptyTextExsist(false);
    }
    
    if(editedTitle.length >= titleCharLimit){
      setIsExceedTitleCharCount(true);
      setSubmitDisabled(true);return;
    }else{
      setIsExceedTitleCharCount(false);
    }

    if(editedDetail.length >= detailCharLimit){
      setIsExceedDetailCharCount(true);
      setSubmitDisabled(true); return;
    }else{
      setIsExceedDetailCharCount(false);
    }

    setSubmitDisabled(false);

  },[editedDetail,editedTitle])

  // 編集ボタン押下時の処理
  const onClickEditButton = () => {
    setIsEditing((prev) => !prev);
  };

  // キャンセルボタン押下時の処理
  const onClickCancelButton = () => {
    setEditedTitle(title);
    setEditedDetail(detail);
    setIsEditing(false);
  };

  /**
   * TODO：削除の作成
   */
  const onClickDeleteButton = () => {
    // ここに削除ボタン押下時の処理
    onSubmitDeleteTask(task.id);
  };

  // TODO：編集の作成
  const onSubmitEditForm = (e: React.FormEvent) => {
    e.preventDefault();
    // ここに更新ボタン押下時の処理
    setIsEditing(false);
    const newTask :TaskType = {
      id: task.id,
      title: editedTitle,
      detail: editedDetail,
    } ;
    onSubmitEditTask(newTask);

  };

  return (
    <>
      {isEditing ? (
        <form style={S.card} onSubmit={onSubmitEditForm}>
          <input style={S.editInput} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          {isExceedTitleCharCount && <p style={{color: "red"}}>タイトルの文字数が多すぎます</p>}
          <br />
          <textarea
            style={S.editTextarea}
            value={editedDetail}
            onChange={(e) => setEditedDetail(e.target.value)}
            rows={7}
          />
          {isEmptyTextExsist ? <p>空欄が存在します</p>:<></>}
          {isExceedDetailCharCount ? <p>本文の文字数が多すぎます</p> : <></>}
          <br />
          <div style={S.editActions}>
            <button style={S.primaryBtn(submitDisabled)} type='submit' disabled={submitDisabled}>
              更新
            </button>
            <button style={S.pillBtn} onClick={onClickCancelButton} type='button'>
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <div style={S.card}>
          <h3 style={S.title}>{title}</h3>
          <p style={S.detail}>{detail}</p>
          <div style={S.viewActions}>
            <button style={S.pillBtn} onClick={onClickEditButton}>
              編集
            </button>
            <button style={S.dangerBtn} onClick={onClickDeleteButton} hidden={isEditing}>
              削除
            </button>
          </div>
        </div>
      )}
    </>
  );
};
