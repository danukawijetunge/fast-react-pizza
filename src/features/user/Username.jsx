import { useSelector } from "react-redux"

function Username() {
    const username = useSelector((store)=> store.user.username)

    console.log("userName " + username)

    return (
        <div className="hidden text-sm font-semibold md:block">
            {username}
        </div>
    )
}

export default Username
