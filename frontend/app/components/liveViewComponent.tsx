const LiveViewComponent = ({path} : {path: string}) => {

    if (!path) {
        return (
            <>
                no media
            </>
        )
    }

    return (
        <>
            <video className="w-full h-100" controls>
                <source src={path} type="video/x-matroska" />
            </video>
        </>
    );

}

export default LiveViewComponent;