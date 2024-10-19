import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "John Doe",
      },
      counter: 1,
      client: {
        isLoading: false,
        data: [],
      },
    };
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1,
      apiResponse: [...Array(4)],
    });
  };

  handleFetch = () => {
    this.setState({ client: { ...this.state.client, isLoading: true } });
    setTimeout(() => {
      this.setState({
        client: { ...this.state.client, data: ["User 1", "User 2", "User 3"], isLoading: false, },
      });
    }, 3000);
  };

  render() {
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <button onClick={this.handleClick}>Click - {this.state.counter}</button>
        <button onClick={this.handleFetch}>Fetch</button>
        <div>
          {this.state.client.isLoading ? (
            <p>Loading...</p>
          ) : (
            this.state.client.data
          )}
        </div>
      </div>
    );
  }
}

export default App;
