import ComingSoonImg from "@/assets/img/karakter-coming.svg"

const ComingSoon = () => {
    return (
        <div className="mx-auto h-screen flex flex-col items-center justify-center text-2xl font-bold gap-4">
            <img src={ComingSoonImg} alt="coming soon" className="lg:w-1/3 lg:h-1/3 object-contain animate-bounce" />
            <h1 className="text-4xl font-bold bg-gradient-to-br from-indigo-600 via-red-600 to-green-600 bg-clip-text text-transparent">
                COMING SOON !
            </h1>

            <p className="text-sm font-medium text-muted-foreground">
                Something awesome is on the way. We’ll be launching this feature soon.
            </p>

        </div>
    )
}

export default ComingSoon