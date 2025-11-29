import { useEffect, useState } from 'react';
import { actions, formCard, input, primaryBtn, textarea } from './RegisterForm.styles';
import type { TaskType } from '../../types';



type Props ={
  onSubmit: (task: TaskType) => void;
}

export const RegisterForm = ({onSubmit} : Props) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [disabled,setDisabled] = useState<boolean>(true);

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
    if(title.length !== 0 && detail.length !== 0){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  },[title,detail])

  return (
    <form style={formCard} onSubmit={(e) => onSubmitForm(e)}>
      <input style={input} type='text' value={title} placeholder='タイトルを入力' onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea style={textarea} value={detail} placeholder='Todoを入力' onChange={(e) => setDetail(e.target.value)} rows={7}></textarea>
      <div style={actions}>
        <button style={primaryBtn(disabled)} type='submit' disabled={disabled}>
          追加
        </button>
      </div>
    </form>
  );
};
