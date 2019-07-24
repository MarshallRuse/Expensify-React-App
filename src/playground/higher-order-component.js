import React from 'react';
import ReactDOM from 'react-dom';

// The normal component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This is the info: {props.info}</p>
    </div>
);

// The Higher Order Component (HOC), a wrapper component 
// that can apply to any number / type of component.
// We use a NORMAL FUNCTION that RETURNS the HOC with the wrapped component
// passed to it.
// Note the use of the spread opeator with props to pass
// props through the HOC to the WrappedComponent(s)
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is an private information, please do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};


// Another one
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? 
                (<WrappedComponent {...props}/>) : 
                <p>Please login to view info.</p>}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthenticatedInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='These are the details'/>, document.getElementById('app'));
ReactDOM.render(<AuthenticatedInfo isAuthenticated={true} info='These are the details'/>, document.getElementById('app'));