import logo from "./assets/logo.png";

function Header(props) {
    return (
        <div>
            <nav className="navbar bg-light mb-4"></nav>
            <div className="container">
                <a className="navbar-brand" href="/">
                    <div className="d-flex"><img src={logo} alt="logo" className="mr-2" />
                        <div>Project Mgmt</div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Header;