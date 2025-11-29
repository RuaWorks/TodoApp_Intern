import { useEffect, useLayoutEffect, useState } from 'react';
import { actions, formCard, input, primaryBtn, textarea } from './RegisterForm.styles';
import type { TaskType } from '../../types';
import ValidateError from '../ValidateError/ValidateError';



type Props ={
  onSubmit: (task: TaskType) => void;
}



export const RegisterForm = ({onSubmit} : Props) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [disabled,setDisabled] = useState<boolean>(true);
  const [isExceedTitleCharCount,setIsExceedTitleCharCount] = useState(false);
  const [isExceedDetailCharCount,setIsExceedDetailCharCount] = useState(false);
  const [isEmptyTextExsist,setIsEmptyTextExsist] = useState(true);


  const titleLimitCharLength:number = 50;
  const detailLimitCharLength :number = 200;

  /**
   * TODO：新規登録の作成
   */
  // ここに追加ボタン押下時の処理を書く
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()

    const newTask :TaskType = {
      id :Date.now(),
      title :title,
      detail :detail
     };
    onSubmit(newTask);
    setTitle("");
    setDetail("");
  };

  useEffect(() =>{
    setIsEmptyTextExsist(title.length === 0 || detail.length === 0);
    setIsExceedTitleCharCount(title.length >= titleLimitCharLength);
    setIsExceedDetailCharCount(detail.length >= detailLimitCharLength);

    console.log("isEmptyTextExsist", isEmptyTextExsist);
    

  },[title,detail])

  useEffect(() => {
    setDisabled(isEmptyTextExsist || isExceedTitleCharCount || isExceedDetailCharCount);
  }, [isEmptyTextExsist, isExceedTitleCharCount,isExceedDetailCharCount])

  return (
    <form style={formCard} onSubmit={(e) => onSubmitForm(e)}>
      <input style={input} type='text' value={title} placeholder='タイトルを入力' onChange={(e) => setTitle(e.target.value)} />
      {isExceedTitleCharCount && <ValidateError message='文字数が多すぎます'/>}
      <br />
      <textarea style={textarea} value={detail} placeholder='Todoを入力' onChange={(e) => setDetail(e.target.value)} rows={7}></textarea>
      {isExceedDetailCharCount && <ValidateError message='文字数が多すぎます'/>}
      <div style={actions}>
        <button style={primaryBtn(disabled)} type='submit' disabled={disabled}>
          追加
        </button>
      </div>
      {isEmptyTextExsist && <ValidateError message='空欄があります'/>}
    </form>
  );
};
