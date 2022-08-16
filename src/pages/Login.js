import useFBAuth from "../hooks/useFBAuth"



export default function Login(){
    const {login} = useFBAuth()
    
    return (
        <div style={{
            display:'flex',
            flexDirection:"column",
            alignItems:'center'
        }}>
            <p>Not login yet!</p>
            <button 
                type="button"
                onClick={login}
            >Login with facebook
            </button>

        </div>
    )
}