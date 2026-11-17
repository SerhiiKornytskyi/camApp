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
            <video controls>
                <source src={path} type="video/x-matroska" />
            </video>
        </>
    );

}

export default LiveViewComponent;