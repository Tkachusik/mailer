import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Folders from './folders';
import Login from './login';
import Mails from './mails';
import { connect } from 'react-redux';

const App = ({ accessToken }) => {
  return (
    <div className="container-fluid">
      {
        (accessToken === "") ?
          <div className="row">
            <div className="col-12">
              <Login />
            </div>
          </div>
          :
          <div className="row">
            <div className="col-4">
              <Folders />
            </div>
            <div className="col-8">
              <Mails />
            </div>
          </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
