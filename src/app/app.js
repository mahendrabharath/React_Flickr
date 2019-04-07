/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-deprecated */
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Groups from '../components/groupSearch/Groups';
import ImgOverview from '../components/overview/ImgOverview';
// import InfiniteUsers from '../components/gallery/InfiniteGallery';
import InfiniteGallery from '../components/gallery/InfiniteGallery';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import NotFound from './NotFound';


const mapStateToProps = state => ({articles: state});
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(preProps) {
    console.log('cur error ',this.props.articles.error, preProps.articles.error)
  }

  componentWillReceiveProps(nextProps) {
    const {error, timeOut} = nextProps.articles;
    const {error: preError,timeOut: preTimeOut} = this.props.articles;
    console.log(error && error.message);
    if (error && error.message || preTimeOut !== timeOut) {
      console.log('-------------Navigate---------');
      this.props.history.push('/NotFound');
    }
  }

  render() {
    return (
      <div>
        {this.props.articles.fetching ? <div className='loader-bg'><img className='loader' src='../../assets/images/loader.gif' /></div> : '' }
        <Switch>
          <Route path='/' exact component={Groups} />
          <Route path='/NotFound' component={NotFound} />
          <Route path='/gallery' component={InfiniteGallery} />
          <Route path='/overview' component={ImgOverview} />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps)(App));
