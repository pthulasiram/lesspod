import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'react-content-loader';

import userStore from './../stores/userStore';
import Navbar from './../components/Navbar';
import Posts from '../components/Posts';
import Menus from '../components/Menus';
import { getAllPostsByUser } from '../api/firebase';

const styles = {
  bodyContainer: {
    height: '100vh',
    backgroundColor: '#F5F5F5',
  },
};

class HomeScreen extends React.Component {
  state = {
    isLoading: true,
    posts: [],
    menus: [],
  };

  componentDidMount() {
    getAllPostsByUser(userStore.profileData.id).then(response => {
      this.setState({ posts: response.data, isLoading: false });
    });
  }

  render() {
    let fullName;
    if (userStore.profileData) {
      fullName = `${userStore.profileData.first} ${userStore.profileData.last}`.toUpperCase();
    }
    return (
      <div>
        <Navbar />
        <div style={styles.bodyContainer}>
          <section className="section">
            <div className="container">
              <div className="columns is-centered is-multiline">
                <Menus data={this.state.menus} />
                <div className="column is-two-thirds">
                  <h1 className="title">All Posts by {fullName}</h1>
                </div>
                <div className="column is-two-thirds">
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="subtitle is-5">
                          <strong>{this.state.posts.length}</strong> Posts
                        </p>
                      </div>

                      <div className="level-item">
                        <Link to="/newpost">
                          <div className="button is-success">New Post</div>
                        </Link>
                      </div>

                      <div className="level-item is-hidden-tablet-only">
                        <div className="field has-addons">
                          <p className="control">
                            <input className="input" type="text" placeholder="Search posts..." />
                          </p>
                          <p className="control">
                            <button className="button">Search</button>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="level-right">
                      <div className="level-item">Order by</div>
                      <div className="level-item">
                        <div className="select">
                          <select>
                            <option>Publish date</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </nav>
                  {this.state.isLoading ? <List /> : <Posts data={this.state.posts} />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
