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
<div class="container mx-auto shadow-lg p-5 ">
    <div class="row">
        <div class="col-12 col-md-6 bg-primary d-md-flex">
            <div class="d-flex flex-column justify-content-between">
                <div className={style.card}>
                    <h2 class="ps-3 pe-3 pt-3 pb-3 text-center">Welcome To My Music App</h2>
                </div>
                {
                    data.map((user, index)=>(
                        index === 0 &&
                        <div key ={user.id}>
                            <h1 class="ps-5">{user.id}</h1> 
                            <h4 class="text-danger ms-2" >Artist Name: {user.artistName}</h4>
                            <h4 class="text-success ms-2" >Song Title: {user.songTitle}</h4> 
                            <h4 class=" ms-2" >Album Name: {user.albumName}</h4> 
                            <h4 class="text-secondary ms-2" >Release Date: {user.releaseDate}</h4> 
                        </div>
                    ))              
                }
                <h4 class="fw-bold text-center pt-3">Make the best choice today!</h4>
            </div>
        </div>

        <div class="col-12 col-md-6 bg-info d-md-flex">
            <div class="d-flex flex-column justify-content-between">
                {
                    data.map((user, index)=>(
                        index === 0 &&
                        <div key ={user.id}>
                            <h4 class="ps-3 pt-3 text-white"> Album Image: 
                                <img src={user.songImage} alt="profile picture" width={150} height={150} blurDataURL="data" placeholder="blur"/>                                                                  
                            </h4>
                            <h4 class="ps-5">{user.id}</h4>  
                            
                            <div class="ps-5 pt-3 pb-3">
                                <h4 class=" ms-2" >Album Name: {user.albumName}</h4> 
                                <audio controls class="w-100 w-sm-auto">
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