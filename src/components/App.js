import React from 'react';
import Header from './Header';
import CardPreview from './CardPreview';

class App extends React.Component {
  state = {
    pageHeader: 'Retrospective',
    category: this.props.initialCategory
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
        <div>
          {this.state.category.map(category =>
            <CardPreview key={category.id} {...category} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
