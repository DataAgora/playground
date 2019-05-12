import React from 'react';
import Reflux from 'reflux';
import { Link, withRouter } from "react-router-dom";

import RepoStatus from './../repo/repoStatus';

import DashboardStore from './../../stores/DashboardStore';
import DashboardActions from './../../actions/DashboardActions';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class RepoList extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = DashboardStore;
  }

  componentDidMount() {
    DashboardActions.fetchAllRepos();
  }

  render() {
    if (this.state.error !== false) {
      return <div className="text-center"><p>Error: {this.state.error}</p></div>
    }

    if (this.state.loading === true) {
      return (
        <div className="text-center text-secondary">
          <FontAwesomeIcon icon="sync" size="lg" spin />
        </div>
      );
    }

    if (this.state.repos.length === 0) {
      return (
        <div>
           <h3 className="text-center">You don't own any repos yet.</h3>
           <p className="lead text-center mt-4">
             Start by creating <Link to="new" className="lead">a new repo.</Link>
           </p>
        </div>
      )
    } else {
      return (
        <div>
          {this.state.repos.map(function(repo, index) {
            return (
              <div className="jumbotron bg-dark" key={index}>
                <div className="row">
                  <div className="col">
                    <h4 className="d-inline mr-3"><Link to={"repo/" + repo.Id} className="display-5 text-light">{repo.Name}</Link></h4>
                    <RepoStatus repoId={repo.Id}/>
                  </div>
                  <div className="col text-right">
                    <Link to={"explora/" + repo.Id} className="lead text-secondary">Open Explora</Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

export default withRouter(RepoList);
