"use client"
import style from '../styles/Navbar.module.css'

export async function getUsers() {
    const songUrl = 'https://musicapi-19wk.onrender.com/music/myAPI'
    const res = await fetch(songUrl)
    const response = await res.json()
    return response;
}          

const Welcome = async () => {     
        let data = await getUsers()
        // console.log(data);
  return (

    <>    
<div className="container mx-auto shadow-lg p-5 ">
    <div className="row">
        <div className="col-12 col-md-6 bg-primary d-md-flex">
            <div className="d-flex flex-column justify-content-between">
                <div classNameName={style.card}>
                    <h2 className="ps-3 pe-3 pt-3 pb-3 text-center">Welcome To My Music App</h2>
                </div>
                {
                    data.map((user, index)=>(
                        index === 0 &&
                        <div key ={user.id}>
                            <h1 className="ps-5">{user.id}</h1> 
                            <h4 className="text-danger ms-2" >Artist Name: {user.artistName}</h4>
                            <h4 className="text-success ms-2" >Song Title: {user.songTitle}</h4> 
                            <h4 className=" ms-2" >Album Name: {user.albumName}</h4> 
                            <h4 className="text-secondary ms-2" >Release Date: {user.releaseDate}</h4> 
                        </div>
                    ))              
                }
                <h4 className="fw-bold text-center pt-3">Make the best choice today!</h4>
            </div>
        </div>

        <div className="col-12 col-md-6 bg-info d-md-flex">
            <div className="d-flex flex-column justify-content-between">
                {
                    data.map((user, index)=>(
                        index === 0 &&
                        <div key ={user.id}>
                            <h4 className="ps-3 pt-3 text-white"> Album Image: 
                                <img src={user.songImage} alt="profile picture" width={150} height={150} blurDataURL="data" placeholder="blur"/>                                                                  
                            </h4>
                            <h4 className="ps-5">{user.id}</h4>  
                            
                            <div className="ps-5 pt-3 pb-3">
                                <h4 className=" ms-2" >Album Name: {user.albumName}</h4> 
                                <audio controls className="w-100 w-sm-auto">
                                    <source src={user.songUrl} type="audio/mp3" />
                                </audio>
                            </div>
                        </div>
                    ))              
                }   
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Welcome