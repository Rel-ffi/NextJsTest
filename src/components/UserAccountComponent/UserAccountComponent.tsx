import "./UserAccountComponent.css"

const UserAccountComponent = () => {
    // future logic for user. . .
    return (
        <div className="sb-useracc-wrapper">
            <div className="sb-useracc-logo">
                <img alt="UserLogo" src="https://i.pinimg.com/736x/c7/d7/bf/c7d7bf7b1cb104da2dd8dc1df96eb637.jpg"></img>
            </div>
            <div className="sb-useracc-info">
                <span>Example</span>
                <div className="sb-useracc-status-wrapper">
                    <div></div>
                    <span>Online</span>
                </div>
            </div>
        </div>
    );
};

export default UserAccountComponent;