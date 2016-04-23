import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllBlogs } from '../../actions';
import Spinner from '../spinner.jsx';
import RequestWentToShit from '../errors/requestWentToShit.jsx';
import { sortByDate } from '../../util/arrayUtils';
import styles from './admin.styl';

export const BlogTable = ({ blogs }) => (
  <table>
    <thead>
      <tr>
        <td><strong>Title</strong></td>
        <td><strong>Date Written</strong></td>
        <td><strong>Published</strong></td>
      </tr>
    </thead>
    <tbody>
      {
        blogs.sort(sortByDate).map(({ _id, title, date, published }) => (
          <tr key={_id}>
            <td><Link to={`/editBlog/${_id}`}>{title}</Link></td>
            <td>{new Date(date).toUTCString()}</td>
            <td>{published ? 'Yes' : 'No'}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

export class Admin extends Component {
  componentWillMount() {
    if (!this.props.loggedIn)
      browserHistory.push('/login');
  }

  componentDidMount() {
    if (this.props.loggedIn)
      this.props.fetchAllBlogs();
  }

  render() {
    const { fetching, error, data } = this.props;

    if (fetching)
      return <Spinner/>;

    if (error)
      return <RequestWentToShit status={data.response.status}/>;

    return (
      <div className={styles.admin}>
        <Link to="/newBlog" className={styles.newBlogLink}>Write new Blog post</Link>
        <BlogTable blogs={data}/>
      </div>
    );
  }
}

function mapStateToProps({ login: { loggedIn }, allBlogs }) {
  return { loggedIn, ...allBlogs };
}

export default connect(mapStateToProps, { fetchAllBlogs })(Admin);