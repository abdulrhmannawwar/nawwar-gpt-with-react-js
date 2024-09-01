import styles from './Button.module.css'
export default function Button({inputText,setInputText,handleSend}){
    return(
        <button 
        className={styles.btn}
        onClick={()=>{
            handleSend();
        }}
        >Ask</button>
    )
}