import React from 'react';
import Header from './Header';
import CardPreview from './CardPreview';
import CardList from './CardList'
import TeamBoard from './TeamBoard'
class App extends React.Component {
  state = {
    pageHeader: 'Retrospective',
    category: this.props.initialCategory,
  };
  componentDidMount() {

  }
  componentWillUnmount() {
    // clean timers, listeners
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
          <TeamBoard/>
          <CardList category={this.state.category} />
      </div>
    );
  }
}

export default App;
