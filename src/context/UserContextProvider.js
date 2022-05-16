import React, { useEffect, useState } from "react"
import WithAxios from "./WithAxios"
import api from '../api/users'

const UserContext = React.createContext()

function UserContextProvider(props) {

    const [user, setUser] = useState()
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [favorite, setFavorite] = useState([])
    const [firstLoad, setFirstLoad] = useState(true)

    function fetchUser() {
        api.get("")
            .then(res => setUser(res.data))
    }

    function fetchFavorite() {
        api.get("/favorite")
            .then(res => setFavorite(res.data.map(favorite => (
                {
                    ...favorite,
                    createTime: new Date(favorite.createTime).toLocaleString()
                }
            ))))
    }

    function addFavorite(color) {
        if(!localStorage.getItem('token')){
            console.log("no token")
            setShowLoginModal(true)
            return
        }

        api.post("/favorite",
            {
                "colorId": color.id
            }
        ).then(res => setFavorite(prev => {
            res.data.createTime = new Date(res.data.createTime).toLocaleString()
            return [res.data, ...prev]
        })).catch(() => setShowLoginModal(true))
    }

    function removeFavorite(color) {
        api.delete("/favorite", {
            data: {
                "colorId": color.id
            }
        }).then(setFavorite(prev => (
            prev.filter(fav => fav.id !== color.id)
        )))
    }

    useEffect(() => {
        fetchUser()
    },[])

    useEffect(() => {
        fetchFavorite()
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser, showLoginModal, setShowLoginModal, isLoading, setIsLoading, favorite, addFavorite, removeFavorite }}>
                {props.children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }