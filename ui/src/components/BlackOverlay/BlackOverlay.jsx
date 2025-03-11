const BlackOverlay = ({ navbarIsOpen, setNavbarIsOpen }) => {
    return(
        navbarIsOpen && (
            <div
                className="z-1 position-fixed start-0 w-100 h-100 bg-dark bg-opacity-50"
                onClick={() => {
                    setNavbarIsOpen(false)
                }}
            />
        )
    )
}

export default BlackOverlay;
