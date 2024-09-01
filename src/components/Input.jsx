import styles from './input.module.css'
export default function Input({inputText,setInputText,handleSend}){
    return(
        <textarea
        type="text"
        className={styles.input}
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
        onKeyDown={(e) => {
            if(e.key==='Enter'){
            handleSend();
            }
        }}
        />
    )
}