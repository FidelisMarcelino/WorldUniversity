import { useContext, useEffect, useRef } from "react"
import { LoginContext } from "./context/LoginContext"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const nameRef = useRef()
    const jabatanRef = useRef()
    const {nameLogin, setNameLogin, jabatanLogin, setJabatanLogin} = useContext(LoginContext)
    const navigate = useNavigate()

    function saveLogin(){

        const name = nameRef.current.value
        const jabatan = jabatanRef.current.value

        if(name && jabatan){
            setNameLogin(nameRef.current.value)
            setJabatanLogin(jabatanRef.current.value)

            navigate("/pertemuan4")
        } else{
            alert("Nama dan Jabatan harus terisi")
        }
    }

    //digunakan hanya untuk testing
    useEffect(()=>{
        // console.log(nameLogin)
        // console.log(jabatanLogin)
        nameRef.current.focus()
    }, [nameLogin, jabatanLogin])

    return(
        <div className="mt-40 w-[100vw] flex justify-center items-center">
            <div className="bg-blue-200 p-3  flex flex-col gap-3 rounded-md">
                <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                    <input className="px-2 py-1" ref={nameRef} id="name" type="text"/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="">Jabatan</label>
                    <input className="px-2 py-1" ref={jabatanRef} id="jabatan" type="text"/>
                </div>

                <button onClick={saveLogin} className="px-2 py-1 hover:bg-blue-300 rounded-md duration-300">Login</button>
            </div>
        </div>
    )
}